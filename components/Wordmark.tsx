/**
 * The Arizona Sound System mark, redrawn as SVG from the supplied PNG so it
 * scales cleanly and can sit on light and dark surfaces.
 *
 * Twelve equaliser bars in terracotta in front of a sunset sun. In the
 * original the bars carry a black outline that cuts them out of the sun; here
 * that outline is `--mark-cutout`, which globals.css sets to the surface
 * colour (night by default, bone inside `.on-light`), so the effect survives a
 * change of background. `mono` draws everything in currentColor for footers
 * and favicons.
 *
 * Coordinates were measured off the 2000px PNG; the viewBox crops to the
 * artwork's bounding box.
 */
const BARS: ReadonlyArray<[x: number, top: number]> = [
  [268, 1330],
  [388, 1235],
  [505, 945],
  [622, 945],
  [740, 945],
  [858, 1185],
  [977, 1285],
  [1095, 1095],
  [1213, 760],
  [1330, 760],
  [1448, 1140],
  [1565, 1305],
];

const BAR_WIDTH = 103;
const BASELINE = 1545;

export function Mark({
  className = "",
  mono = false,
  title,
}: {
  className?: string;
  mono?: boolean;
  /** Accessible name. Omit when the mark sits next to visible text. */
  title?: string;
}) {
  const gradientId = mono ? undefined : "azss-sun";

  return (
    <svg
      viewBox="250 460 1440 1100"
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      focusable="false"
      className={className}
    >
      {title ? <title>{title}</title> : null}
      {mono ? null : (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e2a233" />
            <stop offset="1" stopColor="#e4592c" />
          </linearGradient>
        </defs>
      )}
      <circle
        cx="1015"
        cy="750"
        r="275"
        fill={mono ? "currentColor" : `url(#${gradientId})`}
      />
      {BARS.map(([x, top]) => (
        <rect
          key={x}
          x={x}
          y={top}
          width={BAR_WIDTH}
          height={BASELINE - top}
          fill={mono ? "currentColor" : "#c25a3a"}
          stroke="var(--mark-cutout, #0b0a09)"
          strokeWidth="18"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/**
 * Mark plus the name, for the header and footer. The name is real text so it
 * reads aloud, indexes and copies.
 */
export function Wordmark({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  const large = size === "lg";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark className={`${large ? "h-11" : "h-8"} w-auto shrink-0`} />
      <span
        className={`font-display leading-none font-semibold tracking-[-0.02em] uppercase ${
          large ? "text-[1.35rem]" : "text-[1.05rem]"
        }`}
      >
        Arizona
        <span className="opacity-70"> Sound System</span>
      </span>
    </span>
  );
}
