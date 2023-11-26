"use client";
import Dashboard_Nav from "@components/Dashboard_Nav";
import Message from "@components/Message";
import ProjectCard from "@components/ProjectCard";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Link from "next/link";

const getProjects = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/projects", {
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

export default async function Dashboard() {
  const { projects, projectCount } = await getProjects();
  

  return (
    <div className=" w-full h-full flex flex-col bg-transparent transition ">
      <Dashboard_Nav isInsideProjectCard={false}/>

      <div className="flex h-full overflow-hidden pt-4 pr-6 pb-6 pl-0">
        <div className="py-10 px-4 flex flex-col items-center">
          <Link
            href="/dashboard"
            className="text-[#1f1c2e] my-4 mx-0 transition rounded-[50%] flex-shrink-0 w-10 h-10 flex justify-center items-center hover:bg-[#c3cff4] hover:text-[#fff] active:bg-[#1f1c2e] active:text-[#fff]">
            <HomeOutlinedIcon className="text-2xl" />
          </Link>
        </div>
        <div className="rounded-[32px] pt-8 pr-8 pb-0 pl-8 overflow-hidden h-full flex flex-col flex-[2] glassmorphism ">
          <div className=" flex justify-between items-center mb-8 text-[#1f1c2e]">
            <p className="text-2xl font-bold bg-opacity-[0.9] m-0 text-[#1f1c2e]">
              Projects
            </p>
            <p className="text-xl">{getCurrentDate()}</p>
          </div>
          <div className=" flex justify-between items-center pb-8">
            <div className="projects-status flex">
              <div className="item-status">
                <span className="status-number">45</span>
                <span className="status-type">In Progress</span>
              </div>
              <div className="item-status">
                <span className="status-number">24</span>
                <span className="status-type">Upcoming</span>
              </div>
              <div className="item-status">
                <span className="status-number">{projectCount}</span>
                <span className="status-type">Total Projects</span>
              </div>
            </div>

            {/* View buttons */}

            {/* <div className="view-actions">
              <button className="view-btn list-view" title="List View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-list">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
              <button className="view-btn grid-view active" title="Grid View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-grid">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
            </div> */}
          </div>

          <div className=" my-0 mx-[-8px] overflow-y-auto grid grid-cols-3">
            {projects.map((p) => (
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

        <Message />
      </div>
    </div>
  );
}
