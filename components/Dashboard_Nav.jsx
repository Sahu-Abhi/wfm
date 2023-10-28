'use client';

import Image from "next/image";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Dashboard_Nav() {

  const { data: session, status } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  let dropdownRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setToggleDropdown(false);
      }
      console.log(dropdownRef);
    };

    document.addEventListener("mousedown", handler);
  });

  return (
    <div className=" flex justify-between items-center py-4 px-6 w-full relative">
        <div className=" flex items-center grow">
          <Image
            src="/assets/logo.svg"
            width={80}
            height={30}
            className="object-contain header-left"
            alt=""
          />
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

          <Link href="dashboard/add-project" title="Add New Project" className="ml-3">
            <AddCircleRoundedIcon className="text-3xl" />
          </Link>

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
                  onClick={() => setToggleDropdown(!toggleDropdown)}
                />
                <span className="text-[#1f1c2e] text-base font-bold">
                  {session?.user.name}
                </span>
              </button>
              {toggleDropdown && (
                <div className="dropdown" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown((prev) => {
                        return !prev;
                      });
                      signOut({ callbackUrl: "http://localhost:3000" });
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
  )
}
