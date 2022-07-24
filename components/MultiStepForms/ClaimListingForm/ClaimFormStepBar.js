import React, { useEffect, useState } from "react";

export default function ClaimFormStepBar(props) {

    const [stepPercent, setStepPercent] = useState('1%')
    const [stepNum, setStepNum] = useState('1')
    const [stepText, setStepText] = useState('Find your listing')

    return (
    <div className="w-full bg-light-grey">
        <div className="px-4 sm:px-0">
            <div className="py-6 mx-auto sm:py-12 sm:mx-0 max-w-7xl">
                <div className="mb-4 text-center">
                    <h2>{props.setStepText ? props.setStepText  : stepText}</h2>
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