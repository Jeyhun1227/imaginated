import React, { useEffect, useState } from "react";

export default function ClaimFormStepBar(props) {

    const [stepPercent, setStepPercent] = useState('1%')
    const [stepNum, setStepNum] = useState('1')

    return (
    <div className="w-full bg-light-grey">
        <div className="px-4 sm:px-0">
            <div className="py-12 mx-auto sm:mx-0 max-w-7xl">
                <div className="mb-4 text-center">
                    <h2>Step {props.setStepNum ? props.setStepNum  : stepNum}: Find your listing</h2>
                </div>
                <div className="w-full h-4 mb-4 rounded-full bg-white-smoke">
                    <div className="h-4 rounded-full bg-dark-blue" style={{width: props.setStepPercent ? props.setStepPercent : stepPercent}}>
                        <span className="flex pt-3 ml-auto place-content-end">{props.setStepNum ? props.setStepNum  : stepNum}/4</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );

}