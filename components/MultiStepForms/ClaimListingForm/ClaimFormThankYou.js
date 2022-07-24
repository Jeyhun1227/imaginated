import React, { useEffect, useState } from "react";
import { CheckCircleFill } from 'react-bootstrap-icons';

export default function ClaimFormThankYou(props) {

    return (
    <div>
        <div className="w-full bg-white">
            <div className="px-4 sm:px-0">
                <div className="max-w-4xl py-6 mx-auto sm:py-12 sm:mx-0">
                    <div className="pl-0 divide-y divide-whisper">
                        <div className="pb-6 sm:pb-12">
                            <div className="text-center">
                                <CheckCircleFill className="mx-auto mb-12 w-36 h-36 fill-green"/>
                                <h1 className="font-bold">We have received your submission.</h1>
                                <p className="my-3 text-dim-grey">Our verification team will review your submission and be in touch via email once it is approved.</p>
                            </div>
                        </div>
                        <div className="py-6 sm:py-12">
                            <div className="py-3 text-center ">
                                <p className="pb-1 mb-0 text-sm text-dim-grey">Driver’s License in Your Name (JPG, PNG, GIF, BMP or PDF) format only.</p>
                                <button
                                type="submit"
                                className="inline-flex justify-center w-full py-2 text-sm font-semibold border border-transparent text-dim-grey sm:w-auto sm:px-16 bg-whisper"
                                onClick={props.nextPage}
                                >
                                Choose File
                                </button>
                                <p className="pt-1 mb-0 text-sm text-dim-grey">No File Chosen</p>
                            </div>
                        </div>
                        <div className="flex flex-row-reverse justify-between px-4 py-6 sm:py-12 sm:px-0 md:mx-8">
                            <div className="py-3 text-right ">
                                <a
                                href="/"
                                className="inline-flex justify-center px-8 py-2 text-sm font-medium text-white no-underline border border-transparent sm:px-16 bg-dark-blue"
                                >
                                Home
                                </a>
                            </div>
                            <div className="py-3 text-left">
                                <button
                                type="submit"
                                className="inline-flex justify-center px-8 py-2 text-sm font-medium bg-white border-1 border-dark-blue text-dark-blue sm:px-16"
                                onClick={props.previousPage}
                                >
                                Back
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