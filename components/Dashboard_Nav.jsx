"use client";

import Image from "next/image";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import AddProject from "./AddProject";
import AddTask from "./AddTask";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";


export default function Dashboard_Nav({ isInsideProjectCard, projectID }) {
  const { data: session, status } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [togglePopover, setTogglePopover] = useState(false);

  let dropdownRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setToggleDropdown(false);
      }
      console.log(dropdownRef);
    };

    document.addEventListener("mousedown", handler);
  },[]);

  return (
    <div className=" flex justify-between items-center py-4 px-6 w-full relative">
      <div className=" flex items-center grow">
        <Link href={"http://localhost:3000/dashboard"}>
        <Image
          src="/assets/logo.svg"
          width={80}
          height={30}
          className="object-contain header-left fill-black"
          alt="WFM-Logo"
        />
        </Link>
        <p className="text-[#1f1c2e] m-0 text-xl font-bold my-0 mx-[32px]">
          WorkFlowMagnet
        </p>
      </div>

      <div className="app-header-right flex items-center">
        <button
          className="bg-transparent border-none p-0 text-[#1f1c2e] ml-3 flex justify-center items-center"
          title="Switch Theme">
          <DarkModeOutlinedIcon className="text-3xl" />
        </button>

        <Popover open={togglePopover}>
          <PopoverTrigger asChild>
            <AddCircleRoundedIcon className="text-3xl hidden" />
          </PopoverTrigger>
          <button
            className="ml-3"
            onClick={() => setTogglePopover(!togglePopover)}>
            <AddCircleRoundedIcon className="text-3xl" />
          </button>

          <PopoverContent className="w-auto rounded-xl relative left-[70vw] top-14">
            {isInsideProjectCard ? (
              <AddTask togglePopover={setTogglePopover} projectID={projectID} />
            ) : (
              <AddProject togglePopover={setTogglePopover} />
            )}
          </PopoverContent>
        </Popover>

        <button className=" ml-3">
          <NotificationsNoneOutlinedIcon className="text-3xl" />
        </button>

        {status === "authenticated" ? (
          <div className="flex">
            <button className="profile-btn p-0 border-0 bg-transparent flex items-center pl-3 border-l-2 border-solid border-[#ddd] ml-3">
              <Image
                width={37}
                height={37}
                className="w-8 h-8 rounded-[50%] mr-1"
                src={session?.user.image}
                alt="profile picture"
                onClick={() => setToggleDropdown(!toggleDropdown)}
              />
              <span className="text-[#1f1c2e] text-base font-bold">
                {session?.user.name}
              </span>
            </button>
            {toggleDropdown && (
              <div className="dropdown glassmorphism" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown((prev) => {
                      return !prev;
                    });
                    signOut({ callbackUrl: "/" });
                  }}
                  className="black_btn">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
