
import React, { Fragment } from "react";   
import { Popover, Transition } from '@headlessui/react'   
import { List, X } from 'react-bootstrap-icons';
import { signIn, signOut, useSession } from "next-auth/react";
import { Bell, Star, Gear, PlayBtn } from 'react-bootstrap-icons';

export default function MobileNav() {

  const {data: session} = useSession()

  const links = [
    {
      name: 'About',
      href: '/about'
    },
    {
      name: 'Directory',
      href: '/directory'
    },
    { 
      name: 'Market', 
      href: '/market'
    },
    {
      name: 'Claim Listing',
      href: '#'
    }
  ]
  
  const userMenu = [
    {
      title: 'Update',
      href: '/update',
      svg: <Bell/>
    },
    {
      title: 'Following',
      href: '/following',
      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
        <path id="Layer" fillRule="evenodd" className="" d="m3.9 7.1c-0.6-0.5-0.9-1.3-0.9-2.1 0-0.8 0.3-1.6 0.9-2.1 0.5-0.6 1.3-0.9 2.1-0.9 0.8 0 1.6 0.3 2.1 0.9 0.6 0.5 0.9 1.3 0.9 2.1 0 0.8-0.3 1.6-0.9 2.1-0.5 0.6-1.3 0.9-2.1 0.9-0.8 0-1.6-0.3-2.1-0.9zm3.5-3.5c-0.4-0.4-0.9-0.6-1.4-0.6-0.5 0-1 0.2-1.4 0.6-0.4 0.4-0.6 0.9-0.6 1.4 0 0.5 0.2 1 0.6 1.4 0.4 0.4 0.9 0.6 1.4 0.6 0.5 0 1-0.2 1.4-0.6 0.4-0.4 0.6-0.9 0.6-1.4 0-0.5-0.2-1-0.6-1.4zm4.6 9.4c0 1-1 1-1 1h-10c0 0-1 0-1-1 0-1 1-4 6-4 5 0 6 3 6 4zm-1 0c0-0.2-0.2-1-0.8-1.7-0.7-0.6-1.9-1.3-4.2-1.3-2.3 0-3.5 0.7-4.2 1.3-0.6 0.7-0.8 1.5-0.8 1.7z"/>
        <path id="Layer" fillRule="evenodd" className="" d="m13.5 4.9c1.4-1.4 4.9 1.1 0 4.3-4.9-3.2-1.4-5.7 0-4.3z"/>
      </svg>
    },
    {
      title: 'Rating',
      href: '/rating',
      svg: <Star className='fill-black'/>
    },
    {
      title: 'Setting',
      href: '/setting',
      svg: <Gear/>
    },
  ]

  return (
    <div>
      <div className="relative z-10 bg-white shadow-sm md:hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/">
                <span className="sr-only">Imaginated</span>
                <img
                  className="w-auto h-8 sm:h-10"
                  src="\Imaginated_logo.png"
                  alt="Imaginated Logo"
                />
              </a>
            </div>
            <div className="inline-flex">
            <Popover className="flex items-center">
            <div className="-py-2 -pr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white">
                <span className="sr-only">Open menu</span>
                <Bell className="w-4 h-4" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden">
            <div className="bg-white divide-y-2 shadow-lg divide-gray-50">
              <div className="px-3 pt-3 pb-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-gainsboro">
                  <div>
                    <span className="text-lg">
                      Notification
                    </span>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white">
                      <span className="sr-only">Close menu</span>
                      <X className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                {!(session) ? <>
                  <div className="pt-2.5">
                    <div>
                      <div className='py-2 hover:bg-white-smoke'>
                        <a href="#" className='flex items-center px-3.5 no-underline'>
                          <div className='pr-2 text-black no-underline'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                          </div>
                          <span className='block text-xs font-semibold text-black no-underline'> 
                            SANJ replied to your comment
                          </span>
                        </a>
                        <span className='block pt-2 text-xs text-black no-underline pl-9'>
                          5:00 pm
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className='py-2 hover:bg-white-smoke'>
                        <a href="#" className='flex items-center px-3.5 no-underline'>
                          <div className='pr-2 text-black no-underline'>
                            <PlayBtn/>
                          </div>
                          <span className='block text-xs font-semibold text-black no-underline'>
                            Jhon updated their content, go check it out now!
                          </span>
                        </a>
                        <span className='block pt-2 text-xs text-black no-underline pl-9'>
                          Yesterday
                        </span>
                      </div>
                    </div>
                  </div>
                  </> : null}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
        </Popover>
            <Popover className="flex justify-end">
            <div className="flex justify-end -my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white">
                <span className="sr-only">Open menu</span>
                <List className="w-6 h-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden">
            <div className="bg-white divide-y-2 shadow-lg divide-gray-50">
              <div className="px-3 pt-3 pb-3">
                <div className="flex items-center justify-between pb-4 border-b border-gainsboro">
                  <div>
                    <a href="/">
                      <span className="sr-only">Imaginated</span>
                      <img
                        className="w-auto h-8 sm:h-10"
                        src="\Imaginated_logo.png"
                        alt="Imaginated Logo"
                      />
                    </a>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white">
                      <span className="sr-only">Close menu</span>
                      <X className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                {!(session) ? <>
                  <div className="border-b border-gainsboro">
                        <a  href="#" className='flex items-center mx-3.5 no-underline '>
                          <div className='pr-2 text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
                              <path fillRule="evenodd" className='fill-black' d="m49.5 4.1c5.7-0.1 9.7 0.5 14 1.9 3.3 1.2 7.8 3.1 10 4.4 2.2 1.3 6.2 4.5 8.8 7.2 2.7 2.7 6 6.9 7.4 9.4 1.5 2.5 3.5 7.2 4.5 10.5 1 3.3 1.8 8.7 1.8 12 0 3.3-0.7 8.7-1.6 12-0.9 3.3-2.8 8.3-4.4 11-1.6 2.7-5 7.2-7.7 9.9-2.6 2.7-6.6 5.9-8.8 7.2-2.2 1.3-6.7 3.2-10 4.4-4 1.4-8.5 2-13.5 2-4.5 0-9.7-0.8-13-1.9-3-1-7.5-3-10-4.4-2.5-1.4-6.7-4.7-9.3-7.4-2.7-2.6-6-6.8-7.4-9.3-1.5-2.5-3.5-7.2-4.5-10.5-1-3.3-1.8-8.7-1.8-12 0-3.3 0.7-8.7 1.6-12 0.8-3.3 2.7-8.2 4.2-10.9 1.5-2.6 5-7 7.7-9.7 2.8-2.7 6.6-5.9 8.5-7.1 1.9-1.2 6.2-3.2 9.5-4.4 4.2-1.5 8.4-2.2 14-2.3zm-11.5 57.6c1.1 1.8 3.6 4 5.5 4.8 1.9 0.8 4.9 1.5 6.5 1.5 1.6 0 4.6-0.7 6.5-1.5 1.9-0.8 4.4-3 5.5-4.8 1.7-2.8 2-5 2-16.4 0-12.6-0.1-13.3-2-13.3-1.9 0-2 0.7-2 11.8 0 9.1-0.4 12.5-1.8 15.2-1.1 2.2-2.8 3.8-4.7 4.4-1.8 0.5-4.4 0.5-6.5 0-2.5-0.7-4-1.9-5.2-4.4-1.4-2.7-1.8-6.1-1.8-15.3 0-11-0.1-11.7-2-11.7-1.9 0-2 0.7-2 13.3 0 11.4 0.3 13.6 2 16.4z"/>
                            </svg>
                          </div>
                          <span className='block py-3 text-base font-semibold text-black no-underline'>
                            Name LastName
                          </span>
                        </a>
                  </div>
                  <div className="border-b border-gainsboro">
                  {userMenu.map((menu) => (
                    <div className=""> 
                        <a key={menu.title} href={menu.href} className=' no-underline px-3.5 flex items-center'>
                          <div className='pr-2 text-black'>
                            {menu.svg}
                          </div>
                          <span className='block py-3 text-sm text-black no-underline'>
                            {menu.title}
                          </span>
                        </a>
                    </div>
                    ))}
                  </div>
                  </> : null}
                <div className="pt-3">
                  <nav className="grid gap-y-4">
                    {links.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center p-3 -m-3 no-underline hover:bg-gray-50"
                      >
                        <span className="ml-3 text-sm font-medium text-dim-grey">{item.name}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="px-3 py-6 border-0">
                <div>
                {(session) ? <>
                  <a
                    href="#"
                    className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white no-underline border border-transparent shadow-sm bg-dark-blue hover:bg-indigo-700">
                    Log In/Sign Up
                  </a>
                </> : <> 
                  <a
                    href="#"
                    className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white no-underline border border-transparent shadow-sm bg-dark-blue hover:bg-indigo-700">
                    Logout
                  </a>
                </>}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pt-4 pl-3 pointer-events-none">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <div className="flex items-center justify-between w-full pt-4">
                      <input type="text" id="simple-search" data-dropdown-toggle="dropdown" className="inline-flex items-center justify-start order-1 w-8/12 py-2 text-sm text-gray-900 border text-ellipsis border-very-light-grey pl-11" placeholder="Search for a creator or category" required/>
                      <button type="submit" className="inline-flex items-center justify-end flex-shrink-0 order-2 px-4 py-2 ml-4 overflow-hidden text-sm border border-black text-dark-blue hover:text-indigo-500">
                        <span className="text-sm truncate text-dark-blue hover:text-indigo-500">Search</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
        </Popover>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}