import ImageWithFallback from '../Image/Image'
import {Rating} from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Select from "react-dropdown-select";
import client from '../GraphQL';
import {LOAD_SUBCATEGORIES} from '../../GraphQL/Queries/Admin'
const yup = require('yup');


export default function SettingsPersonsFavorite({category, getUserValues}) {

    const [imageUpload, setImageUpload] = useState();
    const [subcategory, setSubcategory] = useState([]);
    const [options, setOptions] = useState();
    const [FormError, setFormError] = useState();
    const [FormSubmit, setFormSubmit] = useState(false);
    const title_field = useRef(null);
    const link_field = useRef(null);
    const type_field = useRef(null);
    const description_field = useRef(null);


    const getSubcategoryFunc = async () => {
        const load_subCategories = await client.query({query: LOAD_SUBCATEGORIES})
        const values = load_subCategories.data.getAllSubCategory.rows.filter((e) => e.categoryname === category).map((e) => ({id: e.id, value: e.subcategory, label: e.subcategory}))
        setOptions(values)
    }
      useEffect(() => {
        getSubcategoryFunc()
      }, [])

      const handleSubmit = async (e) => {
        e.preventDefault();
        let name = e.target['Title'].value;
        let description = e.target['description'].value;
        let link = e.target['link'].value;
        let type = e.target['type'].value;

        const schema = yup.object().shape({
            name: yup
              .string()
              .min(6, 'Title must be longer than 6 characters')
              .max(150, 'Max title length is 150 characters'),
            description: yup
              .string()
              .min(6, 'Description must be longer than 6 characters')
              .max(1000, 'Max title length is 1000 characters'),
            link: yup
              .string()
              .min(6, 'Link must be longer than 6 characters')
              .max(250, 'Max Link length is 250 characters'),
            type: yup
              .string()
              .min(3, 'Type field must be longer than 3 characters')
              .max(150, 'Max Type field length is 150 characters'),
        }); 
        try {
            await schema.validate({name, description, link, type}, { abortEarly: true });
        } catch (err) {
            return setFormError(err.errors[0]);
        }

        try{
            new URL(link);
        }catch{
            return setFormError('Invalid URL')
        }

        if(subcategory.length === 0) return setFormError('Select a category')
        if(!imageUpload) return setFormError('Upload image for offer')
        if(['favorite', 'free', 'feature'].includes(type)) return setFormError('Type field cannot be favorite or free')
        let sub_joined = subcategory.map(e => e.value).join(' || ');
        let formDataVal = new FormData();
        formDataVal.append('Image', imageUpload);
        formDataVal.append('name', name);
        formDataVal.append('description', description);
        formDataVal.append('link', link);
        formDataVal.append('subcategory', sub_joined);
        formDataVal.append('type', type);


        if(FormSubmit) return;
        setFormSubmit(true)
        try{
            setFormError('Processing...')
            let SendingForm = await axios.post(`${window.location.origin}/api/User/PersonAddList/`, formDataVal)
            if(SendingForm.data.error) return setFormError(SendingForm.data.error)
            setImageUpload()
            title_field.current.value = ''
            link_field.current.value = ''
            type_field.current.value = ''
            description_field.current.value = ''
            setFormError('Offering Added')
            setSubcategory([])
            getUserValues()
        }catch(e){
            setFormError(e)
            setFormSubmit(false)
        }

      }

      const hiddenFileInput = useRef(null);

      const handleChange = (event) => {
        let fileUploaded = event.target.files[0];
        setImageUpload(fileUploaded); 
        };

        const handleClick = event => {
            hiddenFileInput.current.click();
        };


    return <div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="space-y-3 shadow-sm">
                <div className="flex flex-row space-x-3">
                    <div className="w-full">
                    <label htmlFor="fname" className="sr-only">
                        Title
                    </label>
                    <input
                        id="Title"
                        name="tname"
                        type="text"
                        autoComplete="given-name"
                        required
                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Premium offering Title"
                        ref={title_field}
                    />
                    </div>
                    <div className="w-full">
                    <label htmlFor="lname" className="sr-only">
                    Subcategory
                    </label>
                    <Select options={options} onChange={(values) => setSubcategory(values)} values={subcategory} multi placeholder={'Category'}/>
                    </div>
                </div>
                <div className="flex flex-row space-x-3">
                    <div className="w-full">
                    <label htmlFor="fname" className="sr-only">
                        Link
                    </label>
                    <input
                        id="link"
                        name="tname"
                        type="text"
                        autoComplete="given-name"
                        required
                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Link"
                        ref={link_field}
                    />
                    </div>
                    <div className="w-full">
                    <label htmlFor="lname" className="sr-only">
                    type
                    </label>
                    <input
                    id="type"
                    name="type"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Product type i.e. e-book, preset, video..."
                    ref={type_field}
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="link" className="sr-only">
                    Short Description
                    </label>
                    <input
                    id="description"
                    name="description"
                    type="text"
                    autoComplete="description"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Short Description"
                    ref={description_field}
                    />
                </div>
                </div>
                <div className="py-6 sm:py-12">
                    <div className="flex flex-col py-3 text-center ">
                        <label className="pb-1 mb-0 text-sm text-dim-grey">Upload Premium Offerings Image</label>
                        <input className="sr-only" type="file" name="file" 
                        accept=".jpg,.png,.pdf"
                        ref={hiddenFileInput} 
                        onChange={handleChange}/>
                        <div
                        className="inline-flex justify-center w-full py-2 mx-auto text-sm font-semibold border border-transparent text-dim-grey sm:w-1/4 sm:px-16 bg-whisper cursor-pointer"
                        onClick={handleClick}
                        >
                        {!imageUpload ? "Choose File" : "Update File"}
                        </div>
                        <p className="pt-1 mb-0 text-sm text-dim-grey">{!imageUpload ? "No File Chosen" : imageUpload.name}</p>
                    </div>
                </div>
                <div className="mt-2 text-center">
                {FormError ? <div className="FormErrorSubmission">{FormError}</div>: null}
                <button 
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-white border border-transparent text-med bg-dark-blue group" 
                    >
                    Add Premium Offering
                </button>
                </div>
            </form>
        </div>

  }


