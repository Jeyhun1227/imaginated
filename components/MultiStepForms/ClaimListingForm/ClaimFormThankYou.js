import React, { useEffect, useState } from "react";
import { CheckCircleFill } from 'react-bootstrap-icons';
import Link from 'next/link';

export default function ClaimFormThankYou(props) {

    return (
    <div>
        <div className="w-full bg-white">
            <div className="px-4 sm:px-0">
                <div className="max-w-4xl py-6 mx-auto sm:py-12 sm:mx-0">
                    <div className="pb-6 sm:pb-12">
                        <div className="text-center">
                            <CheckCircleFill className="w-20 h-20 mx-auto mb-12 sm:w-36 sm:h-36 fill-green"/>
                            <h1 className="font-bold">We have received your submission.</h1>
                            <p className="my-3 text-dim-grey">Our verification team will review your submission and be in touch via email once it is approved.</p>
                        </div>
                    </div>
                    <div className="pb-12">
                        <div className="py-3 text-center ">
                        <div className="inline-flex justify-center w-full py-2 text-sm font-medium text-white no-underline border border-transparent sm:w-auto sm:px-16 bg-dark-blue">
                        <Link>
                            <Link
                            href="/"
                            
                            >
                            Home
                            </Link>
                        </Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );

}