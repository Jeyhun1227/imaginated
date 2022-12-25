import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Dot, ChevronDown, ChevronUp, Pen, Trash } from 'react-bootstrap-icons';
import { Rating} from '@mui/material';
import { Disclosure, Transition } from '@headlessui/react'
import UserReview from '../../Form/UserReview';
import axios from 'axios';

export default function SettingsRatings(props) {
    let reviews = props.reviews ? props.reviews : [];
    let reviews_free = {1: "YouTube", 2: "Facebook", 3: "Twitter", 4:"TikTok", 5: "Instagram", 6: "Linkedin", 7: "Slack", 8: "Discord"}
    let count_each_rating = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    let reviews_category = []
    const [editReview, setEditReview] = useState({});
    const [UserReviewSelect, setUserReviewSelect] = useState({});
    const [deleted, setDeleted] = useState([]);

    React.useEffect(() => {
        reviews = reviews.map((e) => { 
            let date = new Date(e.createdate)
            let createDate_Val = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate() + ', '  +date.getFullYear()
            let premium_name_value = e.premium_name//(e.type === 'Paid')? e.premium_name: reviews_free[e.premium_offer];
            count_each_rating[e.review] += 1
            if(!reviews_category.includes(premium_name_value))
                reviews_category.push(premium_name_value)
                return {...e, createDate_Val, premium_name_value}
        })
      }, [props]);  

    
    const [reviewAll, setreviewAll] = useState(reviews);
    const [reviewClickedValue, setreviewClickedValue] = useState();
  
    const reviewClicked = (clickedType) => {
      if(reviewClickedValue === clickedType){
        setreviewClickedValue(null);
        setreviewAll(reviews)
      }else{
        setreviewClickedValue(clickedType);
        setreviewAll(reviews.filter((r) => r.premium_name_value === clickedType))
      }
    }
    const editReviewFunc = (rev) => {
        setEditReview(rev);
        let id = rev.premium_offer ? rev.premium_offer : rev.premium_name;
        setUserReviewSelect([{name: rev.premium_name, id, type: rev.type}])
    }

    const deleteReviewFunc = async (rev) => {
        if(deleted.includes(rev.id)) return;
        let id = rev.premium_offer ? rev.premium_offer : rev.premium_name;
        let SendingReview = await axios.post(`${window.location.origin}/api/User/ReviewAdded/`, {id, Individual: rev.individual, delete: true, type: rev.type})
        let temp_deleted = deleted
        temp_deleted.push(rev.id)
        setDeleted(temp_deleted);
    }

    const [showMoreReview, setShowMoreReview] = useState({itemsToShow: 3, expanded: false});
    
    const reviewShowMore = () => {
        showMoreReview.itemsToShow === 3 ? (
        setShowMoreReview({ itemsToShow: reviews.length, expanded: true })
        ) : (
        setShowMoreReview({ itemsToShow: 3, expanded: false })
        )
    }

    const editableClose = (UserRating, UserLike, UserDislike) => {
        // console.log(UserRating, UserLike, UserDislike, editReview.id, reviewAll)
        let newreviews = reviewAll.map((rev) => {
            if(editReview.id === rev.id){
                rev.like = UserLike;
                rev.review = UserRating;
                rev.dislike = UserDislike;
            }
            return rev
        })
        // console.log(newreviews)
        setreviewAll(newreviews)
        setUserReviewSelect([])
        setEditReview({})
    }



    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return ( 
        <div className="flex flex-col space-y-6">
            <Disclosure defaultOpen as="div" className="border border-whisper lg:h-full">
            {({ open }) => (
                <>
                <div className="p-3">
                    <Disclosure.Button as="div" className="flex items-center justify-between w-full">
                        <h4 className="mb-0">Your review</h4>
                        <span className="flex items-center">
                        {open ? (
                            <ChevronUp className="w-3 h-3 ml-2 -mr-1" aria-hidden="true" />
                        ) : (
                            <ChevronDown className="w-3 h-3 ml-2 -mr-1" aria-hidden="true" />
                        )}
                        </span>
                    </Disclosure.Button>
                    <Disclosure.Panel as="div" className="mt-1">
                        <div className="flow-root">
                        {(UserReviewSelect.length > 0)? <UserReview IndividualId={editReview.individual} editValues={editReview} editable UserReviewSelect={UserReviewSelect} editableClose={editableClose}/>:null}
                            <ul className="pl-0 divide-y divide-whisper">
                                {reviews.slice(0, showMoreReview.itemsToShow).map((rev) => <li className="flex py-3" key={rev.id}>
                                    <div className="flex flex-col flex-1 space-y-1">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">{rev.createDate_Val}</p>
                                            <div className="inline-flex items-center justify-center px-2.5 "><Dot className="w-5 h-5 fill-dim-grey"/></div>
                                            <p className="mb-0 font-semibold">Review for {rev.first_name + ' ' + rev.last_name}</p>
                                            <div className="inline-flex items-center justify-center px-2.5 "><Dot className="w-5 h-5 fill-dim-grey"/></div>
                                            <p className="mb-0 font-semibold">Offering {rev.premium_name}</p>
                                            <div className="inline-flex items-center justify-center space-x-2 editable2" onClick={() => editReviewFunc(rev)}><Pen className="w-3.5 h-3.5 fill-silver"/><div className="truncate">Edit</div></div>
                                            <div className="inline-flex items-center justify-center space-x-2 editable2" onClick={() => deleteReviewFunc(rev)}><Trash className="w-3.5 h-3.5 fill-silver"/><div className="truncate">Delete</div></div>
                                        </div>
                                        <div>
                                        <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Educator Rating: </div>
                                        <Rating name="name" value={rev.review} precision={0.5} sx={{
                                        color: "yellow",
                                        borderRadius: '10px',
                                        '& .MuiSvgIcon-root': {
                                            fill: '#F8DC81',
                                        },
                                        '& .css-dqr9h-MuiRating-label': {
                                        display: 'block'
                                        }                        
                                        }} readOnly/>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            <p className="mb-0">{rev.like}</p>
                                        </div>
                                        {deleted.includes(rev.id)? <h6>Review submited for deletion!</h6>:null}
                                    </div>
                                </li>)}
                            </ul>
                        </div>
                    <div className="text-left">
                        {(reviews.length > 3 && showMoreReview.itemsToShow === 3)?<button  onClick={reviewShowMore} className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:mr-0">Load more</button>:null}
                    </div>
                    </Disclosure.Panel>
                </div>
                </>)}
            </Disclosure>
            <Disclosure as="div" className="border border-whisper lg:h-full">
            {({ open }) => (
                <>
                <div className="p-3">
                    <Disclosure.Button as="div" className="flex items-center justify-between w-full">
                        <h4 className="mb-0">User ratings for you</h4>
                        <span className="flex items-center">
                        {open ? (
                            <ChevronUp className="w-3 h-3 ml-2 -mr-1" aria-hidden="true" />
                        ) : (
                            <ChevronDown className="w-3 h-3 ml-2 -mr-1" aria-hidden="true" />
                        )}
                        </span>
                    </Disclosure.Button>
                    <Disclosure.Panel as="div" className="mt-1">
                        <div className="flow-root">
                            <ul className="pl-0 divide-y divide-whisper">
                                {reviewAll.slice(0, showMoreReview.itemsToShow).map((rev) =><li className="flex py-3" key={rev.id}>
                                    <div className="flex flex-col flex-1 space-y-1">
                                        <div className="flex flex-row flex-wrap">
                                            <p className="mb-0 font-semibold">{rev.createDate_Val}</p>
                                            <div className="inline-flex items-center justify-center px-2.5 "><Dot className="w-5 h-5 fill-dim-grey"/></div>
                                            <p className="mb-0 font-semibold">Review for {rev.premium_name_value}</p>
                                        </div>
                                        <div>
                                        <Rating name={rev.name} value={parseFloat(rev.review)} precision={0.5} sx={{
                                        color: "yellow",
                                        borderRadius: '10px',
                                        '& .MuiSvgIcon-root': {
                                            fill: '#F8DC81',
                                        },
                                        '& .css-dqr9h-MuiRating-label': {
                                        display: 'block'
                                        }                        
                                        }} readOnly/>
                                        </div>
                                        <div className="flex items-end justify-between flex-1 text-sm">
                                            {/* <p className="mb-0">"{rev.title}"</p> */}
                                        </div>
                                    </div>
                                </li>)}
                            </ul>
                        </div>
                    <div className="text-left">
                        {(reviews.length > 3)? <button onClick={reviewShowMore} className={`px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:mr-0 ${reviews.length - showMoreReview.itemsToShow <= 0 ? "hidden" : 0}`}>Load more</button>:null}
                    </div>
                    </Disclosure.Panel>
                </div>
                </>)}
            </Disclosure>
        </div> 
    );
}
