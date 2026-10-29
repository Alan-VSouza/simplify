interface MistyMountainsProps {
  className?: string;
}

/**
 * Hand-drawn layered mountain silhouette with a soft mist gradient,
 * used behind the hero instead of a stock photo (no external asset to
 * download, no licensing to worry about). Colors come from CSS
 * variables so it adapts to the current accent/ink palette.
 */
export function MistyMountains({ className = '' }: MistyMountainsProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 520"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0,420 L0,300 L160,220 L300,280 L460,160 L620,260 L760,190 L900,270 L1060,200 L1220,290 L1440,230 L1440,420 Z"
        fill="var(--leaf-green)"
        opacity="0.22"
      />
      <path
        d="M0,460 L0,340 L180,280 L340,330 L520,250 L700,320 L880,260 L1060,340 L1260,270 L1440,330 L1440,460 Z"
        fill="var(--leaf-green)"
        opacity="0.14"
      />
      <path
        d="M0,520 L0,400 L220,360 L420,400 L600,340 L820,400 L1020,350 L1220,400 L1440,370 L1440,520 Z"
        fill="var(--ink)"
      />
      <ellipse cx="300" cy="260" rx="280" ry="70" fill="var(--on-ink)" opacity="0.08" />
      <ellipse cx="900" cy="280" rx="340" ry="80" fill="var(--on-ink)" opacity="0.07" />
      <ellipse cx="1250" cy="320" rx="260" ry="60" fill="var(--leaf-green)" opacity="0.12" />
    </svg>
  );
}
