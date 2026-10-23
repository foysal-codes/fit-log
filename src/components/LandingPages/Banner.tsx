import Image from "next/image";
import React from "react";
import banner from "@/assets/banner.png";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="mx-4 mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-[#15161b] sm:mx-5">
      <div className="flex flex-col items-center justify-between gap-6 px-6 py-8 sm:px-8 sm:py-9 md:flex-row md:gap-8 md:px-10 md:py-10 lg:px-12">
        {/* Left: Banner Content */}
        <div className="w-full md:w-[60%]">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[38px]">
            TRAIN WITH INTENT. LOG
            <br className="hidden sm:block" /> EVERY SET.
          </h1>

          <p className="mt-4 max-w-md text-xs leading-relaxed text-[#9ca3af] sm:text-sm">
            Fitlog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-5 inline-flex min-h-9 items-center justify-center rounded-md bg-[#ccff00] px-5 py-2 text-xs font-bold uppercase text-black transition-colors hover:bg-[#b8e600] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#15161b]"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Right: Banner Image */}
        <div className="flex w-full items-center justify-center md:w-[40%] md:self-stretch">
          <Image
            src={banner}
            alt="Athlete training on gym equipment"
            priority
            className="h-auto max-h-[220px] w-auto max-w-full object-contain sm:max-h-[240px] md:max-h-[260px]"
            sizes="(max-width: 767px) 80vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
