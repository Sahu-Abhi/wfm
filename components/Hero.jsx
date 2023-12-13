import EmailField from "@components/EmailField";

export default function Hero() {
  return (
    <section className="flex-center flex-col">
      <div className="bg-gradient-to-br from-stone-900 to-slate-900 w-screen h-[70vh] pt-32">
        <div className="flex flex-col gap-6 justify-center items-center text-white ">
          <h1 className="text-7xl text-center font-semibold">
            Unlock Your Full Potential With
            <br className="max-md:hidden" />
            <span className="orange_gradient">WorkFlowMagnet.</span>
          </h1>
          <p className=" desc text-center w-[75vh]">
            With our website you'll have access to a wide range of tools and
            resources designed to help you increse your productivity and achieve
            your goals.
          </p>
          <EmailField />
        </div>
      </div>
    </section>
  )
}
