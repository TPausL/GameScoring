import React, { SVGProps } from "react";

function Tally({
  count,
  viewHeight,
  ...rest
}: SVGProps<SVGSVGElement> & {
  count: number;
  strokeWidth?: number;
  viewHeight?: number;
}) {
  const strokeWidth = rest.strokeWidth ?? 100;
  const vHeight = viewHeight ?? 400;
  const viewWidth = (): number => {
    return strokeWidth * count + (count - 1) * (strokeWidth / 2);
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox={`0 0 ${viewWidth()} ${vHeight}`}
      stroke="black"
      {...rest}
      strokeWidth={strokeWidth}
    >
      {[...Array(count)].map((_, i) => {
        const num = i + 1;
        if (num % 5 == 0) {
          const c = Math.floor(num / 5) - 1;
          return (
            <line
              x1={1.5 * strokeWidth - strokeWidth + 1.5 * strokeWidth * c * 5}
              x2={
                1.5 * strokeWidth * 4 - strokeWidth + 1.5 * strokeWidth * c * 5
              }
              y1={vHeight - strokeWidth / 2}
              y2={strokeWidth}
            />
          );
        } else {
          return (
            <line
              x1={1.5 * strokeWidth * num - strokeWidth}
              x2={1.5 * strokeWidth * num - strokeWidth}
              y1={strokeWidth / 2}
              y2={vHeight - strokeWidth / 2}
            />
          );
        }
      })}
    </svg>
  );
}

export default Tally;
