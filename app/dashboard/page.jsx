import Message from "@components/Message";
import ProjectCard from "@components/ProjectCard";
import Image from "next/image";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export default function Dashboard() {

    function getCurrentDate() {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate = `${day}-${month}-${year}`;
        return currentDate;
    }

  return (
    <div className=" w-full h-full flex flex-col bg-transparent transition ">
      <div className=" flex justify-between items-center py-4 px-6 w-full relative">
        <div className=" flex items-center grow">
        <Image
         header-left src="/assets/logo.svg"
          width={80}
          height={30}
          className="object-contain"
          alt=""
        />
          <p className="text-[#1f1c2e] m-0 text-xl font-bold my-0 mx-[32px]">WorkFlowMagnet</p>
          
        </div>
        
        <div className="app-header-right flex items-center">

          <button className="bg-transparent border-none p-0 text-[#1f1c2e] ml-3 flex justify-center items-center" title="Switch Theme">
          <DarkModeOutlinedIcon className="text-3xl" />
          </button>

          <button title="Add New Project" className='ml-3'>
          <AddCircleRoundedIcon className="text-3xl" />
          </button>

          <button className=" ml-3">
          <NotificationsNoneOutlinedIcon className="text-3xl" />
          </button>

          <button className="profile-btn p-0 border-0 bg-transparent flex items-center pl-3 border-l-2 border-solid border-[#ddd] ml-3">
            <img className="w-8 h-8 rounded-[50%] mr-1" src="https://assets.codepen.io/3306515/IMG_2025.jpg" />
            <span className="text-[#1f1c2e] text-base font-bold">Aybüke C.</span>
          </button>

        </div>

        
      </div>
      <div className="flex h-full overflow-hidden pt-4 pr-6 pb-6 pl-0">
        <div className="py-10 px-4 flex flex-col items-center">
          <a href="" className="text-[#1f1c2e] my-4 mx-0 transition rounded-[50%] flex-shrink-0 w-10 h-10 flex justify-center items-center hover:bg-[#c3cff4] hover:text-[#fff] active:bg-[#1f1c2e] active:text-[#fff]">
            <HomeOutlinedIcon />
          </a>
          
        </div>
        <div className="rounded-[32px] pt-8 pr-8 pb-0 pl-8 overflow-hidden h-full flex flex-col flex-[2] glassmorphism ">
          <div className=" flex justify-between items-center mb-8 text-[#1f1c2e]">
            <p className="text-2xl font-bold bg-opacity-[0.9] m-0 text-[#1f1c2e]">Projects</p>
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
                <span className="status-number">62</span>
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

          <div className="project-boxes my-0 mx-[-8px] overflow-y-auto">
            <ProjectCard />
          </div>

        </div>
        <Message />
      </div>
    </div>
  );
}
