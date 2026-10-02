"use client";

import NarrowCard from "./NarrowCard";
import WideCard from "./WiderCard.component";
import type { CardContent } from "./NarrowCard";

export type CardEffect =
  | { type: "expand"; toward: "left" | "right" }
  | { type: "squeeze"; from: "left" | "right" }
  | null;

type AnimatedCourseCardProps = {
  course: CardContent;
  active: boolean;
  onClick: () => void;
  effect?: CardEffect;
};

const EXPAND_PX = 24;
const SQUEEZE_PX = 24;
const SQUEEZE_MS = 180;

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)"; // shared with mask + text morph
const EASE_OUT_QUAD = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const EASE_IN_OUT_QUAD = "cubic-bezier(0.455, 0.03, 0.515, 0.955)";

export default function AnimatedCourseCard({
  course,
  active,
  onClick,
  effect = null,
}: AnimatedCourseCardProps) {
  const baseWidth = active ? 592 : 280;

  let origin = "center";
  let scaleX = 1;

  if (effect?.type === "expand") {
    origin = effect.toward === "left" ? "right center" : "left center";
    scaleX = (baseWidth + EXPAND_PX) / baseWidth;
  } else if (effect?.type === "squeeze") {
    origin = effect.from === "right" ? "left center" : "right center";
    scaleX = (baseWidth - SQUEEZE_PX) / baseWidth;
  }

  return (
    <div
      onClick={onClick}
      className={`
        relative
        isolate
        h-[461px]
        shrink-0
        cursor-pointer
        overflow-hidden
        rounded-[32px]
        ${active ? "w-[592px]" : "w-[280px]"}
      `}
      style={{
        willChange: "width, transform",
        transformOrigin: origin,
        transform: `scaleX(${scaleX})`,
        transition: effect
          ? `width 700ms ${EASE}, transform ${SQUEEZE_MS}ms ${EASE_OUT_QUAD}`
          : `width 700ms ${EASE}, transform 500ms ${EASE_IN_OUT_QUAD}`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          willChange: "opacity",
          opacity: active ? 0 : 1,
          transition: active
            ? "opacity 250ms ease-in 350ms"
            : "opacity 250ms ease-out 0ms",
        }}
      >
        <NarrowCard
          {...course}
          isActive={false}
          squeezed={effect?.type === "squeeze"}
          activating={active}
        />
      </div>


      <div
        data-active={active}
        className="reveal-mask absolute left-0 top-0 h-[461px] w-[592px]"
      >
        <WideCard {...course} isActive={active} />
      </div>
    </div>
  );
}