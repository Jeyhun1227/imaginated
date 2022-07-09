import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import HeroNoBtn from "../../Hero/HeroNoBtn";
import SettingsFollowing from "./SettingsFollowing"
import SettingsRatings from "./SettingsRatings";
import SettingsSettings from "./SettingsSettings";
import { Star, Gear, BoxArrowInRight, ChevronDown, CheckIcon } from 'react-bootstrap-icons';
import { Listbox, Transition } from '@headlessui/react'

export default function SettingsPageMobile() {

    const menuTitles = [
        {   
            id: 1, 
            title: 'Following', 
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                    <path id="Layer" fillRule="evenodd" className="" d="m3.9 7.1c-0.6-0.5-0.9-1.3-0.9-2.1 0-0.8 0.3-1.6 0.9-2.1 0.5-0.6 1.3-0.9 2.1-0.9 0.8 0 1.6 0.3 2.1 0.9 0.6 0.5 0.9 1.3 0.9 2.1 0 0.8-0.3 1.6-0.9 2.1-0.5 0.6-1.3 0.9-2.1 0.9-0.8 0-1.6-0.3-2.1-0.9zm3.5-3.5c-0.4-0.4-0.9-0.6-1.4-0.6-0.5 0-1 0.2-1.4 0.6-0.4 0.4-0.6 0.9-0.6 1.4 0 0.5 0.2 1 0.6 1.4 0.4 0.4 0.9 0.6 1.4 0.6 0.5 0 1-0.2 1.4-0.6 0.4-0.4 0.6-0.9 0.6-1.4 0-0.5-0.2-1-0.6-1.4zm4.6 9.4c0 1-1 1-1 1h-10c0 0-1 0-1-1 0-1 1-4 6-4 5 0 6 3 6 4zm-1 0c0-0.2-0.2-1-0.8-1.7-0.7-0.6-1.9-1.3-4.2-1.3-2.3 0-3.5 0.7-4.2 1.3-0.6 0.7-0.8 1.5-0.8 1.7z"/>
                    <path id="Layer" fillRule="evenodd" className="" d="m13.5 4.9c1.4-1.4 4.9 1.1 0 4.3-4.9-3.2-1.4-5.7 0-4.3z"/>
                </svg> , 
            component:<SettingsFollowing/>
        },
        {   
            id: 2, 
            title: 'Ratings', 
            icon: <Star className="hover:fill-black"/>, 
            component:<SettingsRatings/>
        },
        { 
            id: 3,
            title: 'Settings', 
            icon: <Gear/>, 
            component:<SettingsSettings/>},
    ]
    
    const [selected, setSelected] = useState(menuTitles[0])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
  return (
    <div className="">
        <section className="block px-4 sm:hidden sm:px-0">
            <div className="pt-6 mx-auto max-w-7xl">
                <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border cursor-default border-very-light-grey focus:outline-none focus:ring-1 focus:ring-denim focus:border-denim sm:text-sm">
                        <span className="flex items-center">
                            <span>{selected.icon}</span>
                            <span className="block ml-3 text-black truncate">{selected.title}</span>
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 ml-3 pointer-events-none">
                            <ChevronDown className="w-3 h-3 text-black" aria-hidden="true" />
                        </span>
                        </Listbox.Button>

                        <Transition
                        show={open}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <Listbox.Options className="absolute z-10 w-full pl-0 mt-1 overflow-auto text-base bg-white max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {menuTitles.map((titles) => (
                            <Listbox.Option
                                key={titles.id}
                                className={({ active }) =>
                                classNames(
                                    active ?  'bg-whisper' : 'text-black',
                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                )
                                }
                                value={titles}
                            >
                                {({ selected, active }) => (
                                <>
                                    <div className="flex items-center">
                                        <span>
                                            {titles.icon}
                                        </span>
                                        <span
                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'text-black ml-3 block truncate')}
                                        >
                                            {titles.title}
                                        </span>
                                    </div>
                                </>
                                )}
                            </Listbox.Option>
                            ))}
                        </Listbox.Options>
                        </Transition>
                    </div>
                    </>
                )}
                </Listbox>
                <div className="mt-8">
                {selected.component}
                </div>
            </div>
        </section>
    </div>
  );
  
}

// return (
//     <div className="">
//         <HeroNoBtn setLargeTextTop={"User Profile"} setLargeTextBottom={" "} setSmallText={" "}/>
//         <section className="px-4 sm:px-0">
//             <div className="pt-6 mx-auto max-w-7xl">
//                 <Tab.Group as="div" defaultIndex={0} vertical className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
//                     <div className="flex flex-col">
//                         <h3 className="pb-4 mb-4 font-semibold border-b sm:px-0 border-whisper">Menu</h3>
//                         <Tab.List as="ul" className="pl-0 sm:justify-start lg:flex lg:space-y-3 sm:grid sm:grid-cols-4 lg:flex-col">
//                             <Tab as="li" className={({ selected }) =>
//                                         classNames(
//                                         selected ? 'bg-dark-blue text-white fill-white' : 'bg-white text-black',
//                                         'flex sm:mr-auto lg:mr-0 items-center py-1 pl-3 cursor-pointer space-x-3 hover:bg-dark-blue hover:text-white'
//                                         )
//                             }>
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
//                                     <path id="Layer" fillRule="evenodd" className="" d="m3.9 7.1c-0.6-0.5-0.9-1.3-0.9-2.1 0-0.8 0.3-1.6 0.9-2.1 0.5-0.6 1.3-0.9 2.1-0.9 0.8 0 1.6 0.3 2.1 0.9 0.6 0.5 0.9 1.3 0.9 2.1 0 0.8-0.3 1.6-0.9 2.1-0.5 0.6-1.3 0.9-2.1 0.9-0.8 0-1.6-0.3-2.1-0.9zm3.5-3.5c-0.4-0.4-0.9-0.6-1.4-0.6-0.5 0-1 0.2-1.4 0.6-0.4 0.4-0.6 0.9-0.6 1.4 0 0.5 0.2 1 0.6 1.4 0.4 0.4 0.9 0.6 1.4 0.6 0.5 0 1-0.2 1.4-0.6 0.4-0.4 0.6-0.9 0.6-1.4 0-0.5-0.2-1-0.6-1.4zm4.6 9.4c0 1-1 1-1 1h-10c0 0-1 0-1-1 0-1 1-4 6-4 5 0 6 3 6 4zm-1 0c0-0.2-0.2-1-0.8-1.7-0.7-0.6-1.9-1.3-4.2-1.3-2.3 0-3.5 0.7-4.2 1.3-0.6 0.7-0.8 1.5-0.8 1.7z"/>
//                                     <path id="Layer" fillRule="evenodd" className="" d="m13.5 4.9c1.4-1.4 4.9 1.1 0 4.3-4.9-3.2-1.4-5.7 0-4.3z"/>
//                                 </svg>
//                                 <p className="mb-0.5 text-base font-medium">Following</p>
//                             </Tab>
//                             <Tab as="li" className={({ selected }) =>
//                                         classNames(
//                                         selected ? 'bg-dark-blue text-white' : 'bg-white text-black',
//                                         'flex sm:mr-auto lg:mr-0 items-center py-1 pl-3 cursor-pointer space-x-3 hover:bg-dark-blue hover:text-white'
//                                         )
//                             }>
//                                 <Star className='fill-black'/>
//                                 <p className="mb-0.5 text-base font-medium">Rating</p>
//                             </Tab>
//                             <Tab as="li" className={({ selected }) =>
//                                         classNames(
//                                         selected ? 'bg-dark-blue text-white' : 'bg-white text-black',
//                                         'flex sm:mr-auto lg:mr-0 items-center py-1 pl-3 cursor-pointer space-x-3 hover:bg-dark-blue hover:text-white'
//                                         )
//                             }>
//                                 <Gear/>
//                                 <p className="mb-0.5 text-base font-medium">Settings</p>
//                             </Tab>
//                             <li onClick={signOut} className="flex items-center py-1 pl-3 space-x-3 cursor-pointer hover:bg-dark-blue hover:text-white" >
//                                 <BoxArrowInRight/>
//                                 <p className="mb-0.5 sm:mr-auto lg:mr-0 text-base font-medium">Log out</p>
//                             </li>
//                         </Tab.List>
//                     </div>
//                     <Tab.Panels as="div" className="lg:col-span-3">
//                             <Tab.Panel as="div">
//                                 <SettingsFollowing/>
//                             </Tab.Panel>
//                             <Tab.Panel as="div" className="p-3">
//                                 <SettingsRatings/>
//                             </Tab.Panel>
//                             <Tab.Panel as="div" className="p-3">
//                                 <SettingsSettings/>
//                             </Tab.Panel>
//                         </Tab.Panels>
//                 </Tab.Group>
//             </div>
//         </section>
//     </div>
//   );
  
// }

