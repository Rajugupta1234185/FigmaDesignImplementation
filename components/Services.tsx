"use client";

import { useEffect, useState } from "react";
import DragCarousel from "./DragCarousel";

const services = ["UI / UX", "Development", "Blockchain"];

const slides = [
  {
    src: "/images/1.jpg",
    alt: "Person working at a desk with a laptop and calculator",
  },
  {
    src: "/images/2.jpg",
    alt: "Office phone and remote on a white desk",
  },
  {
    src: "/images/3.jpg",
    alt: "Person working at a desk with a laptop and calculator",
  },
  {
    src: "/images/4.jpg",
    alt: "Office phone and remote on a white desk",
  },
];

const ITEM_HEIGHT = 62.4;

const WAIT_TIME = 500;
const SLIDE_TIME = 1000;
const STAGGER_DELAY = 200;

export default function Services() {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentServices = services.map(
    (_, position) => services[(step + position) % services.length]
  );

  const nextServices = services.map(
    (_, position) => services[(step + position + 1) % services.length]
  );

  useEffect(() => {
    let animationTimer: number | undefined;

    const waitTimer = window.setTimeout(() => {
      setIsAnimating(true);

      animationTimer = window.setTimeout(() => {
        setStep((previous) => (previous + 1) % services.length);
        setIsAnimating(false);
      }, SLIDE_TIME + STAGGER_DELAY * 2);
    }, WAIT_TIME);

    return () => {
      window.clearTimeout(waitTimer);

      if (animationTimer !== undefined) {
        window.clearTimeout(animationTimer);
      }
    };
  }, [step]);

  return (
    <section className="mx-auto w-full max-w-[1280px] overflow-hidden px-5 pt-9 sm:px-8 lg:px-[50px]">
      <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
        <div className="w-full shrink-0 lg:w-[800px]">
          <p className="w-full max-w-[625px] text-[28px] font-medium leading-[140%] text-body sm:text-[32px] lg:text-[36px]">
            Experience our expert solutions tailored to enhance your business
            with top-tier design, development, and animation.
          </p>

          <p className="mt-[29px] inline-flex h-[48px] w-[106px] items-center justify-center rounded-full bg-brand px-[20px] py-[20px] text-[16px] font-medium text-white transition hover:brightness-110">
            Services
          </p>
        </div>
        <div
          id="services"
          className="relative h-[187.2px] w-full shrink-0 overflow-hidden font-oakes text-[40px] font-bold leading-[1.2] tracking-[-0.4px] text-ink sm:text-[46px] lg:w-[650px] lg:text-[52px] lg:tracking-[-0.52px]"
        >
          {/* CURRENT SERVICES */}
          {currentServices.map((service, position) => (
            <div
              key={`current-${step}-${service}`}
              className="absolute left-0 whitespace-nowrap"
              style={{
                top: `${position * ITEM_HEIGHT}px`,
                opacity: isAnimating ? 0 : 1,
                transition: "opacity 180ms ease-out",
              }}
            >
              {service}
            </div>
          ))}

          
          {isAnimating &&
            nextServices.map((service, position) => {
              const isUIUXMovingToBottom =
                service === "UI / UX" && position === 2;

              return (
                <div
                  key={`next-${step}-${service}`}
                  className={`absolute left-0 whitespace-nowrap ${
                    isUIUXMovingToBottom
                      ? "service-item-enter-down"
                      : "service-item-enter"
                  }`}
                  style={{
                    top: `${position * ITEM_HEIGHT}px`,
                    animationDuration: `${SLIDE_TIME}ms`,
                    animationDelay: `${
                      (2 - position) * STAGGER_DELAY
                    }ms`,
                  }}
                >
                  {service}
                </div>
              );
            })}
        </div>
      </div>

      <div className="relative mt-12 sm:mt-[72px] lg:mt-[88px]">
        

        <DragCarousel slides={slides} />
      </div>
    </section>
  );
}