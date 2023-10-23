
import MessageBox from './MessageBox'

export default function Message() {
  return (
    <div className=" flex-shrink-0 pb-8 glassmorphism ml-6 flex-1 w-full rounded-[30px] relative overflow-auto transition-[all 300ms cubic-bezier(0.19, 1, 0.56, 1)] ">
          <div className="flex justify-between items-center mx-3 my-4 text-[#1f1c2e]">
            <p className='text-2xl font-bold opacity-[0.9] m-0'>Client Messages</p>
          </div>
          <div className="messages">
            <MessageBox />
            
          </div>
        </div>
  )
}
