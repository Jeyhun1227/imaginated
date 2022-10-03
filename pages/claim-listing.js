import React, { useState } from 'react';
import ClaimFormStepBar from '../components/MultiStepForms/ClaimListingForm/ClaimFormStepBar'
import FindListing from '../components/MultiStepForms/ClaimListingForm/FindListing'
import ChoosePlan from '../components/MultiStepForms/ClaimListingForm/ChoosePlan'
import Verification from '../components/MultiStepForms/ClaimListingForm/Verification'
import ClaimFormThankYou from '../components/MultiStepForms/ClaimListingForm/ClaimFormThankYou'
import axios from 'axios';


export default function ClaimListing(props) {

    const [page, setPage] = useState(0)

    const [formError, setFormError] = useState()

    
    const formTitles = ["Step 1: Find your Listing", "Step 2: Select a Plan", "Step 3: Verification", "Thank You!"]
    
    const fromPercent = ["1.3%", "25%", "75%", "100%"]

    const [formData, setFormData] = useState({
        listing:"",
        chosenPlan: "Verified",
        file: null,
    })

    const increment = () => {
        setPage(page + 1)
    }
    const deincrement = () => {
        setPage(page - 1)
    }

    const formDataChangeFromChild = (chosenPlan) => {
        setFormData({...formData, chosenPlan})
    }

    const handleFile = (file) => {
        setFormData({...formData, file})
    }

    const submitForm = async () => {
        let formDataVal = new FormData();
        if(!formData.file) return setFormError('Please upload a file!');
        formDataVal.append('Image', formData.file);
        formDataVal.append('individual', formData.individual);
        
        let SendingForm = await axios.post(`${window.location.origin}/api/User/Claimlisting`, formDataVal)
        if(SendingForm.data.error) return setFormError(SendingForm.data.error)
        increment()
    }

    const pageDisplay = () => {
        if (page === 0) {
            return <FindListing nextPage={increment} formData={formData} setFormData={setFormData}/>
        }
        else if (page === 1) {
            return <ChoosePlan formDataChangeFromChild={formDataChangeFromChild} nextPage={increment} previousPage={deincrement} formData={formData} setFormData={setFormData}/>
        }
        else if (page === 2) {
            return <Verification formError={formError} handleFile={handleFile} nextPage={increment} previousPage={deincrement} formData={formData} setFormData={setFormData} submitForm={submitForm}/>
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

