interface RootDividerProps {
  className?: string;
}

/**
 * Decorative SVG of a trunk branching into a root system, used as a
 * section divider so the leaf/tree identity "grows" down the page.
 * Pure decoration: aria-hidden, colors come from CSS variables so it
 * adapts to both themes.
 */
export function RootDivider({ className = '' }: RootDividerProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 200"
      width="100%"
      height="140"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" strokeLinecap="round">
        <path d="M720,0 L720,40" stroke="var(--accent)" strokeWidth="5" opacity="0.9" />
        <path
          d="M720,40 C680,60 600,65 480,95"
          stroke="var(--accent)"
          strokeWidth="3.5"
          opacity="0.75"
        />
        <path
          d="M720,40 C760,60 840,65 960,95"
          stroke="var(--accent)"
          strokeWidth="3.5"
          opacity="0.75"
        />
        <path
          d="M480,95 C440,115 380,120 300,150"
          stroke="var(--accent)"
          strokeWidth="2.2"
          opacity="0.55"
        />
        <path
          d="M480,95 C500,120 520,130 540,160"
          stroke="var(--accent)"
          strokeWidth="2.2"
          opacity="0.55"
        />
        <path
          d="M960,95 C1000,115 1060,120 1140,150"
          stroke="var(--accent)"
          strokeWidth="2.2"
          opacity="0.55"
        />
        <path
          d="M960,95 C940,120 920,130 900,160"
          stroke="var(--accent)"
          strokeWidth="2.2"
          opacity="0.55"
        />
        <path
          d="M300,150 C260,170 220,180 180,195"
          stroke="var(--accent)"
          strokeWidth="1.3"
          opacity="0.35"
        />
        <path
          d="M540,160 C545,175 555,185 565,198"
          stroke="var(--accent)"
          strokeWidth="1.3"
          opacity="0.35"
        />
        <path
          d="M480,95 C470,130 465,160 460,195"
          stroke="var(--accent)"
          strokeWidth="1.3"
          opacity="0.35"
        />
        <path
          d="M1140,150 C1180,170 1220,180 1260,195"
          stroke="var(--accent)"
          strokeWidth="1.3"
          opacity="0.35"
        />
        <path
          d="M900,160 C895,175 885,185 875,198"
          stroke="var(--accent)"
          strokeWidth="1.3"
          opacity="0.35"
        />
        <path
          d="M960,95 C970,130 975,160 980,195"
          stroke="var(--accent)"
          strokeWidth="1.3"
          opacity="0.35"
        />
      </g>
    </svg>
  );
}
