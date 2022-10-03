import React, { useEffect, useState, useRef } from "react";

export default function Verification(props) {

    const [btnDisabled, setBtnDisabled] = useState(false)

    const hiddenFileInput = useRef(null);

    // useEffect(() => {

    //     if (props.formData.file != null) {
    //         let fileSize = props.formData.file.size;
    //         let fileMb = fileSize / 1024 ** 2;
    //         let fileType = props.formData.file.type;
    //         console.log(fileType)
    //         if (fileMb > 0) {
    //             window.alert("File type too large.");
    //             // setBtnDisabled(true);
    //             console.log(btnDisabled) 
    //         }
    //         if (fileType != "image/png" || fileType != "image/jpeg" ) {
    //             window.alert("File does not support. You must use .png or .jpg ");
    //             // setBtnDisabled(true);
    //         }
    //     }
    // }, [props]);
    
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    
    const handleChange = (event) => {
        let fileUploaded = event.target.files[0];
        props.handleFile(fileUploaded); 
        // let fileSize = fileUploaded.size;
        // let fileMb = fileSize / 1024 ** 2;
        // let fileType = fileUploaded.type;
        // console.log(fileMb)
        // console.log(fileType)
        // setBtnDisabled = true;
        // console.log(btnDisabled)
        // if (fileMb < 50000) {
        //     window.alert("File type too large.");
        //     setBtnDisabled = true;
        //     console.log(btnDisabled)
        // }
        // if (fileType != "image/png" || fileType != "image/jpg" ) {
        //     window.alert("File does not support. You must use .png or .jpg ");
        //     setBtnDisabled = true;
        //     console.log(btnDisabled)
        // }
    };
    return (
        
    <div>
        <div className="w-full bg-white">
            <div className="px-4 sm:px-0">
                <div className="max-w-4xl py-6 mx-auto sm:py-12 sm:mx-0">
                    <div className="pl-0 divide-y divide-whisper">
                        <div className="pb-6 sm:pb-12">
                            <div className="text-center">
                                <h1 className="font-bold">You have been selected for the Verified Plan ($0/mo)</h1>
                                <p className="my-3 text-dim-grey">Upload a copy of your driver's license in your name to help our team verify your profile. Business cards not accepted</p>
                            </div>
                        </div>
                        <div className="py-6 sm:py-12">
                            <div className="flex flex-col py-3 text-center ">
                                <label className="pb-1 mb-0 text-sm text-dim-grey">Driver's License in Your Name (JPG, PNG, GIF, BMP or PDF) format only.</label>
                                <input className="sr-only" type="file" name="file" 
                                accept=".jpg,.png,.pdf"
                                ref={hiddenFileInput} 
                                onChange={handleChange}/>
                                <button
                                type="submit"
                                className="inline-flex justify-center w-full py-2 mx-auto text-sm font-semibold border border-transparent text-dim-grey sm:w-1/4 sm:px-16 bg-whisper"
                                onClick={handleClick}
                                >
                                {props.formData.file === null ? "Choose File" : "Update File"}
                                </button>
                                <p className="pt-1 mb-0 text-sm text-dim-grey">{props.formData.file === null ? "No File Chosen" : props.formData.file.name}</p>
                                <p className="pt-1 mb-0 text-sm text-crimson">{btnDisabled}</p>
                            </div>
                        </div>
                        <div className="flex flex-row-reverse justify-between px-4 py-6 sm:py-12 sm:px-0 md:mx-8">
                            <div className="py-3 text-right ">
                                <button
                                type="submit"
                                className= "inline-flex justify-center px-8 py-2 text-sm font-medium text-white border border-transparent sm:px-16 bg-dark-blue"
                                onClick={props.submitForm}
                                disabled={btnDisabled}
                                >
                                Submit
                                </button>
                                {(props.formError)? <div>{props.formError}</div>:null}
                            </div>
                            <div className="py-3 text-left ">
                                <button
                                type="submit"
                                className="inline-flex justify-center px-8 py-2 text-sm font-medium bg-white border border-dark-blue text-dark-blue sm:px-16"
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