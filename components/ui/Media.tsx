import Image from "next/image";
import type { ReactNode } from "react";
import type { MediaTone } from "@/content/site";

/**
 * One component handles both states of every image on the site:
 *
 *   • `src` set   → an optimized next/image at the same crop.
 *   • `src` null  → an on-brand gradient placeholder whose caption doubles as
 *                   the shot note for whoever is taking the next photographs.
 */

type ToneSpec = {
  background: string;
  ink: "light" | "dark";
};

// Flat panels. Product cutouts sit on plain dark grey in layout A, the way
// a rental company shows its gear; the earlier gradients read as decoration.
const TONES: Record<MediaTone, ToneSpec> = {
  ember: { background: "#1f1f1f", ink: "light" },
  night: { background: "#1f1f1f", ink: "light" },
  sand: { background: "#1f1f1f", ink: "light" },
};

/* Low-contrast bars, echoing the logo, so a placeholder still looks designed. */
function Motif() {
  const bars = [0.35, 0.55, 1, 1, 1, 0.6, 0.45, 0.75, 1, 1, 0.65, 0.4];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
    >
      <g fill="currentColor" opacity="0.12">
        {bars.map((height, index) => (
          <rect
            key={index}
            x={40 + index * 27}
            y={300 - height * 190}
            width="20"
            height={height * 190}
          />
        ))}
      </g>
    </svg>
  );
}

const OVERLAYS = {
  none: null,
  soft: "linear-gradient(180deg, rgba(11,10,9,0.30) 0%, rgba(11,10,9,0.05) 40%, rgba(11,10,9,0.55) 100%)",
  // Dark at the bottom where the hero copy sits, lighter toward the top so
  // the rig still shows.
  strong:
    "linear-gradient(0deg, rgba(0,0,0,0.92) 10%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.25) 100%)",
} as const;

export type MediaProps = {
  tone: MediaTone;
  shotNote?: string;
  src?: string | null;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: keyof typeof OVERLAYS;
  hideNote?: boolean;
  /**
   * "cover" fills the frame and crops, right for photographs. "contain" keeps
   * the designed gradient behind the image and fits the whole image inside
   * it, right for product cutouts on a transparent background, which would
   * lose their edges to a crop.
   */
  fit?: "cover" | "contain";
  /** Extra classes on the img itself, e.g. padding or object-position for "contain". */
  imageClassName?: string;
  children?: ReactNode;
};

export function Media({
  tone,
  shotNote,
  src = null,
  alt = "",
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  overlay = "none",
  hideNote = false,
  fit = "cover",
  imageClassName = "",
  children,
}: MediaProps) {
  const spec = TONES[tone];
  const overlayImage = OVERLAYS[overlay];
  const noteOnLight = spec.ink === "dark" && !src;
  // The gradient and motif stay when there is no image, and also under a
  // contained one, where they are the backdrop the product sits on.
  const backdrop = !src || fit === "contain";

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={backdrop ? { background: spec.background } : undefined}
    >
      {backdrop ? (
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${
            spec.ink === "light" ? "text-bone" : "text-ink"
          }`}
        >
          {/* The equalizer bars only fill an empty slot now. Behind a
              product photo they looked like template decoration. */}
          {src ? null : <Motif />}
        </div>
      ) : null}

      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          // Next 16 dropped fetchpriority from `priority`, and Lighthouse
          // flagged the hero for it, so the hint is set here by hand.
          preload={priority}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? "eager" : "lazy"}
          className={`${fit === "contain" ? "object-contain" : "object-cover"} ${imageClassName}`}
        />
      ) : null}

      {overlayImage ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{ backgroundImage: overlayImage }}
        />
      ) : null}

      {children ? <div className="relative z-[3] h-full">{children}</div> : null}

      {!src && shotNote && !hideNote ? (
        <div
          className={`absolute bottom-0 left-0 z-[3] flex max-w-[92%] items-center gap-2 p-3 sm:p-4 ${
            noteOnLight ? "text-ink/70" : "text-bone/80"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              noteOnLight ? "bg-ink/45" : "bg-bone/70"
            }`}
          />
          <span className="text-[0.8125rem] leading-relaxed">{shotNote}</span>
        </div>
      ) : null}
    </div>
  );
}
