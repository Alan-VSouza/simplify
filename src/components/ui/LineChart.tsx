interface Series {
  label: string;
  color: string;
  values: number[];
}

interface LineChartProps {
  series: Series[];
  height?: number;
  ariaLabel: string;
}

/**
 * Minimal dependency-free SVG line chart. Good enough for the small
 * month-by-month series this app plots, without pulling in a charting lib.
 */
export function LineChart({ series, height = 220, ariaLabel }: LineChartProps) {
  const width = 600;
  const padding = 24;

  const allValues = series.flatMap((s) => s.values);
  const max = Math.max(...allValues, 1);
  const min = Math.min(...allValues, 0);
  const range = max - min || 1;
  const pointCount = Math.max(...series.map((s) => s.values.length), 1);

  const toPoints = (values: number[]) =>
    values
      .map((value, index) => {
        const x = padding + (index / (pointCount - 1 || 1)) * (width - padding * 2);
        const y = height - padding - ((value - min) / range) * (height - padding * 2);
        return `${x},${y}`;
      })
      .join(' ');

  return (
    <figure>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
        width="100%"
        height={height}
      >
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="var(--border)"
        />
        {series.map((s) => (
          <polyline
            key={s.label}
            fill="none"
            stroke={s.color}
            strokeWidth={2}
            points={toPoints(s.values)}
          />
        ))}
      </svg>
      <figcaption>
        {series.map((s) => (
          <span key={s.label} style={{ color: s.color, marginRight: 12 }}>
            ● {s.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
