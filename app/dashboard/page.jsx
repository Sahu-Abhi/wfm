"use client";
import Dashboard_Nav from "@components/Dashboard_Nav";
import Message from "@components/Message";
import ProjectCard from "@components/ProjectCard";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const getProjects = async () => {
  try {
    const res = await fetch("/api/projects", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Projects");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading Projects...", error);
  }
};

function getCurrentDate() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;
  return currentDate;
}

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState(null);
  const [projectCount, setProjectCount] = useState(null);
  // const refreshPage = () => {
  //   router.refresh();
  // }
  const getData = async () => {
    const { projects, projectCount } = await getProjects();
    projects && setProjects(projects);
    projectCount && setProjectCount(projectCount);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" w-full h-full flex flex-col bg-[#F5F5F5]">
      <Dashboard_Nav isInsideProjectCard={false} data={getData} />

      <div className="flex h-full overflow-hidden pr-6 pb-6 pl-0 ">
        {/* Navigation Bar */}
        <div className="px-4 flex flex-col items-center bg-slate-100 h-screen fixed z-50 mx-4 rounded-xl drop-shadow-md">
          <Link
            href="/dashboard"
            className="text-[#1f1c2e] my-4 mx-0 transition rounded-[50%] flex-shrink-0 w-10 h-10 flex justify-center items-center hover:bg-[#c3cff4] hover:text-[#fff] active:bg-[#1f1c2e] active:text-[#fff]">
            <HomeOutlinedIcon className="text-2xl" />
          </Link>
        </div>
        <div className="ml-28 pt-8 pr-8 pb-0 pl-8 overflow-hidden h-full flex flex-col flex-[2]  drop-shadow-md">
        <div className=" flex justify-start gap-8 pb-8">
            
              <div className="p-8  bg-white rounded-xl flex flex-col gap-1">
                <span className="font-semibold text-4xl text-blue-700">{projectCount}</span>
                <span className="font-semibold">Total Projects</span>
              </div>
              <div className="p-8  bg-white rounded-xl flex flex-col gap-1">
                <span className="font-semibold text-4xl text-yellow-400">5</span>
                <span className="font-semibold">On Going Projects</span>
              </div>
              <div className="p-8  bg-white rounded-xl flex flex-col gap-1">
                <span className="font-semibold text-4xl text-green-600">6</span>
                <span className="font-semibold">Completed Projects</span>
              </div>
              <div className="p-8  bg-white rounded-xl flex flex-col gap-1">
                <span className="font-semibold text-4xl text-orange-400">24</span>
                <span className="font-semibold">Upcoming Projects</span>
              </div>
              
            
          </div>
        <div className=" rounded-[32px] pt-8 pr-8 pb-0 pl-8 overflow-hidden h-full flex flex-col flex-[2] bg-[#FFFFFF] drop-shadow-md">
          <div className=" flex justify-between items-center mb-8 text-[#1f1c2e]">
            <p className="text-2xl font-bold bg-opacity-[0.9] m-0 text-[#1f1c2e]">
              Projects
            </p>
            
          </div>
          

          <div className=" my-0 mx-[-8px] overflow-y-auto grid grid-cols-3">
            {projects?.map((p) => (
              <ProjectCard
                key={p._id}
                id={p._id}
                title={p.title}
                description={p.description}
                progress={p.progress}
                users={p.users}
                deadline={p.deadline}
              />
            ))}
          </div>
          </div>
        </div>
        
        <Message />
      </div>
      
    </div>
  );
}
