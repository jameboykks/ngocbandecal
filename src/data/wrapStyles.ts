// Single source of truth lives in api/_lib/prompt.ts so the serverless
// function stays self-contained (no api → src import that breaks on Vercel).
// The UI only needs the display fields; re-export them here.
export { WRAP_STYLES, STYLE_GROUPS, buildWrapPrompt } from '../../api/_lib/prompt';
export type { WrapStyle } from '../../api/_lib/prompt';
