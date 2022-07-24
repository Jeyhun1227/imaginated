import React, { useEffect, useState } from "react";
import Image from 'next/image'
import placeHolder from "../../../public/place-holder/placeHolder-620x270.jpg"



export default function FindListing(props) {

    return (
    <div>
        <div className="w-full bg-white">
            <div className="px-4 sm:px-0">
                <div className="max-w-4xl py-12 mx-auto sm:mx-0">
                    <div className="pl-0 divide-y divide-whisper">
                        <div className="pb-12 sm:py-12">
                            <div className="text-center">
                                <h1 className="font-bold">Find & Claim Your Listing</h1>
                            </div>
                            <div className="flex items-center justify-between w-full pt-4">
                                <input type="text" id="simple-search" data-dropdown-toggle="dropdown" className="inline-flex items-center justify-start order-1 w-full px-2 py-2 text-sm text-gray-900 border text-ellipsis border-very-light-grey focus:outline-none" placeholder="Search..." required/>
                                <button type="submit" className="inline-flex items-center justify-end flex-shrink-0 order-2 px-6 py-2 ml-4 overflow-hidden text-sm text-white border border-black sm:px-12 bg-dark-blue hover:text-indigo-500">
                                    <span className="text-sm text-white truncate hover:text-indigo-500">Claim</span>
                                </button>
                            </div>
                        </div>
                        <div className="py-12">
                            <div className="text-left sm:text-center">
                                <h1 className="font-bold">Find & Claim Your Listing</h1>
                                <p className="my-3 text-dim-grey">Thousands of people visit Imaginated every day looking for new personal brands to learn from. Customize and optimize your listing to make it easier for new users to find you. It’s free!! <a href="/signup" className="no-underline text-denim">Get started</a> today.</p>
                            </div>
                            <div className="flex mx-auto mt-8 place-content-center"> 
                                <Image className="object-cover object-center sm:justify-center" 
                                src={placeHolder}
                                alt="place Holder"/>
                            </div>
                        </div>
                        <div className="py-12">
                            <div className="text-center">
                                <h1 className="font-bold"> Boost Your Brand Image </h1>
                            </div>
                            <div className="flex items-center justify-center px-8 py-12">
                                <div className="flex items-end justify-around w-full max-w-lg mx-auto space-y-0">
                                    <div className="flex space-x-4">
                                        <div className="relative flex items-center justify-center w-20 h-20 text-sm font-medium uppercase rounded-full group sm:flex-1 sm:py-6 bg-light-yellow">
                                            <span className="text-2xl text-white">STAT</span>
                                        </div>
                                        <div className="relative flex items-center justify-center w-20 h-20 text-sm font-medium uppercase rounded-full group sm:flex-1 sm:py-6 bg-gold">
                                            <span className="text-2xl text-white">STAT</span>
                                        </div>
                                        <div className="relative flex items-center justify-center w-20 h-20 text-sm font-medium uppercase rounded-full group sm:flex-1 sm:py-6 bg-green">
                                            <span className="text-2xl text-white">STAT</span>
                                        </div>
                                        <div className="relative flex items-center justify-center w-20 h-20 text-sm font-medium uppercase rounded-full group sm:flex-1 sm:py-6 bg-dark-blue">
                                            <span className="text-2xl text-white">STAT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-12">
                            <div className="py-3 text-center ">
                                <button
                                type="submit"
                                className="inline-flex justify-center w-full py-2 text-sm font-medium text-white border border-transparent sm:w-auto sm:px-16 bg-dark-blue"
                                onClick={props.nextPage}
                                >
                                Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );

}