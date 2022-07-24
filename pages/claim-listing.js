import React, { useState } from 'react';
import ClaimFormStepBar from '../components/MultiStepForms/ClaimListingForm/ClaimFormStepBar'
import FindListing from '../components/MultiStepForms/ClaimListingForm/FindListing'
import ChoosePlan from '../components/MultiStepForms/ClaimListingForm/ChoosePlan'
import Verification from '../components/MultiStepForms/ClaimListingForm/Verification'
import ClaimFormThankYou from '../components/MultiStepForms/ClaimListingForm/ClaimFormThankYou'


export default function ClaimListing(props) {

    const [page, setPage] = useState(0)
    
    const formTitles = ["Find your Listing", "Select a Plan", "Verification", "Thank You!"]
    
    const fromPercent = ["1.3%", "25%", "75%", "100%"]

    const increment = () => {
        setPage((currPage) => currPage + 1)
    }
    const deincrement = () => {
        setPage((currPage) => currPage - 1)
    }

    const pageDisplay = () => {
        if (page === 0) {
            return <FindListing nextPage={increment}/>
        }
        else if (page === 1) {
            return <ChoosePlan nextPage={increment} previousPage={deincrement}/>
        }
        else if (page === 2) {
            return <Verification/>
        }
        else {
            return <ClaimFormThankYou/>
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

