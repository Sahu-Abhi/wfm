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
    <div className=" w-xl p-2 mb-4 ml-4 transition">
      <div className=" bg-[#FFFFFF] rounded-[30px] p-4 border-2 drop-shadow-sm">
        <div className="flex justify-between">
          <span className="text-blue-600  mb-2">{deadline.split("T")[0]}</span>
          <div className="text-gray-400">
            <DropdownMenu>
              <DropdownMenuTrigger><MoreVertOutlinedIcon /></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><button onClick={removeProject} className="text-red-600">Delete</button></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="project-box-content-header">
          <p className="font-semibold">{title}</p>
          <p className="box-content-subheader">{description}</p>
        </div>
        <div className="box-progress-wrapper">
          <p className="mt-2">Progress</p>
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
