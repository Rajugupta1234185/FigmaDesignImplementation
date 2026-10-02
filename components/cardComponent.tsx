// "use client";

// import { useEffect, useRef, useState } from "react";
// import AnimatedCourseCard, { type CardEffect } from "./AnimatedCourseCard";
// import { CardContent } from "./NarrowCard";

// const Courses: CardContent[] = [
//   {
//     courseNumber: 23,
//     courseStatus: "All Courses",
//     description: "courses you're powering through right now.",
//     isActive: true,
//   },
//   {
//     courseNumber: 5,
//     courseStatus: "Upcoming Courses",
//     description: "exciting new courses waiting to boost your skills.",
//     isActive: false,
//   },
//   {
//     courseNumber: 10,
//     courseStatus: "Ongoing Courses",
//     description: "currently happening—don't miss out on the action!",
//     isActive: false,
//   },
// ];

// const SQUEEZE_DELAY = 280; // 2 wobble phases × 140ms (PHASE_MS in NarrowCard)

// export default function CardComponent() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [pending, setPending] = useState<number | null>(null);
//   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, []);

//   const handleSelect = (index: number) => {
//     if (index === activeIndex || pending !== null) return;

//     setPending(index);

//     timerRef.current = setTimeout(() => {
//       setPending(null);
//       setActiveIndex(index);
//     }, SQUEEZE_DELAY);
//   };

//   const getEffect = (index: number): CardEffect => {
//     if (pending === null) return null;
//     const clickedIsLeft = pending < activeIndex;

//     if (index === activeIndex) {
//       return { type: "expand", toward: clickedIsLeft ? "left" : "right" };
//     }
//     if (index === pending) {
//       return { type: "squeeze", from: clickedIsLeft ? "right" : "left" };
//     }
//     return null;
//   };

//   return (
//     <div className="mt-[50px] ml-[112px] mr-[112px] flex items-start justify-between">
//       {Courses.map((course, index) => (
//         <AnimatedCourseCard
//           key={course.courseNumber}
//           course={course}
//           active={activeIndex === index}
//           effect={getEffect(index)}
//           onClick={() => handleSelect(index)}
//         />
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedCourseCard, { type CardEffect } from "./AnimatedCourseCard";
import { CardContent } from "./NarrowCard";

const Courses: CardContent[] = [
  {
    courseNumber: 23,
    courseStatus: "All Courses",
    description: "courses you're powering through right now.",
    isActive: true,
  },
  {
    courseNumber: 5,
    courseStatus: "Upcoming Courses",
    description: "exciting new courses waiting to boost your skills.",
    isActive: false,
  },
  {
    courseNumber: 10,
    courseStatus: "Ongoing Courses",
    description: "currently happening—don't miss out on the action!",
    isActive: false,
  },
];

const SQUEEZE_DELAY = 280; // 2 wobble phases × 140ms (PHASE_MS in NarrowCard)

// Design size of the row (one wide + two narrow cards + two gaps)
const WIDE_W = 592;
const NARROW_W = 280;
const CARD_H = 461;
const GAP = 96;
const DESIGN_W = WIDE_W + NARROW_W * 2 + GAP * 2; // 1344

// Below this scale the text gets too small, so the row scrolls sideways instead
const MIN_SCALE = 0.55;

export default function CardComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pending, setPending] = useState<number | null>(null);
  const [scale, setScale] = useState<number | null>(null); // null until measured
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Fit the row to the available width (never scale above 1)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () =>
      setScale(Math.min(1, Math.max(MIN_SCALE, el.clientWidth / DESIGN_W)));

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || scale === null) return;

    const cardLeft = activeIndex * (NARROW_W + GAP) * scale;
    const cardWidth = WIDE_W * scale;

    wrap.scrollTo({
      left: cardLeft + cardWidth / 2 - wrap.clientWidth / 2,
      behavior: "smooth",
    });
  }, [activeIndex, scale]);

  const handleSelect = (index: number) => {
    if (index === activeIndex || pending !== null) return;

    setPending(index);

    timerRef.current = setTimeout(() => {
      setPending(null);
      setActiveIndex(index);
    }, SQUEEZE_DELAY);
  };

  const getEffect = (index: number): CardEffect => {
    if (pending === null) return null;
    const clickedIsLeft = pending < activeIndex;

    if (index === activeIndex) {
      return { type: "expand", toward: clickedIsLeft ? "left" : "right" };
    }
    if (index === pending) {
      return { type: "squeeze", from: clickedIsLeft ? "right" : "left" };
    }
    return null;
  };

  const s = scale ?? 1;

  return (
    <section className="mt-8 px-4 md:mt-[50px] md:px-12 xl:px-[112px]">
      <div
        ref={wrapRef}
        className="no-scrollbar w-full overflow-x-auto"
        style={{ visibility: scale === null ? "hidden" : "visible" }}
      >
        <div
          className="mx-auto"
          style={{ width: DESIGN_W * s, height: CARD_H * s }}
        >
          <div
            className="flex items-start"
            style={{
              width: DESIGN_W,
              gap: GAP,
              transform: `scale(${s})`,
              transformOrigin: "top left",
            }}
          >
            {Courses.map((course, index) => (
              <AnimatedCourseCard
                key={course.courseNumber}
                course={course}
                active={activeIndex === index}
                effect={getEffect(index)}
                onClick={() => handleSelect(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}