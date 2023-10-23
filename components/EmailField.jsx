

const EmailField = () => {
  return (
    <div className='rounded-lg bg-[#403E40]/50 w-96 flex flex-row py-2'>
      <input className='px-2 text-center basis-2/3 bg-transparent h-auto outline-none' type='email' placeholder='Enter Email Address'></input>
      <button className='rounded-md h-8 bg-[#D2DECE] text-[#3A3E39] basis-1/3 mr-2 shadow-lg'>Get Started</button>
    </div>
  )
}

export default EmailField
