import { useSession } from "next-auth/react";

export default function SettingsFollowing() {
    
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div className="border border-whisper lg:h-full">
            <div className="p-3">
                <div className="flex flex-col">
                    <h4>Following list</h4>
                    <div className="mt-1">
                        <div className="flow-root">
                            <ul className="pl-0 divide-y divide-whisper">
                                <li className="flex py-3">
                                    <div className="flex-shrink-0 w-8 h-8 overflow-hidden border rounded-full sm:w-10 sm:h-10 border-whisper">
                                        <img src="" className="object-cover object-center w-full h-full"/>
                                    </div>
                                    <div className="flex items-center justify-between w-full ml-4">
                                        <div className="flex flex-col flex-1">
                                            <h5>name name</h5>
                                            <div className="flex items-end justify-between flex-1 text-sm">
                                                <p className="mb-0 text-dim-grey ">A.K.A test</p>
                                            </div>
                                        </div>
                                        <div className="">
                                            <button className="hover:bg-dark-blue hover:text-white items-center justify-center px-4 py-1.5 text-center text-green-vogue cursor-pointer border-2 border-green-vogue">
                                                Unfollow
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="text-left">
                            <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:mr-0">Load more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
