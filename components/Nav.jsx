"use client";

import Link from "next/link";
// import LoginBtn from "./LoginBtn";
import Image from "next/image";
import { useState, useEffect } from "react";


const Nav = () => {
  const isUserLoggedIn = false;

  return (
    <nav className=" bg-[#101010] w-full pt-3 pb-2 flex justify-evenly text-lg shadow-2xl border-b-4 border-[#2F2F2F]">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/logo.svg"
          width={80}
          height={30}
          className="object-contain"
          alt=""
        />
      </Link>
      <ul className=" flex flex-row text-slate-50 gap-8 items-center">
        <li>About</li>
        <li><Link href='#price-section'>Pricing</Link></li>
        <li>Resources</li>
        <li>Contact</li>
      </ul>
      {/* <LoginBtn /> */}
    </nav>
  );
};

export default Nav;
