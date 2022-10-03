import { signIn, signOut, useSession } from "next-auth/react";
import { Apple, CheckLg } from 'react-bootstrap-icons';
import womanBehindComputer from '../public/signup/WomanBehindComputer_336x306.png';
import {CREATER_USER_CUSTOM} from '../GraphQL/Mutations/Auth'
import Image from 'next/image'
import client from '../components/GraphQL';
import { useMutation } from "@apollo/client";

import { useEffect, useState } from "react";

export default function Signup() {

    const [createUser, { mutation_error_create }] = useMutation(CREATER_USER_CUSTOM);
    const {data} = useSession()
    useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const return_url = urlParams.get('return_url') ? urlParams.get('return_url') : '/'
      if (data) {
  
          window.location.href = return_url
  
      }
    }, [data]);
    const [FormError, setFormError] = useState();
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const firstName = event.target['first-name'].value
      const lastName = event.target['last-name'].value
      if(firstName.length < 2) return setFormError('Please Provide your first name.')
      if(lastName.length < 2) return setFormError('Please Provide your last name.')
      const fullname = event.target['first-name'].value + ' ' + event.target['last-name'].value;
      const email = event.target['email-address'].value;
      const password = event.target['password'].value;
      if(password.replace(/\s/g, '').length <= 6) return setFormError('Please Provide a password with 6 characters minimum.');

      if(email.length < 4) return setFormError('Please Provide a valid email.')
// // email:  { type: GraphQLString }, password:  { type: GraphQLString }, fullname: {type: GraphQLString}

      const newUserCreated = await createUser({
        variables: {fullname, email, password},
      });
      if(newUserCreated.data.authenticateCustomUser.errormessage){
        if(newUserCreated.data.authenticateCustomUser.errormessage.length > 0) return setFormError(newUserCreated.data.authenticateCustomUser.errormessage[0])
      }
      if(newUserCreated.data.authenticateCustomUser.id) return  window.location.href = '/login'

      // const newUserCreated = await client.query({query:CREATER_USER_CUSTOM, variables: {fullname, email, password}})
      console.log('newUserCreated: ', newUserCreated);
    }
  return (
    <div>
      <div className="bg-white xl:px-0">
        <div className="px-4 sm:px-0">
          <div className="py-12 mx-auto sm:my-20 sm:py-0 max-w-7xl">
            <div className="sm:grid sm:grid-rows-3 sm:grid-cols-9 sm:gap-4">
              <div className="items-center sm:row-span-3 sm:col-span-5 xl:mr-28 sm:mr-4">
                <div className="flex flex-col">
                  <h1 className="flex flex-col text-3xl font-light leading-normal md:text-5xl">
                    <span>Discover, explore</span>{' '}
                    <span>and research creators</span>
                    <span>to learn from</span>
                  </h1>
                  <div className="flex flex-col pt-1 pb-4 space-y-3 sm:pt-4 sm:pb-12">
                    <span className="flex flex-row items-center">
                      <CheckLg/>
                      <p className="mb-0 ml-4 text-lg md:text-xl text-dark-blue">Save and share your favorites</p>
                    </span>
                    <span className="flex flex-row items-center">
                      <CheckLg/>
                      <p className="mb-0 ml-4 text-lg md:text-xl text-dark-blue">Get personalized recommendations</p>
                    </span>
                    <span className="flex flex-row items-center">
                      <CheckLg/>
                      <p className="mb-0 ml-4 text-lg md:text-xl text-dark-blue">Review creators and give feedback</p>
                    </span>
                  </div>
                  <div className="hidden sm:flex">
                    <Image className="object-cover object-center sm:justify-center" 
                    src={womanBehindComputer} 
                    alt="Woman behind computer"/>
                  </div>
                </div>
              </div>
              
              <div className="items-center mb-auto sm:row-span-3 sm:col-span-4 xl:ml-28 sm:ml-4">
                <div className="hidden mb-8 sm:block">
                  <h2 className="font-bold">Sign Up</h2>
                  <div>
                    <p className="mb-0 text-dim-grey">By continuing, you agree to Imaginated's</p> 
                    <div className="flex flex-col">
                      <span>
                        <a href="/termsofservice" className="inline-block pr-1 no-underline">Terms of Service</a>
                        <p className="inline-block mb-0 text-dim-grey">and acknowledge</p>
                      </span>
                      <span>
                      <p className="inline-block mb-0 text-dim-grey">Imaginated's</p>
                      <a href="/privacypolicy" className="inline-block ml-1 no-underline ">Privacy Policy</a>
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  {!data ? ( <div className="space-y-3">
                    {/* <button 
                      type="submit"
                      className="relative flex justify-center w-full px-4 py-2 font-bold text-white truncate bg-black border border-transparent text-med group" 
                      onClick={() => signIn("apple")}>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-12 sm:pl-2 lg:pl-12">
                          <Apple className="w-5 h-5 fill-white" aria-hidden="true"/>
                        </span>
                        Continue with Apple
                    </button> */}
                    <button 
                      type="submit"
                      className="relative flex justify-center w-full px-4 py-2 font-bold text-black truncate border border-transparent text-med bg-white-smoke group" 
                      onClick={() => signIn("google")}>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-12 sm:pl-2 lg:pl-12">
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px">
                              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                          </svg>
                        </span>
                        Continue with Google
                    </button>
                    <button 
                      type="submit"
                      className="relative flex justify-center w-full px-4 py-2 font-bold text-white truncate border border-transparent text-med bg-dodger-blue group" 
                      onClick={() => signIn("facebook")}>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-12 sm:pl-2 lg:pl-12">
                          <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">
                            <path d="M32,11h5c0.552,0,1-0.448,1-1V3.263c0-0.524-0.403-0.96-0.925-0.997C35.484,2.153,32.376,2,30.141,2C24,2,20,5.68,20,12.368 V19h-7c-0.552,0-1,0.448-1,1v7c0,0.552,0.448,1,1,1h7v19c0,0.552,0.448,1,1,1h7c0.552,0,1-0.448,1-1V28h7.222 c0.51,0,0.938-0.383,0.994-0.89l0.778-7C38.06,19.518,37.596,19,37,19h-8v-5C29,12.343,30.343,11,32,11z"/>
                          </svg>                        
                        </span>
                        Continue with Facebook
                    </button>
                    <div className="mt-2 text-center">
                      <p className="text-sm no-underline text-dim-grey">Don't worry, we never post without your permission</p>
                    </div>
                  </div>
                  ) : (
                    <div>
                      <span>{data.user.name}</span>
                      <span>{data.user.email}</span>

                      {data.user.image && (
                        <img
                          src={data.user.image}
                          style={{ width: "25px", borderRadius: "50%" }}
                        />
                      )}
                      <button onClick={signOut}>Sign Out</button>
                    </div>
                  )}
                </div>
                <div className="">
                  <h4 className="w-full my-10 text-center leading-[0.1rem] border-b-2 border-whisper">
                    <span className="px-3 bg-white">
                      OR
                    </span>
                  </h4>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="space-y-3 shadow-sm">
                    <div className="flex flex-row space-x-3">
                      <div className="w-full">
                        <label htmlFor="fname" className="sr-only">
                          First Name
                        </label>
                        <input
                          id="first-name"
                          name="fname"
                          type="text"
                          autoComplete="given-name"
                          required
                          className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="w-full">
                      <label htmlFor="lname" className="sr-only">
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        name="lname"
                        type="text"
                        autoComplete="family-name"
                        required
                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Last Name"
                      />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="pb-4 text-sm no-underline text-dim-grey">Password must be at least 6 characters in length</p>
                    {FormError ? <div className="FormErrorSubmission">{FormError}</div>: null}
                    <button 
                      type="submit"
                      className="relative flex justify-center w-full px-4 py-2 text-white border border-transparent text-med bg-dark-blue group" 
                      >
                        Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}