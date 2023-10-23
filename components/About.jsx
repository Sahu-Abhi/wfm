import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";

export default function About(){
  return (
    <section className="w-full flex-center flex-col">
      <div className="bg-[#EDF1F4] h-[30vh] px-52 py-16">
        <div className="flex flex-row gap-16 justify-center items-center ">
          <h2 className="text-4xl font-medium text-start w-[650px]">
            WorkFlowMagnet is designed to enhance your daily productivity.
          </h2>
          <div className="flex flex-col items-start gap-4">
            <p className="text-xl font-light">
              At WorkFlowMagnet, we are dedicated to revolutionizing the way you
              manage projects. Our mission is to empower individuals and teams
              to achieve their goals efficiently, collaboratively, and with
              unparalleled ease.
            </p>
            <button className="rounded-xl bg-black text-white px-4 py-1 shadow-lg">
              <PlayCircleFilledOutlinedIcon className="mr-2 shadow-lg" />
              How it works?
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


