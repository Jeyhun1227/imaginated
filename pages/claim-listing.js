import React, { useState } from 'react';
import ClaimFormStepBar from '../components/MultiStepForms/ClaimListingForm/ClaimFormStepBar'
import FindListing from '../components/MultiStepForms/ClaimListingForm/FindListing'
import ChoosePlan from '../components/MultiStepForms/ClaimListingForm/ChoosePlan'
import Verification from '../components/MultiStepForms/ClaimListingForm/Verification'
import ClaimFormThankYou from '../components/MultiStepForms/ClaimListingForm/ClaimFormThankYou'


export default function ClaimListing(props) {

    const [page, setPage] = useState(0)
    
    const formTitles = ["Step 1: Find your Listing", "Step 2: Select a Plan", "Step 3: Verification", "Thank You!"]
    
    const fromPercent = ["1.3%", "25%", "75%", "100%"]

    const increment = () => {
        setPage((currPage) => currPage + 1)
    }
    const deincrement = () => {
        setPage((currPage) => currPage - 1)
    }
    
    const [formData, SetFormData] = useState({
        listing: "",
        chosenPlan: "Verified",
        file: ""
    })
    const formDataChangeFromChild = (chosenPlan) => {
        SetFormData({listing: formData.listing, chosenPlan, file: formData.file})
    }
    const pageDisplay = () => {
        if (page === 0) {
            return <FindListing nextPage={increment}/>
        }
        else if (page === 1) {
            return <ChoosePlan formDataChangeFromChild={formDataChangeFromChild} nextPage={increment} previousPage={deincrement}/>
        }
        else if (page === 2) {
            return <Verification nextPage={increment} previousPage={deincrement}/>
        }
        else {
            return <ClaimFormThankYou previousPage={deincrement}/>
        }
    }
    
    return (
        <div>
            <div className="bg-white xl:px-0">
                <ClaimFormStepBar setStepPercent={fromPercent[page]} setStepNum={page+1} setStepText={formTitles[page]}/>
                <div>{pageDisplay()}</div>
                {/* <div className="pb-12">
                    <div className="py-3 text-center ">
                        <button
                        type="submit"
                        className="inline-flex justify-center w-full py-2 text-sm font-medium text-white border border-transparent sm:w-auto sm:px-16 bg-dark-blue"
                        onClick={() => {}}
                        >
                        Get Started
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    )}

