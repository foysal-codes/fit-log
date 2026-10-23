import Image from "next/image";
import React from "react";
import footer from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer flex justify-between align-middle sm:footer-horizontal bg-neutral text-neutral-content items-center p-4 ">
      <div className=" flex justify-between">
        <Image src={footer} alt="footer Logo"></Image>
        <p className="uppercase font-bold">FitLog</p>
      </div>
      <div>
        <p>© 2026 FitLog - Workout Library. Train hard, log honest</p>
      </div>
    </footer>
  );
};

export default Footer;
