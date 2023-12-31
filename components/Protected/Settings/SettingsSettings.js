import {useState, useRef} from "react";
import { useSession, signOut } from "next-auth/react";
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function SettingsSettings(props) {
    
    const [emailPasswordShown, setEmailPasswordShown] = useState(false);
    const [newPasswordShown, setNewPasswordShown] = useState(false);
    const [renewPasswordShown, setRenewPasswordShown] = useState(false);
    const [emailSent, setEmailSent] = useState('');
    const [newEmail, setNewEmail] = useState(null);
    const [newEmailCurrentPassword, setNewEmailCurrentPassword] = useState(null);
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [CurrentPassword, setCurrentPassword] = useState(null);
    const [ErrorPassword, setErrorPassword] = useState(null);
    const [ErrorEmail, setErrorEmail] = useState(null);
    const [ChangePasswordFunc, setChangePasswordFunc] = useState(false);
    const [ChangeEmailFunc, setChangeEmailFunc] = useState(false);
    const [formData, setFormData] = useState();
    const [ImageChange, setImageChange] = useState()
    const [ImageChangeBool, setImageChangeBool] = useState(false)


    const ChangePassword = async () => {
        if(ChangePasswordFunc) return setErrorPassword("Password already changed");
        if(newPassword1 !== newPassword2) return setErrorPassword("Your new Password doesn't match");
        if(CurrentPassword === newPassword1) return setErrorPassword("New Password cannot be the same as the old password");
        if(newPassword1.replace(/\s/g, '').length <= 6) return setErrorPassword("Your Password isn't long enough");
        setChangePasswordFunc(true)

        let returned_pass = await axios.post(`${window.location.origin}/api/User/EditUser/`, {password: CurrentPassword, passwordnew: newPassword1})
        // console.log(returned_pass)
        if(returned_pass.data.error){ 
            setChangePasswordFunc(false)

            return setErrorPassword(returned_pass.data.error);
        }

        setErrorPassword("Password Changed")
        const cookies = new Cookies();
        cookies.remove('user_id', { path: '/' });
        signOut()
    }

    const ChangeEmail = async () => {
        if(ChangeEmailFunc) return setErrorEmail("Email already changed");
        setChangeEmailFunc(true);
        let returned_email = await axios.post(`${window.location.origin}/api/User/EditUser/`, {email: newEmail, password: newEmailCurrentPassword})
        if(returned_email.data.error){ 
            setChangeEmailFunc(false)

            return setErrorEmail(returned_email.data.error);
        }
        setErrorEmail('Email Changed');
        const cookies = new Cookies();
        cookies.remove('user_id', { path: '/' });
        signOut()
    }

    const toggleEmailPassword = () => {
        setEmailPasswordShown(!emailPasswordShown);
    };
    const toggleNewPassword = () => {
        setNewPasswordShown(!newPasswordShown);
    };
    const toggleRenewPassword = () => {
        setRenewPasswordShown(!renewPasswordShown);
    };

    const resendEmail = async () => {
        let UserIndividual = await axios.post(`${window.location.origin}/api/User/VerifyEmail/`, {})
        if(UserIndividual.data.sent){
            setEmailSent(UserIndividual.data.sent)
        }else{
            setEmailSent(UserIndividual.data.error)
        }
        
    }
    const handleChange = async (event) => {
        let fileUploaded = event.target.files[0];
        let formDataVal = new FormData();
        formDataVal.append('Image', fileUploaded);
        setFormData(formDataVal)
        setImageChangeBool(true)
        console.log(formDataVal)

    };

    const changeImage = async () => {
        if(!ImageChangeBool) return;
        let file_upload  = await axios.post(`${window.location.origin}/api/User/AdduserImage/`, formData)
        if(file_upload.data.error) return setImageChange(file_upload.data.error)
        setImageChangeBool(false)
        setImageChange('Updated Image. Please log out and log back in to see the change.')
    }

    const hiddenFileInput = useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
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
                                <li className="flex py-3" >
                                    <div className="flex flex-col flex-1 space-y-2">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">Current email</p>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">{props.user.email}</p>
                                        </div>
                                        {/* <div></div> */}
                                        {(!props.user.provider)?<div className="flex flex-col">
                                        <p className="mb-0 font-semibold">Image profile</p>
                                            <input className="sr-only" type="file" name="file" 
                                            accept=".jpg,.png,.pdf"
                                            ref={hiddenFileInput} 
                                            onChange={handleChange}/>
                                            <button
                                            type="submit"
                                            className="inline-flex justify-center w-full py-2 text-sm font-semibold border border-transparent text-dim-grey sm:w-1/4 sm:px-16 bg-whisper"
                                            onClick={handleClick}
                                            >
                                            {formData || props.user.image ? "Update File" : "Choose File"}
                                            </button>
                                            <div className="margin-top-bottom-two">{(formData) ? <button onClick={changeImage} className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue sm:mr-0">Save Image</button>: null}</div>
                                            <p className="pt-1 mb-0 text-sm text-dim-grey">{formData ? formData.name: "No File Chosen" }</p>
                                            <p className="pt-1 mb-0 text-sm text-dim-grey">{ImageChange ? ImageChange : null }</p>
                                        </div>:null}
                                    </div>
                                </li>
                                {(!props.user.verified && !props.user.provider)? <li className="flex py-3" >
                                    <div className="flex flex-col flex-1 space-y-2">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">Resend verification email</p>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">Your account is not verified. Please verify your email.</p>
                                        </div>
                                        <div className="pt-2 text-left">
                                            <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue sm:mr-0" onClick={resendEmail}>
                                                Request email verification
                                            </button>
                                            <div>{emailSent}</div>
                                        </div>
                                    </div>
                                </li>:null}
                                {/* <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-2">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">Unsubscribe from promotional emails</p>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">Opt out from all promotional emails</p>
                                        </div>
                                        <div className="pt-2 text-left">
                                            <button className="px-3 py-2 mr-3 text-center truncate bg-white border-1 text-dark-blue border-dark-blue hover:bg-dark-blue sm:mr-0">
                                                Unsubscribe
                                            </button>
                                        </div>
                                    </div>
                                </li> */}
                                {(!props.user.provider)?<div>
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-4">
                                        <div className="flex flex-row flex-wrap">
                                            <label htmlFor="update email" className="mb-0 font-semibold">Update your email</label>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <input type="email" name="email" id="email" className="focus:outline-none bg-white border border-whisper text-dark-blue text-sm block w-full p-2.5" placeholder="Enter your email" onChange={(e)=> setNewEmail(e.target.value)}/>
                                        </div>
                                        <div className="relative w-full">
                                            <input type={emailPasswordShown ? "text" : "password"} name="password" id="password" className="bg-white border focus:outline-none border-whisper text-dark-blue text-sm block w-full p-2.5" onChange={(e)=> setNewEmailCurrentPassword(e.target.value)} placeholder="Enter your current password"/>
                                            <button onClick={toggleEmailPassword} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                                {emailPasswordShown ? <EyeSlashFill/> : <EyeFill/> }
                                            </button>
                                        </div>
                                        <div className="pt-2 text-left">
                                            <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue sm:mr-0" onClick={ChangeEmail}>
                                                Change email
                                            </button>
                                            <div>{ErrorEmail}</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex py-3">
                                    <div className="flex flex-col flex-1 space-y-4">
                                        <div className="flex flex-row flex-wrap">
                                            <label htmlFor="Change password" className="mb-0 font-semibold">Change your password</label>
                                        </div>
                                        <div className="relative w-full">
                                            <input type={newPasswordShown ? "text" : "password"} name="email" id="email" className="focus:outline-none bg-white border border-whisper text-dark-blue text-sm block w-full p-2.5" placeholder="Enter your new password" onChange={(e)=> setNewPassword1(e.target.value)}/>
                                            <button onClick={toggleNewPassword} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                                {newPasswordShown ? <EyeSlashFill/> : <EyeFill/> }
                                            </button>
                                        </div>
                                        <div className="relative w-full">
                                            <input type={newPasswordShown ? "text" : "password"} name="password" id="password" className="bg-white border focus:outline-none border-whisper text-dark-blue text-sm block w-full p-2.5" placeholder="Re-enter your new password" onChange={(e)=> setNewPassword2(e.target.value)}/>
                                            <button onClick={toggleRenewPassword} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                                {newPasswordShown ? <EyeSlashFill/> : <EyeFill/> }
                                            </button>
                                        </div>
                                        <div className="relative w-full">
                                            <input type={renewPasswordShown ? "text" : "password"} name="password" id="password" className="bg-white border focus:outline-none border-whisper text-dark-blue text-sm block w-full p-2.5" placeholder="Enter your current password" onChange={(e)=> setCurrentPassword(e.target.value)}/>
                                            <button onClick={toggleRenewPassword} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                                {renewPasswordShown ? <EyeSlashFill/> : <EyeFill/> }
                                            </button>
                                        </div>
                                        <div className="pt-2 text-left">
                                            <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue sm:mr-0" onClick={ChangePassword}>
                                                Change password
                                            </button>
                                            <div>{ErrorPassword}</div>
                                        </div>
                                    </div>
                                </li></div>:null}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
