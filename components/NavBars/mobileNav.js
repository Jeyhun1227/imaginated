
import React, { Fragment } from "react";   
import { Popover, Transition } from '@headlessui/react'   
import { List, X } from 'react-bootstrap-icons';


export default function MobileNav() {

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


  return (
    <Popover className="relative z-10 bg-white shadow-sm md:hidden">
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Imaginated</span>
              <img
                className="w-auto h-8 sm:h-10"
                src="\Imaginated_logo.png"
                alt="Imaginated Logo"
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <List className="w-6 h-6" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
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
          <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
            <div className="px-3 pt-3 pb-3">
              <div className="flex items-center justify-between pb-4 border-b border-very-light-grey">
                <div>
                  <img
                    className="w-auto h-8"
                    src="\Imaginated_logo.png"
                    alt="Imaginated Logo"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <X className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {links.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center p-3 -m-3 no-underline rounded-md hover:bg-gray-50"
                    >
                      <span className="ml-3 text-base font-medium text-dim-grey">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="px-3 py-6 border-0">
              <div>
                <a
                  href="#"
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white no-underline border border-transparent shadow-sm bg-dark-blue hover:bg-indigo-700">
                  Log In/Sign Up
                </a>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pt-4 pl-3 pointer-events-none">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
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
  )
}