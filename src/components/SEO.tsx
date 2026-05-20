// React 19 native head hoisting: rendering <title>/<meta>/<link> inside a
// component bubbles them up to <head>. No react-helmet needed.
// Use on every page to set per-route title, description, canonical, og:image.

type Props = {
  title?: string;
  description?: string;
  /** Path only — base URL is prepended. Leave undefined to skip canonical. */
  path?: string;
  /** Absolute or root-relative image URL for og:image/twitter:image */
  image?: string;
  /** noindex this route (use for thank-you / draft pages) */
  noindex?: boolean;
};

const BASE = 'https://ngocbandecal.vn';
const DEFAULT_IMG = `${BASE}/images/ngoc-ban/studio-facade-supercars.jpeg`;

export default function SEO({ title, description, path, image, noindex }: Props) {
  const fullTitle = title ? `${title} — Ngọc Bàn Decal` : 'Ngọc Bàn Wrap Decal Đà Nẵng — Dán PPF, Wrap Đổi Màu, Film Cách Nhiệt';
  const canonical = path ? `${BASE}${path.startsWith('/') ? path : `/${path}`}` : undefined;
  const imgUrl = image ? (image.startsWith('http') ? image : `${BASE}${image.startsWith('/') ? image : `/${image}`}`) : DEFAULT_IMG;

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={imgUrl} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={imgUrl} />
    </>
  );
}
