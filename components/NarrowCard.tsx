"use client";

import { useEffect, useState } from "react";

export type CardContent = {
  courseNumber: number;
  courseStatus: "Upcoming Courses" | "Ongoing Courses" | "All Courses";
  description: string;
  isActive: boolean;
};

type NarrowCardProps = CardContent & {
  squeezed?: boolean;
  activating?: boolean;
};

const BASE_ROTATE = -90;
const TILT_LEFT = -12;
const TILT_RIGHT = 30;
const PHASE_MS = 140;

const TEXT_SHIFT_X = 300;
const TEXT_SHIFT_Y = 170;
const NUM_SHIFT_X = -27;
const NUM_SHIFT_Y = -20;

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const MORPH = `700ms ${EASE}`;
const WOBBLE_EASE = "cubic-bezier(0.455, 0.03, 0.515, 0.955)";

export default function NarrowCard({
  courseNumber,
  courseStatus,
  description,
  isActive,
  squeezed = false,
  activating = false,
}: NarrowCardProps) {
  const formattedNumber = courseNumber.toString().padStart(2, "0");
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    if (!squeezed) {
      setTilt(0);
      return;
    }
    setTilt(TILT_LEFT);
    const t = setTimeout(() => setTilt(TILT_RIGHT), PHASE_MS);
    return () => clearTimeout(t);
  }, [squeezed]);

  return (
    <div className="mx-[20px] flex h-[461px] w-[280px] flex-col items-center justify-center rounded-[32px] bg-[#f9EBEC]">
      {/* Rotated section */}
      <div className="flex h-[240px] w-[138px] items-end justify-end">
        <div
          className="flex w-[218px] origin-center flex-col items-end justify-end gap-3"
          style={{
            willChange: "transform",
            transform: activating
              ? `translate(${TEXT_SHIFT_X}px, ${TEXT_SHIFT_Y}px) rotate(0deg)`
              : `translate(0px, 0px) rotate(${BASE_ROTATE + tilt}deg)`,
            transition: squeezed
              ? `transform ${PHASE_MS}ms ${WOBBLE_EASE}`
              : `transform ${MORPH}`,
          }}
        >
          <p className="text-[32px] font-bold leading-[100%] text-[#C33242]">
            {courseStatus}
          </p>

          <p className="text-[16px] leading-[100%] text-[#C33241]">
            {description}
          </p>
        </div>
      </div>

      {/* Number */}
      <div
        className="flex items-center justify-center"
        style={{
          willChange: "transform",
          transform: activating
            ? `translate(${NUM_SHIFT_X}px, ${NUM_SHIFT_Y}px)`
            : "translate(0, 0)",
          transition: `transform ${MORPH}`,
        }}
      >
        <div className="relative text-[132px] font-bold text-[#C33241]">
          <span>{formattedNumber}</span>

          <span className="absolute -right-[20px] top-[10px] text-[40px]">
            +
          </span>
        </div>
      </div>
    </div>
  );
}