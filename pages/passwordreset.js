import client from '../components/GraphQL';
import {AUTHENTICATE_USER} from '../GraphQL/Mutations/Auth';
import React, { useEffect, useState } from "react";
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import axios from 'axios';

export default function VerificationEmail({authenticateEmailUser, token}) {
    const [renewPasswordShown, setRenewPasswordShown] = useState(false);
    const [ChangePasswordFunc, setChangePasswordFunc] = useState(false);

    const toggleRenewPassword = () => {
        setRenewPasswordShown(!renewPasswordShown);
    };

    const ChangePassword = async () => {
        if(ChangePasswordFunc) return setError("Password already changed");
        if(newPassword1 !== newPassword2) return setError("Your new Password doesn't match");
        if(newPassword1.replace(/\s/g, '').length <= 6) return setError("Your Password isn't long enough");
        setChangePasswordFunc(true)
        const Password = await axios.post(`${window.location.origin}/api/User/ChangePassword`, {password: newPassword1, token: token});
        if(Password.data.error){
            setChangePasswordFunc(false)
            return setError(Password.data.error)
        }
        return window.location.href = '/directory/login';

    }

    const [newPassword1, setNewPassword1] = useState(null);
    const [newPassword2, setNewPassword2] = useState(null);
    const [error, setError] = useState(null);


    const [FormError, setFormError] = useState();
    useEffect(() => {
        if(authenticateEmailUser.errormessage){
            if(authenticateEmailUser.errormessage.length > 0) setFormError(authenticateEmailUser.errormessage[0])
            let forwardPage = () => window.location.href = '/directory/login'
            setTimeout(forwardPage, 500);
        }


      }, [authenticateEmailUser]);


    return (
        <div className='mb-0 ml-4 text-large md:text-xl text-dark-blue'>{FormError ? FormError: 
        <div>
            <ul className="pl-0 divide-y divide-whisper">
                <li className="flex py-3">
                <div className="relative w-full">
                    <input type={renewPasswordShown ? "text" : "password"} name="password" id="password" className="bg-white border focus:outline-none border-whisper text-dark-blue text-sm block w-full p-2.5" placeholder="Re-enter your new password" onChange={(e)=> setNewPassword1(e.target.value)}/>
                    <button onClick={toggleRenewPassword} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                        {renewPasswordShown ? <EyeSlashFill/> : <EyeFill/> }
                    </button>
                </div>
                </li>
                <li className="flex py-3">
                <div className="relative w-full">
                    <input type={renewPasswordShown ? "text" : "password"} name="password" id="password" className="bg-white border focus:outline-none border-whisper text-dark-blue text-sm block w-full p-2.5" placeholder="Enter your current password" onChange={(e)=> setNewPassword2(e.target.value)}/>
                    <button onClick={toggleRenewPassword} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                        {renewPasswordShown ? <EyeSlashFill/> : <EyeFill/> }
                    </button>
                </div>
                </li>
                <div className="pt-2 text-left">
                    <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue sm:mr-0" onClick={ChangePassword}>
                        Change password
                    </button>
                    <div>{error}</div>
                </div>

            </ul>
        </div>
        }
        </div>
    )
}


export async function getServerSideProps({query}){

    const token = query.token
    let token_given = null;
    if(token){
        token_given = await client.mutate({mutation: AUTHENTICATE_USER, variables: { token, passwordreset: true}})
    }else{
        token_given = {data: {authenticateEmailUser: {errormessage: ['Unauthorized']}}}
    }
    return {
      props: {
        token,
        authenticateEmailUser: token_given.data.authenticateEmailUser
      }
    }
}