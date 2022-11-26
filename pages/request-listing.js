import React, { useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import personUsingComputer from '../public/request-category/person-using-computer.png'
import { ChevronDown, PatchCheckFill } from 'react-bootstrap-icons';
import client from '../components/GraphQL';
import { LOAD_CATEGORIES } from "../GraphQL/Queries/Admin";
import { useQuery, gql, ApolloProvider } from "@apollo/client";
import Link from 'next/link';
import axios from 'axios';


export default function RequestListing(props) {

    const select = [

        {
        id: 1,
        name: 'Yes'
        },
        {
        id: 2,
        name: 'No'
        },
    ]
    const [submited, setSubmited] = useState(false);

    const SubmitListing = async (e) => {
        if(submited) return;
        
        e.preventDefault();
        setSubmited(true);
        // listing, selected: selected.name, category: selectedCategory.category
        let you = selected.name === 'Yes' ? true : false;
        try{
            let addListing = await axios.post('/api/User/addListing/', {listing, you, category: selectedCategory.category})

        }catch(error){
            if (error.response) {
                // Request made and server responded
                setError("Please Sign up/Login to submit your request")
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }

        window.location.href = "/directory"

    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [selected, setSelected] = useState(select[0]);
    const [listing, setListing] = useState(select[0]);
    const [Errors, setError] = useState("");

    const selectCategory = [
        
        {
        id: 1,
        name: 'Photography'
        },
        {
        id: 2,
        name: 'Programing'
        },
    ]

    const [selectedCategory, setSelectedCategory] = useState()
    
    
    const [CategoryValues, setCategoryValues] = useState([]);
    useEffect(() => {
        let temp_object_category = {};
        let temp_category = []

        setCategoryValues(temp_object_category);
    }, [props.category]);

    
    return (
        <div>
            <div className="bg-white xl:px-0">
                <div className="w-full bg-white">
                    <div className="px-4 sm:px-0">
                        <div className="max-w-5xl py-6 mx-auto sm:py-12 sm:mx-0">
                            <div className="md:mt-10 sm:mt-0">
                                <div className="md:grid md:grid-cols-7 md:gap-6">
                                    <div className="md:col-span-4 md:mt-10 sm:mt-0">
                                        <div className="px-0 py-0 sm:p-6">
                                            <div className="flex flex-col-reverse items-center px-4 space-y-8 md:items-start md:flex-col sm:px-0">
                                                <div>   
                                                    <h3 className="text-large font-semibold leading-6 md:text-left text-dark-blue md:text-xl">Can&apos;t find a category on the directory that you think should be here?</h3>
                                                    <div>
                                                        <h3 className='mb-3 text-large text-left text-dark-blue md:text-xl'>Requirements to get listed</h3>
                                                        <div className='flex flex-col space-y-4'>
                                                            <div className='flex flex-row items-center space-x-3'>
                                                                <PatchCheckFill />
                                                                <p className='mb-0'>Create high quality <span className='mb-0 font-semibold'>educational</span> content</p>
                                                            </div>
                                                            <div className='flex flex-row items-center space-x-3'>
                                                                <PatchCheckFill/>
                                                                <p className='mb-0'>Be active on one or more digital channels</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div className=''>
                                                    <Image className="object-cover object-center sm:justify-center" 
                                                    src={personUsingComputer}
                                                    layout="intrinsic"
                                                    alt="Person Using Computer"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-3">
                                        <form onSubmit={SubmitListing}>
                                            <div className="overflow-hidden">
                                                <div className="px-4 py-4 bg-light-grey sm:p-6">
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6">
                                                            <h4 className='mb-4'>Request a listing</h4>
                                                            <label htmlFor="street-address" className="block mb-2 text-sm font-medium">
                                                                Name of the creator you would like to be listed                                                            
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="request-category"
                                                                autoComplete=""
                                                                onChange={(e) => setListing(e.target.value)}
                                                                placeholder="Enter here"
                                                                className="items-center justify-start order-1 block w-full px-2 py-2 text-sm text-gray-900 border text-ellipsis border-very-light-grey focus:outline-none"
                                                            />
                                                            <Listbox value={selected} onChange={setSelected}>
                                                            {({ open }) => (
                                                                <>
                                                                <Listbox.Label className="block pb-2 mt-6 text-sm font-medium text-black">Is this person you?</Listbox.Label>
                                                                <div className="relative mt-1">
                                                                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border cursor-default border-very-light-grey focus:outline-none focus:ring-1 focus:ring-denim focus:border-denim sm:text-sm">
                                                                    <span className="flex items-center">
                                                                        <span className="block text-black truncate">{selected.name}</span>
                                                                    </span>
                                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 ml-3 pointer-events-none">
                                                                        <ChevronDown className="w-3 h-3 text-black" aria-hidden="true" />
                                                                    </span>
                                                                    </Listbox.Button>

                                                                    <Transition
                                                                    show={open}
                                                                    leave="transition ease-in duration-100"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                    >
                                                                    <Listbox.Options className="absolute z-10 w-full pl-0 mt-1 overflow-auto text-base bg-white max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                        {select.map((source) => (
                                                                        <Listbox.Option
                                                                            key={source.id}
                                                                            className={({ active }) =>
                                                                            classNames(
                                                                                active ? 'text-white bg-whisper' : 'text-black',
                                                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                            )
                                                                            }
                                                                            value={source}
                                                                        >
                                                                            {({ selected, active }) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                                <span
                                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'text-trolley-grey ml-3 block truncate')}
                                                                                >
                                                                                    {source.name}
                                                                                </span>
                                                                                </div>
                                                                                {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                    active ? 'text-white' : 'text-black',
                                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                    )}
                                                                                >
                                                                                    {/* <CheckIcon className="w-5 h-5" aria-hidden="true" /> */}
                                                                                </span>
                                                                                ) : null}
                                                                            </>
                                                                            )}
                                                                        </Listbox.Option>
                                                                        ))}
                                                                    </Listbox.Options>
                                                                    </Transition>
                                                                </div>
                                                                </>
                                                            )}
                                                            </Listbox>
                                                            <ApolloProvider client={client}>
                                                                <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                                                                {({ open }) => (
                                                                    <>
                                                                    <Listbox.Label className="block pb-2 mt-6 text-sm font-medium text-black">What category would this person be listed under ?</Listbox.Label>
                                                                    <div className="relative mt-1">
                                                                        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border cursor-default border-very-light-grey focus:outline-none focus:ring-1 focus:ring-denim focus:border-denim sm:text-sm">
                                                                        <span className="flex items-center">
                                                                            <span className="block truncate text-trolley-grey">{selectedCategory ? selectedCategory.category : 'Choose'}</span>
                                                                        </span>
                                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 ml-3 pointer-events-none">
                                                                            <ChevronDown className="w-3 h-3 text-black" aria-hidden="true" />
                                                                        </span>
                                                                        </Listbox.Button>

                                                                        <Transition
                                                                        show={open}
                                                                        leave="transition ease-in duration-100"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                        >
                                                                        <Listbox.Options className="absolute z-10 w-full pl-0 mt-1 overflow-auto text-base bg-white max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                            {props.category.getAllCategory.rows.map((source,index) => (
                                                                            <Listbox.Option
                                                                                key={source.id}
                                                                                className={({ active }) =>
                                                                                classNames(
                                                                                    active ? 'text-white bg-whisper' : 'text-black',
                                                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                                )
                                                                                }
                                                                                value={source}
                                                                            >
                                                                                {({ selectedCategory, active }) => (
                                                                                <>
                                                                                    <div className="flex items-center">
                                                                                    <span
                                                                                        className={classNames(selectedCategory ? 'font-semibold' : 'font-normal', 'text-trolley-grey ml-3 block truncate')}
                                                                                    >
                                                                                        {source.category}
                                                                                    </span>
                                                                                    </div>
                                                                                    {selectedCategory ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                        )}
                                                                                    >
                                                                                        {/* <CheckIcon className="w-5 h-5" aria-hidden="true" /> */}
                                                                                    </span>
                                                                                    ) : null}
                                                                                </>
                                                                                )}
                                                                            </Listbox.Option>
                                                                            ))}
                                                                        </Listbox.Options>
                                                                        </Transition>
                                                                    </div>
                                                                    </>
                                                                )}
                                                                </Listbox>
                                                            </ApolloProvider>
                                                            <p className="block mt-2 text-sm font-medium">Are you looking to be listed? <div className='font-semibold text-dark-blue'><Link href="/request-category" >Request a category</Link></div> after submitting this request</p>
                                                            <div className="py-3 text-left ">
                                                                <button
                                                                className="inline-flex justify-center px-8 py-2 text-sm font-medium text-white border border-transparent sm:px-10 bg-dark-blue"
                                                                >
                                                                Submit
                                                                </button>
                                                                <div>{Errors}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
    )}

    export async function getServerSideProps(){
        const { data } = await client.query({query:LOAD_CATEGORIES})
        // const { data } = useQuery(LOAD_CATEGORIES);
        // const load_subCategories = useQuery(LOAD_SUBCATEGORIES);
        // const load_subCategories = await client.query({query: LOAD_SUBCATEGORIES})
        return {
          props: {
            // subcategory: load_subCategories.data,
            category: data
          }
        }
    }