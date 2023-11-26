import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Image from 'next/image';

export default function MessageBox() {
  return (
    <div className="flex justify-start w-full p-4 border-t-[1px] border-[#e9ebf0] hover:bg-[#fafcff] hover:border-[#c3cff4]">
              <Image
              width={37}
              height={37}
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                alt="profile image"
                className='rounded-[50%] object-cover w-10 h-10'
              />
              <div className="pl-4 w-full">
                <div className=" flex justify-between items-center w-full">
                  <div className='text-base font-semibold text-[#1f1c2e] m-0'>Shruti</div>
                  <div className="star-checkbox">
                    <input type="checkbox" id="star-1" />
                    <label htmlFor="star-1">
                    <StarBorderOutlinedIcon />
                    </label>
                  </div>
                </div>
                <p className="text-sm my-2 mx-0 opacity-[0.7] text-[#4a4a4a]">
                  I got your first assignment. It was quite good. We can
                  continue with the next assignment.
                </p>
                <p className="text-sm my-2 mx-0 opacity-[0.7] text-[#4a4a4a] text-right mb-0">Oct, 31</p>
              </div>
            </div>
  )
}
