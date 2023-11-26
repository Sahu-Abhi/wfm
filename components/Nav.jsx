"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";



const Nav = (props) => {

  const {data: session} = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  },[])


  return (
    <nav className=" bg-[#101010] w-full pt-3 pb-2 flex justify-evenly text-lg shadow-2xl border-b-4 border-[#2F2F2F]">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/logo.svg"
          width={80}
          height={30}
          className="object-contain h-auto"
          alt="Wfm logo"
        />
      </Link>
      <ul className=" flex flex-row text-slate-50 gap-8 items-center">
        <li>About</li>
        <li><Link href='#price-section'>Pricing</Link></li>
        <li>Resources</li>
        <li>Contact</li>
      </ul>
      
        {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id,{callbackUrl: 'http://localhost:3000/dashboard'});
                    console.log(session)
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
       
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      
    </nav>
  );
};

export default Nav;
