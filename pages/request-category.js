import React, { useState } from 'react';
import Image from 'next/image'
import personUsingComputer from '../public/request-category/person-using-computer.png'
import Link from 'next/link';
import axios from 'axios';

export default function RequestCategory() {
    const SubmitCategory = async (e) => {
        e.preventDefault();

        if(submited) return;
        
        setSubmited(true);
        try{
            let addListing = await axios.post('/api/User/addListing/', {category})
            window.location.href = "/directory/"   

        }catch(error){
            if (error.response) {
                // Request made and server responded
                setError("Please Sign up/Login to submit your request")
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
        
     }
    const [category, setCategory] = useState("")
    const [submited, setSubmited] = useState(false);
    const [Errors, setError] = useState("");

    return (
        <div>
            <div className="bg-white xl:px-0">
                <div className="w-full bg-white">
                    <div className="px-4 sm:px-0">
                        <div className="max-w-5xl py-6 mx-auto sm:py-12 sm:mx-0">
                            <div className="md:mt-10 sm:mt-0">
                                <div className="md:grid md:grid-cols-7 md:gap-6">
                                    <div className="md:col-span-4 md:mt-10 sm:mt-0">
                                        <div className="px-0 py-0 sm:p-6">
                                            <div className="flex flex-col-reverse items-center justify-center px-4 space-y-8 md:justify-start md:items-start md:flex-col sm:px-0">
                                                <h3 className="text-large font-semibold leading-6 text-center md:text-left text-dark-blue md:text-xl">Can&apos;t find a category on the directory that you think should be here?</h3>
                                                <div className=''>
                                                    <Image className="object-cover object-center sm:justify-center" 
                                                    src={personUsingComputer}
                                                    layout="intrinsic"
                                                    alt="Person Using Computer"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-3">
                                        <form onSubmit={SubmitCategory}>
                                            <div className="overflow-hidden">
                                                <div className="px-4 py-4 bg-light-grey sm:p-6">
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6">
                                                            <h4 className='mb-4'>Request a category</h4>
                                                            <label htmlFor="street-address" className="block mb-2 text-sm font-medium">
                                                                Name of the category you would like to be listed                                                            
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="request-category"
                                                                autoComplete=""
                                                                onChange={(e)=> setCategory(e.target.value)}
                                                                placeholder="Enter here"
                                                                className="items-center justify-start order-1 block w-full px-2 py-2 text-sm text-gray-900 border text-ellipsis border-very-light-grey focus:outline-none"
                                                            />
                                                            <div className="block mt-2 text-sm font-medium">Are you looking to be listed? <div className='font-semibold text-dark-blue'><Link href="/request-listing" >Request a listing</Link></div> after submitting this request</div>
                                                            <div className="py-3 text-left ">
                                                                <button
                                                                className="inline-flex justify-center px-8 py-2 text-sm font-medium text-white border border-transparent sm:px-10 bg-dark-blue"
                                                                >
                                                                Submit
                                                                </button>
                                                                <div>{Errors}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
    )}

