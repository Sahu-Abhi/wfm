import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function ProjectCard() {
  return (
    <div className=" w-1/3 p-2 mb-4 ml-4 transition">
      <div className=" bg-[#e9e7fd] rounded-[30px] p-4">
        <div className="project-box-header">
          <span>December 10, 2020</span>
          <div className="more-wrapper">
            <button className="project-btn-more">
                <MoreVertOutlinedIcon />
            </button>
          </div>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">Testing</p>
          <p className="box-content-subheader">Prototyping</p>
        </div>
        <div className="box-progress-wrapper">
          <p className="box-progress-header">Progress</p>
          <div className="box-progress-bar">
            <span className="box-progress w-2/4 bg-[#4f3ff0]"></span>
          </div>
          <p className="box-progress-percentage">50%</p>
        </div>
        <div className=" flex justify-between pt-4 relative ">
          <div className="participants flex items-center">
            <img
              src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80"
              alt="participant"
              className='w-5 h-5 rounded-[50%] overflow-hidden object-cover'
            />
            <img
              src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80"
              alt="participant"
            />
            <button className="w-5 h-5 rounded-[50%] border-none  text-[#4f3ff0] bg-white bg-opacity-[0.6] ml-[6px] flex justify-center items-center p-0 ">
              {/* add Icon */}
              <AddOutlinedIcon className='text-sm' />
            </button>
          </div>
          <div className="bg-white bg-opacity-[0.6] text-xs rounded-[20px] flex-shrink-0 py-[6px] px-4 font-bold text-[#4f3ff0]">2 Days Left</div>
        </div>
      </div>
    </div>
  );
}
