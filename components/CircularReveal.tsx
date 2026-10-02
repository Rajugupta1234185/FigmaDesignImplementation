"use client";

import { ReactNode } from "react";

type CircularRevealProps = {
  children: ReactNode;
  active: boolean;
  origin?: string;
};

export default function CircularReveal({
  children,
  active,
  origin = "100% 100%",
}: CircularRevealProps) {
  return (
    <div
      className={`
        overflow-hidden
        transition-[clip-path]
        duration-700
        ease-in-out
      `}
      style={{
        clipPath: active
          ? `circle(150% at ${origin})`
          : `circle(0% at ${origin})`,
      }}
    >
      {children}
    </div>
  );
}