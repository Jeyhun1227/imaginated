import client from '../components/GraphQL';
import {AUTHENTICATE_USER} from '../GraphQL/Mutations/Auth';
import React, { useEffect, useState } from "react";
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import axios from 'axios';

export default function ForgotPassword() {


    const ForgotPassword = async () => {
        if(sending) return;

        if(!newEmail) return         setError('Please provide a valid email');
        setSending(true)
        const Password = await axios.post(`${window.location.origin}/api/User/forgotPassword/`, {email: newEmail});
        setSending(false)
        if(Password.data.error) return setError(Password.data.error)

        setError('Email sent. Please check your email and follow the steps in the email.')
        setTimeout(function() {
            window.location.href = '/directory/login/'
          }, 2000);
    }

    const [newEmail, setNewEmail] = useState(null);
    const [error, setError] = useState(null);
    const [sending, setSending] = useState(false);




    return (
        <div className='max-w-4xl py-12 mx-auto sm:mx-0'>
            <div className='pb-6 sm:pb-12'>
                <div className='mb-0 ml-4 text-large md:text-xl text-dark-blue'>
                    <ul className="pl-0 divide-whisper">
                    <h2 className='font-bold'>Reset Password</h2>
                        <div>Please enter your email address below and we&apos;ll email you instructions on how to reset your password.</div>
                        <li className="flex py-3">
                        <div className="relative w-full">
                            <input  name="password" id="password" className="bg-white border focus:outline-none border-whisper text-dark-blue text-sm block w-full p-2.5" placeholder="Please enter your Email" onChange={(e)=> setNewEmail(e.target.value)}/>
                        </div>
                        </li>
                        <div className="pt-2 text-left">
                            <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue sm:mr-0" onClick={ForgotPassword}>
                                Reset Password
                            </button>
                            <div>{error}</div>
                        </div>

                    </ul>
                </div>
            </div>
        </div>
    )
}


