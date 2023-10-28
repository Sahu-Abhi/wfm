"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Dashboard_Nav from "@components/Dashboard_Nav";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Calendar } from "@/components/ui/calendar";

import Form from "@components/Form";

export default function AddProject() {
  const [date, setDate] = useState(new Date());

  const [submitting, setSubmitting] = useState(false);
  const [project, setProject] = useState({
    dateCreated: "",
    name: "",
    subTitle: "",
    progress: 0,
    users: [],
    daysRemaining: "",
  });

  const addProject = async (e) => {};

  return (
    <div className=" w-full h-full flex flex-col bg-transparent transition ">
      <Dashboard_Nav />

      <div className="flex h-full overflow-hidden pt-4 pr-6 pb-6 pl-0">
        <div className="py-10 px-4 flex flex-col items-center">
          <Link
            href="/dashboard"
            className="text-[#1f1c2e] my-4 mx-0 transition rounded-[50%] flex-shrink-0 w-10 h-10 flex justify-center items-center hover:bg-[#c3cff4] hover:text-[#fff] active:bg-[#1f1c2e] active:text-[#fff]">
            <HomeOutlinedIcon className="text-2xl" />
          </Link>
        </div>

        <Form
          type="Create"
          project={project}
          SetProject={setProject}
          submitting={submitting}
          handleSubmit={addProject}
        />
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  );
}
