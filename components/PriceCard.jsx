import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export default function PriceCard() {
  return (
    <section className="m-16" id='price-section'>
        <h3 className="flex-center desc mb-2">Pricing</h3>
      <div className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-gradient-to-tr from-gray-600 to-gray-400 bg-clip-border p-8 text-white shadow-md shadow-gray-500/40">
        <div className="relative m-0 mb-8 overflow-hidden rounded-none border-b border-white/10 bg-transparent bg-clip-border pb-8 text-center text-gray-700 shadow-none">
          <p className="block font-sans text-sm font-normal uppercase leading-normal text-white antialiased">
            Free
          </p>
          <h1 className="mt-6 flex justify-center gap-1 font-sans text-7xl font-normal tracking-normal text-white antialiased">
            <span className="mt-2 text-4xl">₹</span>229
            <span className="self-end text-4xl">/mo</span>
          </h1>
        </div>
        <div className="p-0">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckOutlinedIcon />
              </span>
              <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                Personal
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckOutlinedIcon />
              </span>
              <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                3 Projects
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckOutlinedIcon />
              </span>
              <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                Manage
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckOutlinedIcon />
              </span>
              <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                1 year free updates
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckOutlinedIcon />
              </span>
              <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                Life time technical support
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-12 p-0">
          <button
            className="block w-full select-none rounded-lg bg-white py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-gray-500 shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-dark="true">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}
