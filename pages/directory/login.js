import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import React, { useEffect, useState } from "react";
import manBehindComputer from '../../public/logIn/ManBehindComputer_427x574.png'
import Image from 'next/image'
import Link from 'next/link';
import Cookies from 'universal-cookie';

export default function Login({return_url}) {
  const {data} = useSession()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [FormError, setFormError] = useState();
  const [signInProcess, setSignInProcess] = useState();

  useEffect(() => {
    if (data) {
      const cookies = new Cookies();
      cookies.set('user_id', data.id, { path: '/' });
      window.location.href = return_url

    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signedin = await signIn('credentials', {      redirect: false,
      password: password,
      email: email})
    if(!signedin.ok) return setFormError('Incorrect Email or Password')
    window.location.href = return_url
  }

  const signInValue = (value) => {
    if(signInProcess) return;
    setSignInProcess(true)
    signIn(value)
  }
  const signOutFunc = () => {
    const cookies = new Cookies();
    cookies.remove('user_id', { path: '/' });
    signOut()
  }

  return (
    <div>
      <div className="bg-white xl:px-0">
        <div className="px-4 sm:px-0">
          <div className="py-12 mx-auto sm:my-20 sm:py-0 max-w-7xl">
            <div className="sm:grid sm:grid-rows-3 sm:grid-cols-9 sm:gap-4">
              <div className="items-center hidden sm:flex sm:row-span-3 sm:col-span-5 xl:mr-28 sm:mr-4">
                <Image className="object-cover object-center sm:justify-center" src={manBehindComputer} alt="Man behind computer"/>
              </div>
              <div className="items-center mb-auto sm:row-span-3 sm:col-span-4 xl:ml-28 sm:ml-4">
                <div className="mb-8">
                  <h2 className="font-bold">Log In</h2>
                  <span>
                    <p className="inline-block mb-0 text-dim-grey">New to Imaginated?</p> 
                    <div className="inline-block pl-1 no-underline"><Link href={`/directory/signup/?return_url=${return_url}`} >Sign Up</Link></div>
                    <p className="mb-0 text-dim-grey">By logging in, you agree to Imaginated&apos;s</p>
                    <span className="flex flex-row">
                      <div className="pr-1 no-underline"><Link href="/termsofservice" >Terms of Service</Link></div>
                      <p className="mb-0 text-dim-grey">and</p>
                      <div className="pl-1 no-underline"><Link href="/privacypolicy" >Privacy Policy</Link></div>
                    </span>
                  </span>
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
                      onClick={() => signInValue("google")}>
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
                      onClick={() => signInValue("facebook")}>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-12 sm:pl-2 lg:pl-12">
                          <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">
                            <path d="M32,11h5c0.552,0,1-0.448,1-1V3.263c0-0.524-0.403-0.96-0.925-0.997C35.484,2.153,32.376,2,30.141,2C24,2,20,5.68,20,12.368 V19h-7c-0.552,0-1,0.448-1,1v7c0,0.552,0.448,1,1,1h7v19c0,0.552,0.448,1,1,1h7c0.552,0,1-0.448,1-1V28h7.222 c0.51,0,0.938-0.383,0.994-0.89l0.778-7C38.06,19.518,37.596,19,37,19h-8v-5C29,12.343,30.343,11,32,11z"/>
                          </svg>                        
                        </span>
                        Continue with Facebook
                    </button>
                  </div>
                  ) : (
                    <div>
                      <span>{data.user.name}</span>
                      <span>{data.user.email}</span>

                      {data.user.image && (
                        <Image
                          src={data.user.image}
                          width={25} height={25}
                          style={{ width: "25px", borderRadius: "50%" }}
                        />
                      )}
                      <button onClick={signOutFunc}>Sign Out</button>
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
                    <div>
                      <label htmlFor="email-address" className="sr-only" >
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only" >
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm no-underline"><Link href="/forgot-password/" >Forgot Password?</Link></div>
                    {FormError ? <div className="FormErrorSubmission">{FormError}</div>: null}
                    <button 
                      type="submit"
                      className="relative flex justify-center w-full px-4 py-2 text-white border border-transparent text-med bg-dark-blue group" 
                      >
                        Log In
                    </button>
                    <span>
                      <p className="inline-block mb-0 text-dim-grey">New to Imaginated?</p> 
                      <div className="inline-block pl-1 no-underline"><Link href={`/directory/signup/?return_url=${return_url}`} >Sign Up</Link></div>
                    </span>
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
export async function getServerSideProps({query}){

  const return_url = query.return_url ? query.return_url : '/directory'

  return {
    props: {
      return_url    
    }
  }
}