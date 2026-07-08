// Ngọc Bàn Studio — style catalogue + prompt composer.
// SELF-CONTAINED (no imports) so the serverless function bundles cleanly on
// Vercel without reaching into the Vite `src/` tree. The UI re-exports the
// display fields from src/data/wrapStyles.ts.

export type WrapStyle = {
  id: string;
  name: string;   // Vietnamese label shown to the user
  group: string;  // one of STYLE_GROUPS
  core: string;   // English prompt fragment describing the wrap
  variants: string[]; // randomised alternatives — guarantees "same style, different result"
};

export const STYLE_GROUPS = [
  'Trơn & hoàn thiện',
  'Hiệu ứng đặc biệt',
  'Thể thao & đua',
  'Hoạ tiết',
  'Cao cấp & chủ đề',
] as const;

export const WRAP_STYLES: WrapStyle[] = [
  // ── Trơn & hoàn thiện ─────────────────────────────────────────────
  { id: 'matte-black', name: 'Đen nhám', group: 'Trơn & hoàn thiện',
    core: 'a full matte black wrap, murdered-out with blacked-out trim and badges',
    variants: ['deep pure black', 'graphite-tinted matte black', 'satin-finish black with gloss black accents'] },
  { id: 'satin-white-pearl', name: 'Trắng ngọc trai satin', group: 'Trơn & hoàn thiện',
    core: 'a satin pearl-white wrap with a soft pearlescent shimmer',
    variants: ['warm ivory pearl', 'cool arctic pearl', 'champagne-tinted pearl white'] },
  { id: 'nardo-grey', name: 'Xám lì Nardo', group: 'Trơn & hoàn thiện',
    core: 'a flat Nardo grey motorsport matte-grey wrap',
    variants: ['light Nardo grey', 'dark battleship grey', 'grey body with gloss-black roof and mirrors'] },
  { id: 'gloss-midnight-blue', name: 'Xanh đen bóng', group: 'Trơn & hoàn thiện',
    core: 'a deep gloss midnight-blue wrap',
    variants: ['rich navy blue', 'sapphire metallic blue', 'a smooth blue-to-black fade from front to rear'] },
  { id: 'racing-green', name: 'Xanh rêu đua', group: 'Trơn & hoàn thiện',
    core: 'a British racing green gloss wrap',
    variants: ['classic British racing green', 'dark forest green', 'emerald metallic green'] },
  { id: 'frozen-silver', name: 'Bạc mờ', group: 'Trơn & hoàn thiện',
    core: 'a frozen matte silver wrap',
    variants: ['bright frost silver', 'dark gunmetal silver', 'silver body with a matte-black roof'] },
  { id: 'cherry-red', name: 'Đỏ anh đào bóng', group: 'Trơn & hoàn thiện',
    core: 'a glossy cherry-red wrap',
    variants: ['candy-apple red', 'deep wine red', 'bright vivid red'] },

  // ── Hiệu ứng đặc biệt ─────────────────────────────────────────────
  { id: 'chrome-mirror', name: 'Crôm gương', group: 'Hiệu ứng đặc biệt',
    core: 'a highly reflective chrome mirror wrap',
    variants: ['silver chrome', 'rose-gold chrome', 'dark black chrome'] },
  { id: 'neochrome', name: 'Cầu vồng Neochrome', group: 'Hiệu ứng đặc biệt',
    core: 'a holographic neochrome oil-slick wrap that shifts through iridescent rainbow hues',
    variants: ['purple-to-green shift', 'blue-to-pink shift', 'gold-to-teal shift'] },
  { id: 'chameleon', name: 'Đổi màu tắc kè', group: 'Hiệu ứng đặc biệt',
    core: 'a colour-shift chameleon wrap that changes between two hues depending on viewing angle',
    variants: ['purple-to-blue shift', 'green-to-gold shift', 'red-to-purple shift'] },
  { id: 'rose-gold-satin', name: 'Vàng hồng satin', group: 'Hiệu ứng đặc biệt',
    core: 'a satin rose-gold wrap',
    variants: ['warm rose gold', 'soft pink-gold', 'deep bronze-gold'] },
  { id: 'brushed-metal', name: 'Kim loại xước', group: 'Hiệu ứng đặc biệt',
    core: 'a brushed-metal wrap with a fine directional grain',
    variants: ['brushed titanium', 'brushed aluminium', 'brushed dark steel'] },
  { id: 'carbon-fibre', name: 'Full sợi carbon', group: 'Hiệu ứng đặc biệt',
    core: 'a full gloss carbon-fibre weave wrap',
    variants: ['black carbon weave', 'dark grey forged carbon', 'carbon weave with subtle red tracer accents'] },

  // ── Thể thao & đua ────────────────────────────────────────────────
  { id: 'racing-stripes', name: 'Sọc đua', group: 'Thể thao & đua',
    core: 'clean dual racing stripes running over the hood, roof and boot',
    variants: ['white stripes over the body colour', 'black stripes with a thin pinstripe', 'red stripes with a silver outline'] },
  { id: 'gt-side-livery', name: 'Tem sườn GT', group: 'Thể thao & đua',
    core: 'a motorsport GT side livery with flowing dynamic graphics along the doors',
    variants: ['red-and-black GT livery', 'blue-and-white GT livery', 'neon-green and black GT livery'] },
  { id: 'rally', name: 'Bảng số Rally', group: 'Thể thao & đua',
    core: 'a rally livery with bold number roundels and mud-flap graphics',
    variants: ['blue-and-red rally', 'white-and-red rally', 'yellow-and-black rally'] },
  { id: 'sponsor-motorsport', name: 'Tài trợ motorsport', group: 'Thể thao & đua',
    core: 'a generic motorsport sponsor-style livery using abstract fictional sponsor blocks (invent placeholder shapes, no real brand names or logos)',
    variants: ['energy-drink style red and blue', 'oil-brand style green and white', 'tech style black and cyan'] },
  { id: 'drift-splash', name: 'Drift phá cách', group: 'Thể thao & đua',
    core: 'an aggressive drift-style wrap with dynamic paint-splash and brush-stroke graphics',
    variants: ['pink-and-teal splash', 'orange-and-black splash', 'purple-and-lime splash'] },
  { id: 'speed-lines', name: 'Speed-lines', group: 'Thể thao & đua',
    core: 'a sporty wrap with sharp angular speed-line graphics running down the sides',
    variants: ['red speed lines', 'cyan speed lines', 'gold speed lines'] },

  // ── Hoạ tiết ──────────────────────────────────────────────────────
  { id: 'camo', name: 'Rằn ri Camo', group: 'Hoạ tiết',
    core: 'a camouflage pattern wrap',
    variants: ['military green camo', 'urban grey camo', 'arctic white camo'] },
  { id: 'low-poly', name: 'Hình học Low-poly', group: 'Hoạ tiết',
    core: 'a low-poly geometric triangulated pattern wrap',
    variants: ['blue-teal low-poly', 'sunset-orange low-poly', 'monochrome grey low-poly'] },
  { id: 'hex-tech', name: 'Lục giác công nghệ', group: 'Hoạ tiết',
    core: 'a futuristic hexagon tech-grid pattern wrap',
    variants: ['cyan hexagons on black', 'red hexagons on grey', 'gold hexagons on dark charcoal'] },
  { id: 'graffiti', name: 'Graffiti đường phố', group: 'Hoạ tiết',
    core: 'a vibrant street-art graffiti wrap with abstract spray tags (no real logos, brands or readable words)',
    variants: ['colourful pop graffiti', 'dark neon graffiti', 'pastel graffiti'] },
  { id: 'itasha', name: 'Anime Itasha', group: 'Hoạ tiết',
    core: 'a Japanese itasha-style wrap with colourful artwork of a generic original anime-inspired character (do not use any copyrighted or existing characters)',
    variants: ['pink-and-purple anime theme', 'blue sci-fi anime theme', 'red dynamic anime theme'] },
  { id: 'tribal-flame', name: 'Tribal & lửa', group: 'Hoạ tiết',
    core: 'bold tribal and flame graphics along the sides and hood',
    variants: ['black tribal over the body colour', 'red flame graphics', 'blue ice-flame graphics'] },

  // ── Cao cấp & chủ đề ──────────────────────────────────────────────
  { id: 'two-tone', name: 'Hai tông sang trọng', group: 'Cao cấp & chủ đề',
    core: 'an elegant two-tone executive wrap split cleanly along the beltline',
    variants: ['black over champagne', 'navy over silver', 'burgundy over grey'] },
  { id: 'gold-accent-luxury', name: 'Điểm nhấn vàng', group: 'Cao cấp & chủ đề',
    core: 'an understated luxury wrap with tasteful gold accents and fine pinstriping',
    variants: ['black with gold accents', 'white with gold accents', 'dark green with gold accents'] },
  { id: 'stealth', name: 'Stealth tối giản', group: 'Cao cấp & chủ đề',
    core: 'a stealth murdered-out theme in satin black with gloss-black badges',
    variants: ['pure satin black', 'grey-black stealth', 'satin black with dark bronze accents'] },
  { id: 'retro-vintage', name: 'Retro cổ điển', group: 'Cao cấp & chủ đề',
    core: 'a retro vintage look with 70s-style colour blocking and heritage racing stripes',
    variants: ['cream and red retro', 'orange and brown 70s theme', 'teal and white retro'] },
  { id: 'cyberpunk-neon', name: 'Cyberpunk Neon', group: 'Cao cấp & chủ đề',
    core: 'a dark cyberpunk wrap with glowing neon accent lines tracing the body panels',
    variants: ['magenta-and-cyan neon', 'green-and-purple neon', 'blue-and-orange neon'] },
];

// Extra randomised touches layered on top of any style for more variation.
const ACCENTS = [
  'add a thin contrasting pinstripe along the beltline',
  'add subtle tone-on-tone gloss-on-matte accents on the hood',
  'colour the wheel rims to complement the wrap',
  'keep it clean with minimal extra graphics',
  'add a subtle gradient fade towards the rear bumper',
  'add small geometric accents near the front air intakes',
];

const SHEET_INTRO =
  'Show how THIS exact car would look after a full-body custom vinyl WRAP / decal makeover. ' +
  'MAIN GOAL: completely re-wrap the entire exterior with the new design below — the original paint colour must be ' +
  'FULLY replaced with a bold, saturated, clearly visible wrap covering the hood, roof, doors, bumpers and mirrors. ' +
  'Keep only the car itself unchanged: same make, model, body shape, wheels, lights, glass and proportions. ' +
  'Compose ONE single wide landscape design sheet (aspect ratio 3:2) on a soft, even studio-grey background. ' +
  'Lay it out as a NEAT, EVENLY SPACED GRID of exactly 2 rows and 3 columns = 6 equal-sized cells. ' +
  'ALL SIX cells must be fully inside the frame with even margins — do NOT crop, cut off, overlap or let any car ' +
  'touch the outer edges; nothing may be hidden below the bottom edge. ' +
  'Each cell shows the SAME wrapped car from a DIFFERENT, clearly distinct camera angle: ' +
  'TOP ROW left-to-right — (1) front three-quarter, (2) straight front, (3) rear three-quarter; ' +
  'BOTTOM ROW left-to-right — (4) full side profile, (5) straight rear, (6) top-down roof view. ' +
  'The six angles must look clearly different from one another (do not repeat the same view). ' +
  'The wrap design MUST be identical and consistent across all six cells.';

const SHEET_OUTRO =
  'Photorealistic, high detail, even studio lighting with subtle reflections. ' +
  'Absolutely NO text, words, letters, numbers, labels, captions, brand names, logos or watermark ' +
  'anywhere on the vehicle or in the image. No additional vehicles.';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Compose the full image-model prompt. Server-side only.
 * @param styleId one of WRAP_STYLES ids (may be empty)
 * @param customText optional free-text description typed by the user
 */
export function buildWrapPrompt(styleId: string, customText: string): string {
  const custom = (customText || '').trim().slice(0, 400);

  // A typed description takes full priority — the preset style is ignored.
  // Reframe it as a VISUAL THEME so the model paints a matching design rather
  // than literally spelling the words onto the car.
  if (custom) {
    return (
      `${SHEET_INTRO}\n\n` +
      `Wrap design theme: interpret the following ONLY as a visual style — colours, patterns, motifs and mood — ` +
      `and translate it into a tasteful painted/printed wrap graphic. ` +
      `Do NOT write, spell or print these words, letters or any text on the car. ` +
      `If it names a real brand, mascot or copyrighted character, do NOT reproduce that character, logo or trademarked artwork — ` +
      `instead create an ORIGINAL design that merely evokes a similar general aesthetic ` +
      `(colour palette, mood and simple motifs). ` +
      `The ENTIRE car body must be fully wrapped in this design theme: "${custom}".\n\n` +
      `${SHEET_OUTRO}`
    );
  }

  const style = WRAP_STYLES.find(s => s.id === styleId) ?? WRAP_STYLES[0];
  const design = `${style.core}, ${pick(style.variants)}`;
  return `${SHEET_INTRO}\n\nThe ENTIRE car body is fully wrapped in ${design}. ${pick(ACCENTS)}.\n\n${SHEET_OUTRO}`;
}
