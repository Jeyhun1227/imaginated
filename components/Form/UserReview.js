import { Bookmark, ExclamationCircle, ShareFill, Dot, PatchCheckFill, HourglassBottom, PersonXFill, ChevronDown, Pen } from 'react-bootstrap-icons';
import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Listbox, Transition } from '@headlessui/react'
import {Select, MenuItem, Rating} from '@mui/material';

export default function UserReview({IndividualId, editable, editValues, UserReviewSelect, editableClose}) {
    const [UserRating, setUserRating] = useState(0);
    const [UserDislike, setUserDislike] = useState();
    const [UserLike, setUserLike] = useState();
    const [selected, setSelected] = useState()
    const [UserReviewError, setUserReviewError] = useState();
    const [UserReviewSelectComp, setUserReviewSelectComp] = useState([])

    useEffect(() => {
        if(editable){
            setUserDislike(editValues.dislike);
            setUserRating(editValues.review)
            setUserLike(editValues.like)
        }
      }, [editValues]);  
    useEffect(() => {
        if(UserReviewSelect) {
            setUserReviewSelectComp(UserReviewSelect)
            setSelected(UserReviewSelect[0])

        }
    }, [UserReviewSelect])

  
    const SubmittedReview = async (e) => {
      e.preventDefault();
      if(!UserRating) return setUserReviewError('Please provide a rating for your review!')
      if(!UserDislike) return setUserReviewError('Please provide your thoughts on how this course could have been better');
      if(!UserLike) return setUserReviewError('Please provide your thoughts on how has this offering benefited you?');
      if(UserDislike.split(' ').length < 10) return setUserReviewError('Please provide a longer description of your thoughts on how this course could have been better (minimum 10 words)')
      if(UserLike.split(' ').length < 10) return setUserReviewError('Please provide a longer description of your thoughts on how has this offering benefited you (minimum 10 words)');
      let premium_offer = selected.type === 'Paid' ? selected.id : null;
      let free_offer = selected.type === 'Free' ? selected.id.charAt(0).toUpperCase() + selected.id.slice(1) : null;
      let SendingReview = await axios.post(`${window.location.origin}/api/User/ReviewAdded/`, {UserRating, UserDislike: UserDislike.trim(), UserLike: UserLike.trim(), type: selected.type, selected: selected.name, Individual: IndividualId, premium_offer, free_offer, editable})
      if(SendingReview.data.error) return setUserReviewError(SendingReview.data.error);
      if(editable) return editableClose(UserRating, UserLike, UserDislike);
      setUserRating(0)
      setUserDislike('')
      setUserLike('')
      setSelected(UserReviewSelect[0])
      if(!SendingReview.data.verified) return setUserReviewError('Your review has not been posted yet! To post it you must first confirm your email address.');
      setUserReviewError('Review Submitted!');

      
    }
    
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return <form>
        <div className="p-4 bg-light-grey">
        <h5 className="mb-4 font-bold">Leave a review on their offerings</h5>
        <div className="flex flex-col gap-3 md:gap-8 md:flex-row">
            <div className="md:w-1/2">
            <div className="mb-4">
                <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <>
                    <Listbox.Label className="block pb-2.5 text-sm font-medium text-black">What offering would you like to review?</Listbox.Label>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border cursor-default border-very-light-grey focus:outline-none focus:ring-1 focus:ring-denim focus:border-denim sm:text-sm">
                        <span className="flex items-center">
                            <span className="block ml-3 truncate text-trolley-grey">{selected ? selected.name : null}</span>
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
                        <Listbox.Options className="absolute z-10 w-full pl-0 mt-1 overflow-auto text-base bg-white max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" >
                            {UserReviewSelectComp.map((source) => (
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
                {/* <select
                id="source"
                name="source"
                autoComplete="source-name"
                className="block w-full px-3 py-2 mt-1 bg-white border border-very-light-grey text-trolley-grey sm:text-sm"
                >
                <option>YouTube Channel</option>
                <option>Facebook Page</option>
                <option>Udemy</option>
                </select> */}
            </div>
            <div>
                <label htmlFor="about" className="pb-2.5 block text-sm font-medium text-gray-700">
                How has this offering benefited you?
                </label>
                <div className="mt-1">
                <textarea
                    id="about"
                    name="about"
                    rows={6}
                    className="block w-full px-3 py-2 mt-1 border border-very-light-grey sm:text-sm"
                    placeholder="Enter here"
                    onChange={(e) => setUserLike(e.target.value)}
                    defaultValue={''}
                    value={UserLike}
                />
                </div>
            </div>
            </div>
            <div className="mt-2.5 md:w-1/2">
            <div className="margin-bottom-15 md:mb-4">
                <label htmlFor="source" className="pb-2.5 block text-sm font-medium text-black">
                Your rating of this offering?
                </label>
                <div className="inline-block vertical-align-top padding-right-5 font-weight-500 font-size-14">Offering Rating: </div>
                <Rating
                name="Form Review"
                defaultValue={0}
                precision={0.5}
                value={UserRating}
                onChange={(event, newValue) => {
                    setUserRating(newValue);
                }}
                sx={{
                color: "yellow",
                '& .MuiSvgIcon-root': {
                    fill: '#F8DC81'
                },
                '& .css-dqr9h-MuiRating-label': {
                display: 'block'
                }
                }}
                />
            </div>
            <div>
                <label htmlFor="about" className="pb-2.5 block text-sm font-medium text-gray-700">
                What do you think could be better?
                </label>
                <div className="mt-1">
                <textarea
                    id="about"
                    name="about"
                    rows={6}
                    className="block w-full px-3 py-2 mt-1 border shadow-sm border-very-light-grey sm:text-sm"
                    placeholder="Enter here"
                    onChange={(e) => setUserDislike(e.target.value)}
                    value={UserDislike}
                    defaultValue={''}
                />
                </div>
            </div>
            </div>
        </div>
        <div className="py-3 text-left ">
            <button
            onClick={SubmittedReview}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent bg-dark-blue"
            >
            {(editable)? "Update Review": "Submit Review"}
            </button>
            {(UserReviewError)?<div>{UserReviewError}</div>:null}
        </div>
        </div>
    </form>

    }