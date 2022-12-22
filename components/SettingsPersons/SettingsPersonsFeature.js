import ImageWithFallback from '../Image/Image'
import {Rating} from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";



export default function SettingsPersonsFeature({getUserValues}) {

      const [windowDimensions, setWindowDimensions] = useState({});
    //   const [category_values_filtered, setCategory_values_filtered] = useState(category_values);
      const [FormError, setFormError] = useState();
    
      useEffect(() => {
       
      }, [])
      const favorite_field = useRef(null);

      const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e, e.target["feature-link"].value)
        let link = e.target["feature-link"].value;
        try{
            new URL(link);
        }catch{
            return setFormError('Invalid URL')
        }
        setFormError('Processing...')
        let UserIndividual = await axios.post(`${window.location.origin}/api/User/PersonAddListMain/`, {link})
        if(UserIndividual.data.error) return setFormError(UserIndividual.data.error)
        setFormError('Link Added')
        favorite_field.current.value = '';
        getUserValues()

    }

    return <div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="space-y-3 shadow-sm">
                <div>
                    <label className="sr-only">
                    Link you were featured in
                    </label>
                    <input 
                    ref={favorite_field}
                    id="feature-link"
                    name="feature-link"
                    type="feature-link"
                    autoComplete="feature-link"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Link you were featured in"
                    />
                </div>
                </div>
                <div className="mt-2 text-center">
                {/* <p className="pb-4 text-sm no-underline text-dim-grey">Password must be at least 6 characters in length</p> */}
                {FormError ? <div className="FormErrorSubmission">{FormError}</div>: null}
                <button 
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-white border border-transparent text-med bg-dark-blue group" 
                    >
                    Add Feature
                </button>
                </div>
            </form>
        </div>

  }


