"use client"

import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function ProjectCard({
  id,
  title,
  description,
  progress,
  users,
  deadline
}) {

  
  const deadlineDate = deadline.split("T")[0];
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(deadlineDate);
  const secondDate = new Date();

  let daysLeft = Math.floor((firstDate - secondDate) / oneDay);
  if(daysLeft < 0){
    daysLeft = 0;
  }

  const router = useRouter();
  const removeProject = async() => {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      const res = await fetch(`/api/projects?id=${id}`,{
        method: "DELETE",
      });

      if (res.ok){
        router.refresh();
      }
    }
  }

  return (
    <Link href={`dashboard/project/${id}`}>
    <div className=" max-w-xl p-2 mb-4 ml-4 transition">
      <div className=" bg-[#e9e7fd] rounded-[30px] p-4">
        <div className="project-box-header">
          <span>{deadline.split("T")[0]}</span>
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger><MoreVertOutlinedIcon /></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><Link href={`dashboard/project/${id}`}>Open</Link></DropdownMenuItem>
                <DropdownMenuItem><button onClick={removeProject}>Delete</button></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{title}</p>
          <p className="box-content-subheader">{description}</p>
        </div>
        <div className="box-progress-wrapper">
          <p className="box-progress-header">Progress</p>
          <Progress value={progress} className="h-1 my-2" />
          <p className="box-progress-percentage">{progress}%</p>
        </div>
        <div className=" flex justify-between pt-4 relative ">
          <div className="participants flex items-center">
            <Image
              width={5}
              height={5}
              src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80"
              alt="participant"
              className="w-5 h-5 rounded-[50%] overflow-hidden object-cover"
            />
            <Image
              width={5}
              height={5}
              src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80"
              alt="participant"
            />
            <button className="w-5 h-5 rounded-[50%] border-none  text-[#4f3ff0] bg-white bg-opacity-[0.6] ml-[6px] flex justify-center items-center p-0 ">
              {/* add Icon */}
              <AddOutlinedIcon className="text-sm" />
            </button>
          </div>
          <div className="bg-white bg-opacity-[0.6] text-xs rounded-[20px] flex-shrink-0 py-[6px] px-4 font-bold text-[#4f3ff0]">
            {daysLeft} Days Left
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}
