// Step 1 of GitHub OAuth flow for Decap CMS — start authorization.
// Browser hits /api/auth → we redirect to GitHub with our client_id + scope.
// GitHub then redirects back to /api/callback with ?code=...

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomBytes } from 'node:crypto';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('Missing GITHUB_OAUTH_CLIENT_ID env var');
    return;
  }

  const state = randomBytes(16).toString('hex');
  // Persist state in a short-lived cookie so the callback can verify it
  res.setHeader(
    'Set-Cookie',
    `decap_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  );

  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'repo,user',
    state,
  });
  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}
