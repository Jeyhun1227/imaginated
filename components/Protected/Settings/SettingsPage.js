import { signIn, signOut, useSession } from "next-auth/react";
import HeroNoBtn from "../../Hero/HeroNoBtn";
import SettingsFollowing from "./SettingsFollowing"
import SettingsRatings from "./SettingsRatings";
import SettingsSettings from "./SettingsSettings";
import { Star, Gear, BoxArrowInRight } from 'react-bootstrap-icons';
import { Tab } from '@headlessui/react'

export default function SettingsPage() {
    
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
  return (
    <div className="">
        <HeroNoBtn setLargeTextTop={"User Profile"} setLargeTextBottom={" "} setSmallText={" "}/>
        <section className="px-4 sm:px-0">
            <div className="pt-6 mx-auto max-w-7xl">
                <Tab.Group as="div" defaultIndex={0} vertical className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                    <div className="flex-col">
                        <h3 className="pb-4 mb-4 font-semibold border-b sm:px-0 border-whisper">Menu</h3>
                        <Tab.List as="ul" className="flex-col pl-0 space-y-3">
                            <Tab as="li" className={({ selected }) =>
                                        classNames(
                                        selected ? 'bg-dark-blue text-white fill-white' : 'bg-white text-black',
                                        'flex items-center py-1 pl-3 cursor-pointer space-x-3 hover:bg-dark-blue hover:text-white'
                                        )
                            }>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                                    <path id="Layer" fillRule="evenodd" className="" d="m3.9 7.1c-0.6-0.5-0.9-1.3-0.9-2.1 0-0.8 0.3-1.6 0.9-2.1 0.5-0.6 1.3-0.9 2.1-0.9 0.8 0 1.6 0.3 2.1 0.9 0.6 0.5 0.9 1.3 0.9 2.1 0 0.8-0.3 1.6-0.9 2.1-0.5 0.6-1.3 0.9-2.1 0.9-0.8 0-1.6-0.3-2.1-0.9zm3.5-3.5c-0.4-0.4-0.9-0.6-1.4-0.6-0.5 0-1 0.2-1.4 0.6-0.4 0.4-0.6 0.9-0.6 1.4 0 0.5 0.2 1 0.6 1.4 0.4 0.4 0.9 0.6 1.4 0.6 0.5 0 1-0.2 1.4-0.6 0.4-0.4 0.6-0.9 0.6-1.4 0-0.5-0.2-1-0.6-1.4zm4.6 9.4c0 1-1 1-1 1h-10c0 0-1 0-1-1 0-1 1-4 6-4 5 0 6 3 6 4zm-1 0c0-0.2-0.2-1-0.8-1.7-0.7-0.6-1.9-1.3-4.2-1.3-2.3 0-3.5 0.7-4.2 1.3-0.6 0.7-0.8 1.5-0.8 1.7z"/>
                                    <path id="Layer" fillRule="evenodd" className="" d="m13.5 4.9c1.4-1.4 4.9 1.1 0 4.3-4.9-3.2-1.4-5.7 0-4.3z"/>
                                </svg>
                                <p className="mb-0.5 text-base font-medium">Following</p>
                            </Tab>
                            <Tab as="li" className={({ selected }) =>
                                        classNames(
                                        selected ? 'bg-dark-blue text-white' : 'bg-white text-black',
                                        'flex items-center py-1 pl-3 cursor-pointer space-x-3 hover:bg-dark-blue hover:text-white'
                                        )
                            }>
                                <Star className='fill-black'/>
                                <p className="mb-0.5 text-base font-medium">Rating</p>
                            </Tab>
                            <Tab as="li" className={({ selected }) =>
                                        classNames(
                                        selected ? 'bg-dark-blue text-white' : 'bg-white text-black',
                                        'flex items-center py-1 pl-3 cursor-pointer space-x-3 hover:bg-dark-blue hover:text-white'
                                        )
                            }>
                                <Gear/>
                                <p className="mb-0.5 text-base font-medium">Settings</p>
                            </Tab>
                            <li className="flex items-center py-1 pl-3 space-x-3 cursor-pointer hover:bg-dark-blue hover:text-white" >
                                <BoxArrowInRight/>
                                <p className="mb-0.5 text-base font-medium">Log out</p>
                            </li>
                        </Tab.List>
                    </div>
                    <Tab.Panels as="div" className="lg:col-span-3">
                            <Tab.Panel as="div">
                                <SettingsFollowing/>
                            </Tab.Panel>
                            <Tab.Panel as="div" className="p-3">
                                <SettingsRatings/>
                            </Tab.Panel>
                            <Tab.Panel as="div" className="p-3">
                                <SettingsSettings/>
                            </Tab.Panel>
                        </Tab.Panels>
                </Tab.Group>
            </div>
        </section>
    </div>
  );
  
}
