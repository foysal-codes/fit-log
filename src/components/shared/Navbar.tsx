"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Logo from "@/assets/logo.png";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/workouts");

  const planCount = 0;
  const savedCount = 0;

  const links = [
    { name: "Workouts", href: "/workouts" },
    { name: "My Plan", href: "/my-plan" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#090a0c]">
      <nav className="relative mx-auto flex h-[76px] w-full items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo and Brand */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="Fitlog home"
        >
          <Image
            src={Logo}
            alt="Fitlog logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />

          <span className="text-base font-extrabold uppercase tracking-[0.06em] text-white sm:text-lg">
            FITLOG
          </span>
        </Link>

        {/* Center Navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              aria-current={activeLink === link.href ? "page" : undefined}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeLink === link.href
                  ? "bg-[#1c2300] text-[#ccff00]"
                  : "text-[#a1a1aa] hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Status Counters */}
        <div className="ml-auto flex shrink-0 items-center gap-4 sm:gap-6">
          {/* Plan Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-medium text-[#d4d4d8] transition-colors hover:text-white"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-xs font-bold leading-none text-black">
              {planCount}
            </span>
          </Link>

          {/* Saved Badge */}
          <Link
            href="/saved"
            className="flex items-center gap-2 text-sm font-medium text-[#a1a1aa] transition-colors hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#414149] px-1.5 text-xs font-medium leading-none text-[#d4d4d8]">
              {savedCount}
            </span>
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="flex items-center gap-2 border-t border-white/[0.06] px-5 py-2 sm:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setActiveLink(link.href)}
            aria-current={activeLink === link.href ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeLink === link.href
                ? "bg-[#1c2300] text-[#ccff00]"
                : "text-[#a1a1aa] hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
