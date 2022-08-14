import {useState} from "react";
import { useSession } from "next-auth/react";
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

export default function SettingsSettings() {
    
    const [emailPasswordShown, setEmailPasswordShown] = useState(false);
    const [newPasswordShown, setNewPasswordShown] = useState(false);
    const [renewPasswordShown, setRenewPasswordShown] = useState(false);

    const toggleEmailPassword = () => {
        setEmailPasswordShown(!emailPasswordShown);
    };
    const toggleNewPassword = () => {
        setNewPasswordShown(!newPasswordShown);
    };
    const toggleRenewPassword = () => {
        setRenewPasswordShown(!renewPasswordShown);
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div className="border border-whisper lg:h-full">
            <div className="p-3">
                <div className="flex flex-col">
                    <h4 className="mb-0">Settings</h4>
                    <div className="mt-1">
                        <div className="flow-root">
                            <ul className="pl-0 divide-y divide-whisper">
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-2">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">Resend verification email</p>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">Your account is not verified. Please verify your email.</p>
                                        </div>
                                        <div className="pt-2 text-left">
                                            <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue sm:mr-0">
                                                Request email verification
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-2">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">Unsubscribe from promotional emails</p>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">Oupt out from all promotional emails</p>
                                        </div>
                                        <div className="pt-2 text-left">
                                            <button className="px-3 py-2 mr-3 text-center truncate bg-white border-1 text-dark-blue border-dark-blue hover:bg-dark-blue sm:mr-0">
                                                Unsubscribe
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-4">
                                        <div className="flex flex-row flex-wrap">
                                            <label htmlFor="update email" className="mb-0 font-semibold">Update your email</label>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <input type="email" name="email" id="email" className="focus:outline-none bg-white border border-whisper text-dark-blue text-sm block w-full p-2.5" placeholder="Enter your email"/>
                                        </div>
                                        <div className="relative w-full">
                                            <input type={emailPasswordShown ? "text" : "password"} name="password" id="password" className="bg-white border focus:outline-none border-whisper text-dark-blue text-sm block w-full p-2.5" placeholder="Enter your password"/>
                                            <button onClick={toggleEmailPassword} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                                {emailPasswordShown ? <EyeSlashFill/> : <EyeFill/> }
                                            </button>
                                        </div>
                                        <div className="pt-2 text-left">
                                            <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue sm:mr-0">
                                                Change email
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-4">
                                        <div className="flex flex-row flex-wrap">
                                            <label htmlFor="Change password" className="mb-0 font-semibold">Change your password</label>
                                        </div>
                                        <div className="relative w-full">
                                            <input type={newPasswordShown ? "text" : "password"} name="email" id="email" className="focus:outline-none bg-white border border-whisper text-dark-blue text-sm block w-full p-2.5" placeholder="Enter your new password"/>
                                            <button onClick={toggleNewPassword} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                                {newPasswordShown ? <EyeSlashFill/> : <EyeFill/> }
                                            </button>
                                        </div>
                                        <div className="relative w-full">
                                            <input type={renewPasswordShown ? "text" : "password"} name="password" id="password" className="bg-white border focus:outline-none border-whisper text-dark-blue text-sm block w-full p-2.5" placeholder="Re-enter your new password"/>
                                            <button onClick={toggleRenewPassword} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                                {renewPasswordShown ? <EyeSlashFill/> : <EyeFill/> }
                                            </button>
                                        </div>
                                        <div className="pt-2 text-left">
                                            <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue sm:mr-0">
                                                Change password
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
