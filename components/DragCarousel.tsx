"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  partial?: boolean;
};

export default function DragCarousel({ slides }: { slides: Slide[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  const drag = useRef({
    active: false,
    startX: 0,
    startLeft: 0,
  });

  const [thumb, setThumb] = useState({
    width: 24,
    left: 0,
  });

  const [dragging, setDragging] = useState(false);

  const updateThumb = useCallback(() => {
    const el = scroller.current;

    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;

    const width = Math.min(
      100,
      (el.clientWidth / el.scrollWidth) * 100
    );

    const left =
      max > 0
        ? (el.scrollLeft / max) * (100 - width)
        : 0;

    setThumb({
      width,
      left,
    });
  }, []);

  useEffect(() => {
    updateThumb();

    window.addEventListener("resize", updateThumb);

    return () => {
      window.removeEventListener("resize", updateThumb);
    };
  }, [updateThumb]);

  const onPointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const el = scroller.current;

    if (!el) return;

    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
    };

    setDragging(true);

    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const el = scroller.current;

    if (!drag.current.active || !el) {
      return;
    }

    const dx =
      e.clientX - drag.current.startX;

    el.scrollLeft =
      drag.current.startLeft - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  return (
         <div>
              <div
          ref={scroller}
          onScroll={updateThumb}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={`no-scrollbar relative flex gap-[10px] overflow-x-auto select-none ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
        {slides.map((slide) => (
          <div
            key={slide.src}
            className="aspect-[480/271] w-[86%] shrink-0 overflow-hidden rounded-[14px] bg-[#efefef] sm:w-[83%]"
          >
            <img
              src={slide.src}
              alt={slide.alt}
              draggable={false}
              className={`h-full w-full ${
                slide.partial
                  ? "object-contain object-left"
                  : "object-cover"
              }`}
            />
          </div>
        ))}
        <div
          className="
            pointer-events-none
            absolute
            left-[543px]
            top-[218.63px]
            z-[100]
            flex
            h-20
            w-20
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#D9D9D9]
            text-[14px]
            font-medium
            text-black
          "
        >
          DRAG
        </div>
      </div>

      <div className="relative mt-[29px] h-[3px] w-full rounded-full bg-track">
        <div
          className="absolute top-0 h-full rounded-full bg-thumb transition-[left] duration-75"
          style={{
            width: `${thumb.width}%`,
            left: `${thumb.left}%`,
          }}
        />
      </div>
    </div>
  );
}