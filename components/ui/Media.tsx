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

const TONES: Record<MediaTone, ToneSpec> = {
  // Plain gradients, no highlights. Earlier versions painted a bright sun
  // spot into "ember" and a light bloom into the others; behind product
  // cutouts it read as lens flare.
  ember: {
    background: "linear-gradient(160deg, #0b0a09 0%, #1e1a16 50%, #3a2117 100%)",
    ink: "light",
  },
  night: {
    background: "linear-gradient(150deg, #2a2420 0%, #1a1613 58%, #0b0a09 100%)",
    ink: "light",
  },
  sand: {
    background: "linear-gradient(150deg, #faf6ee 0%, #e8dcc6 56%, #d6c4a3 100%)",
    ink: "dark",
  },
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
  // Left-side scrim protects the copy while the right stays bright; the second
  // layer darkens only the nav and meta strips.
  strong: [
    "linear-gradient(96deg, rgba(11,10,9,0.92) 0%, rgba(11,10,9,0.72) 32%, rgba(11,10,9,0.28) 64%, rgba(11,10,9,0.05) 100%)",
    "linear-gradient(180deg, rgba(11,10,9,0.62) 0%, rgba(11,10,9,0) 22%, rgba(11,10,9,0) 68%, rgba(11,10,9,0.7) 100%)",
  ].join(","),
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
      className={`grain relative isolate overflow-hidden ${className}`}
      style={backdrop ? { backgroundImage: spec.background } : undefined}
    >
      {backdrop ? (
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${
            spec.ink === "light" ? "text-bone" : "text-ink"
          }`}
        >
          <Motif />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(125% 105% at 50% 45%, rgba(11,10,9,0) 44%, rgba(11,10,9,0.22) 100%)",
            }}
          />
        </div>
      ) : null}

      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
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
          <span className="label-xs leading-relaxed">{shotNote}</span>
        </div>
      ) : null}
    </div>
  );
}
