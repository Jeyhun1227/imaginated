import { useSession } from "next-auth/react";
import { Dot, ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import { Rating} from '@mui/material';
import { Disclosure, Transition } from '@headlessui/react'

export default function SettingsRatings() {
    
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return ( 
        <div className="flex flex-col space-y-6">
            <Disclosure as="div" className="border-1 border-whisper h-96 lg:h-full">
            {({ open }) => (
                <>
                <div className="p-3">
                    <Disclosure.Button as="div" className="flex items-center justify-between w-full">
                        <h4 className="mb-0">Your review</h4>
                        <span className="flex items-center">
                        {open ? (
                            <ChevronUp className="w-3 h-3 ml-2 -mr-1" aria-hidden="true" />
                        ) : (
                            <ChevronDown className="w-3 h-3 ml-2 -mr-1" aria-hidden="true" />
                        )}
                        </span>
                    </Disclosure.Button>
                    <Disclosure.Panel as="div" className="mt-1">
                        <div className="flow-root">
                            <ul className="pl-0 divide-y divide-whisper">
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-1">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">April 18, 2022</p>
                                            <div className="inline-flex items-center justify-center px-2.5 "><Dot className="w-5 h-5 fill-dim-grey"/></div>
                                            <p className="mb-0 font-semibold">Review for Youtube Channel</p>
                                        </div>
                                        <div>
                                        <Rating name="name" value={2.5} precision={0.5} sx={{
                                        color: "yellow",
                                        borderRadius: '10px',
                                        '& .MuiSvgIcon-root': {
                                            fill: '#F8DC81',
                                        },
                                        '& .css-dqr9h-MuiRating-label': {
                                        display: 'block'
                                        }                        
                                        }} readOnly/>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">"An Expert in the Field"</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-1">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">April 18, 2022</p>
                                            <div className="inline-flex items-center justify-center px-2.5 "><Dot className="w-5 h-5 fill-dim-grey"/></div>
                                            <p className="mb-0 font-semibold">Review for Youtube Channel</p>
                                        </div>
                                        <div>
                                        <Rating name="name" value={2.5} precision={0.5} sx={{
                                        color: "yellow",
                                        borderRadius: '10px',
                                        '& .MuiSvgIcon-root': {
                                            fill: '#F8DC81',
                                        },
                                        '& .css-dqr9h-MuiRating-label': {
                                        display: 'block'
                                        }                        
                                        }} readOnly/>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">"An Expert in the Field"</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-1">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">April 18, 2022</p>
                                            <div className="inline-flex items-center justify-center px-2.5 "><Dot className="w-5 h-5 fill-dim-grey"/></div>
                                            <p className="mb-0 font-semibold">Review for Youtube Channel</p>
                                        </div>
                                        <div>
                                        <Rating name="name" value={2.5} precision={0.5} sx={{
                                        color: "yellow",
                                        borderRadius: '10px',
                                        '& .MuiSvgIcon-root': {
                                            fill: '#F8DC81',
                                        },
                                        '& .css-dqr9h-MuiRating-label': {
                                        display: 'block'
                                        }                        
                                        }} readOnly/>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">"An Expert in the Field"</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    <div className="text-left">
                        <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:mr-0">Load more</button>
                    </div>
                    </Disclosure.Panel>
                </div>
                </>)}
            </Disclosure>
            <Disclosure as="div" className="border-1 border-whisper h-96 lg:h-full">
            {({ open }) => (
                <>
                <div className="p-3">
                    <Disclosure.Button as="div" className="flex items-center justify-between w-full">
                        <h4 className="mb-0">User ratings for you</h4>
                        <span className="flex items-center">
                        {open ? (
                            <ChevronUp className="w-3 h-3 ml-2 -mr-1" aria-hidden="true" />
                        ) : (
                            <ChevronDown className="w-3 h-3 ml-2 -mr-1" aria-hidden="true" />
                        )}
                        </span>
                    </Disclosure.Button>
                    <Disclosure.Panel as="div" className="mt-1">
                        <div className="flow-root">
                            <ul className="pl-0 divide-y divide-whisper">
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-1">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">April 18, 2022</p>
                                            <div className="inline-flex items-center justify-center px-2.5 "><Dot className="w-5 h-5 fill-dim-grey"/></div>
                                            <p className="mb-0 font-semibold">Review for Youtube Channel</p>
                                        </div>
                                        <div>
                                        <Rating name="name" value={2.5} precision={0.5} sx={{
                                        color: "yellow",
                                        borderRadius: '10px',
                                        '& .MuiSvgIcon-root': {
                                            fill: '#F8DC81',
                                        },
                                        '& .css-dqr9h-MuiRating-label': {
                                        display: 'block'
                                        }                        
                                        }} readOnly/>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">"An Expert in the Field"</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-1">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">April 18, 2022</p>
                                            <div className="inline-flex items-center justify-center px-2.5 "><Dot className="w-5 h-5 fill-dim-grey"/></div>
                                            <p className="mb-0 font-semibold">Review for Youtube Channel</p>
                                        </div>
                                        <div>
                                        <Rating name="name" value={2.5} precision={0.5} sx={{
                                        color: "yellow",
                                        borderRadius: '10px',
                                        '& .MuiSvgIcon-root': {
                                            fill: '#F8DC81',
                                        },
                                        '& .css-dqr9h-MuiRating-label': {
                                        display: 'block'
                                        }                        
                                        }} readOnly/>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">"An Expert in the Field"</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-1">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">April 18, 2022</p>
                                            <div className="inline-flex items-center justify-center px-2.5 "><Dot className="w-5 h-5 fill-dim-grey"/></div>
                                            <p className="mb-0 font-semibold">Review for Youtube Channel</p>
                                        </div>
                                        <div>
                                        <Rating name="name" value={2.5} precision={0.5} sx={{
                                        color: "yellow",
                                        borderRadius: '10px',
                                        '& .MuiSvgIcon-root': {
                                            fill: '#F8DC81',
                                        },
                                        '& .css-dqr9h-MuiRating-label': {
                                        display: 'block'
                                        }                        
                                        }} readOnly/>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">"An Expert in the Field"</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    <div className="text-left">
                        <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:mr-0">Load more</button>
                    </div>
                    </Disclosure.Panel>
                </div>
                </>)}
            </Disclosure>
        </div> 
    );
}
