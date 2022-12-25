
// import ImageGallery from 'react-image-gallery';
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image'
import { Dot, PatchCheckFill, HourglassBottom, PersonXFill, Pen, HandThumbsUp, HandThumbsUpFill, HandThumbsDown, HandThumbsDownFill } from 'react-bootstrap-icons';
import {Rating} from '@mui/material';
import axios from 'axios';


export default function ReviewsComponent({reviews, IndividualID, ReviewEngagement, session}) {

    
    const [rev, setReview] = useState(reviews);
    const [engagement, setEngagement] = useState(ReviewEngagement ? ReviewEngagement.engagement : 0)
    useEffect(() => {
        setEngagement(ReviewEngagement ? ReviewEngagement.engagement : 0)
      }, [ReviewEngagement]); 
    const EngagementFunc = async (eng) => {
        if(engagement === eng) return;
        setEngagement(eng)
        if(!session) return window.location.href = '/directory/signup/'
        // req.body.Individual, session.id, engagement, re.body.reviewid
        let SendingReviewEngagement = await axios.post(`${window.location.origin}/api/User/AddReviewsEngagement/`, {engagement: eng, reviewid: rev.id, Individual: IndividualID})
        let current_count = rev.engagement ? rev.engagement : 0;
        setReview({...rev, engagement: eng + current_count})
    }

    return <div key={rev.id} className="py-6 border-b border-gainsboro">
    <div className="inline-block">
      <div className="flex flex-row">
        <div className="pr-4">
          <Image className="border-radius-four" src={rev.imagelink? rev.imagelink: "/user.png"} width={55} height={55}/>
        </div>
        <div className="">
          <div className="mb-2 font-semibold">{rev.name}</div>
          <div className="person-grid-col-2 flex-row space-x-4">
            {(rev.validation === 'Y')? <div className="inline-flex items-center justify-center space-x-2"><PatchCheckFill className="w-3.5 h-3.5 fill-sea-green"/><div className="truncate">Validated Review</div></div> : <div className="inline-flex items-center justify-center space-x-2"><HourglassBottom className="w-3.5 h-3.5 fill-silver"/><div className="truncate">Pending Validated</div></div>}
            {(rev.verified === 'Y')? <div className="inline-flex items-center justify-center space-x-2"><PatchCheckFill className="w-3.5 h-3.5 fill-sea-green"/><div className="truncate">Verified User</div></div> : <div className="inline-flex items-center justify-center space-x-2"><PersonXFill className="w-3.5 h-3.5 fill-silver"/><div className="truncate">Unverified User</div></div>}
            {(rev.editable) ? <div className="inline-flex items-center justify-center space-x-2 editable" onClick={() => editvalue(rev.id)}><Pen className="w-3.5 h-3.5 fill-silver"/><div className="truncate">Edit</div></div>:null}
          </div>
        </div>
      </div>
    </div>
    <div className="inline-block float-right">
      <div className="inline-block" >{(engagement === 1)?<HandThumbsUpFill className="width-height-25 color-dark-blue cursor-pointer" onClick={() => EngagementFunc(0)}/>: <HandThumbsUp className="width-height-25 color-dark-blue cursor-pointer" onClick={() => EngagementFunc(1)}/>}</div>
      <div className="inline-block font-size-24 align-bottom padding-left-right-10" >{rev.engagement ? rev.engagement : 0}</div>
      <div className="inline-block" >{(engagement === -1)?<HandThumbsDownFill className="width-height-25 color-dark-orange cursor-pointer" onClick={() => EngagementFunc(0)}/>: <HandThumbsDown className="width-height-25 color-dark-blue cursor-pointer" onClick={() => EngagementFunc(-1)}/>}</div>
    </div>
    <div className="flex flex-row flex-wrap mt-4 mb-2">
      <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Educator Rating: </div>
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
      <div className="inline-flex items-center justify-center px-2.5 "><Dot className="w-5 h-5 fill-dim-grey"/></div>
      <div className="text-dim-grey">{rev.createDate_Val}</div>
      <div className="inline-flex items-center justify-center px-2.5 "><Dot className="w-5 h-5 fill-dim-grey"/></div>
      <div className="text-dim-grey">Review for {rev.premium_name_value}</div>
    </div>
    {/* <h4 className="font-semibold">"{rev.title}"</h4> */}
    <div className="pb-2 mt-4 font-semibold">How has this benefited you?</div>
    <div>{rev.like}</div>
    <div className="pb-2 mt-4 font-semibold">What do you think could be better?</div>
    <div>{rev.dislike}</div>
  </div>
}


