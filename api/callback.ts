// Step 2 — GitHub redirects here with ?code=... ; we exchange code for access_token,
// then post the token back to the Decap CMS popup window via window.opener.

import type { VercelRequest, VercelResponse } from '@vercel/node';

function renderResponse(message: string, status: 'success' | 'error', token?: string) {
  const payload = JSON.stringify({ token, provider: 'github' });
  const event = `authorization:github:${status}:${payload}`;
  return `<!doctype html>
<html><body>
<script>
  (function() {
    function send(e) {
      window.opener && window.opener.postMessage(${JSON.stringify(event)}, e.origin || '*');
    }
    window.addEventListener('message', send, false);
    window.opener && window.opener.postMessage('authorizing:github', '*');
    document.body.innerText = ${JSON.stringify(message)};
  })();
</script>
</body></html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code, state, error } = req.query as Record<string, string>;
  if (error) {
    res.status(400).send(renderResponse('Login failed: ' + error, 'error'));
    return;
  }
  if (!code) {
    res.status(400).send(renderResponse('Missing code', 'error'));
    return;
  }

  // Verify state matches the cookie we set in /api/auth
  const cookies = (req.headers.cookie || '').split(';').reduce<Record<string, string>>((acc, c) => {
    const [k, ...v] = c.trim().split('=');
    if (k) acc[k] = v.join('=');
    return acc;
  }, {});
  if (!state || cookies.decap_oauth_state !== state) {
    res.status(400).send(renderResponse('OAuth state mismatch', 'error'));
    return;
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.status(500).send(renderResponse('Server misconfigured (missing OAuth secrets)', 'error'));
    return;
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    const data = (await tokenRes.json()) as { access_token?: string; error?: string };
    if (!data.access_token) {
      res.status(400).send(renderResponse('GitHub did not return a token: ' + (data.error || 'unknown'), 'error'));
      return;
    }
    // Clear the state cookie
    res.setHeader('Set-Cookie', 'decap_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
    res.status(200).setHeader('Content-Type', 'text/html').send(renderResponse('Login OK — closing popup...', 'success', data.access_token));
  } catch (err) {
    res.status(500).send(renderResponse('Token exchange error: ' + (err as Error).message, 'error'));
  }
}
