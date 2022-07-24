import React from 'react';
import ClaimFormStepBar from '../components/MultiStepForms/ClaimListingForm/ClaimFormStepBar'
import FindListing from '../components/MultiStepForms/ClaimListingForm/FindListing'
import ChoosePlan from '../components/MultiStepForms/ClaimListingForm/ChoosePlan'
import Verification from '../components/MultiStepForms/ClaimListingForm/Verification'

export default function ClaimListing(props) {

    
    return (
        <div>
            <div className="bg-white xl:px-0">
                <ClaimFormStepBar setStepPercent={"1.3%"} setStepNum={"1"}/>
                <FindListing/>
                <ChoosePlan/>
                <Verification/>
            </div>
        </div>
    )}

