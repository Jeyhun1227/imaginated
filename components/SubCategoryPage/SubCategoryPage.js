import React, { useEffect, useState } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import {Rating} from '@mui/material';
import styles from  '../../styles/Home.module.css';
import Link from 'next/link';
import axios from 'axios';
import ImageWithFallback from '../Image/Image'
import { useSession } from "next-auth/react";
import star_mark from '../../public/star-mark.svg';
import staring from '../../public/staring.svg';
import Image from 'next/image';

export default function SubCategoryPageSub({values, selected}) {
    let select = selected ? true: false;
    const {data: session} = useSession()

    useEffect(() => setNotification(selected ? true: false), [selected])
    const [notification, setNotification] = useState(select)
    const setLikeIndividual = async () => {
        setNotification(prevNotification => !prevNotification);
        let id = parseInt(values.id.toLowerCase().split(/[a-z](.*)/s)[0])
        let UserIndividual = await axios.post(`${window.location.origin}/api/User/SetFollower`, {IndividualId: id, addIndividual: !notification, aka: values.aka, name: values.first_name + ' ' + values.last_name, imagelink: values.imagelink, link: values.linkname})

    }

    const get_description = (str, limit=280) => {
        if (str.length <= limit) return str;
        const subString = str.substr(0, limit - 1);
        return subString.substr(0, subString.lastIndexOf(' ')) + '...';
    }

  return (
      <div className="py-6 my-5 border-y border-very-light-grey" >

            <div className="flex flex-row items-center justify-between flex-shrink-0 truncate">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex-shrink-0 pr-2.5 overflow-hidden">
                    <ImageWithFallback src={values.imagelink} className={"w-8 h-8 rounded-full sm:w-10 sm:h-10"} width={40} height={40} fallbackSrc={"/fallbackimage.svg"}  />
                    </div>
                    <div className="">
                        <div className="mb-0 text-sm no-underline sm:text-base md:text-lg text-denim cursor-point inline-block">
                                <Link href={'/directory/person/' + values.linkname}>
                                    {values.first_name + ' ' + values.last_name}
                                </Link>
                        </div>
                        <div className="flex flex-row space-x-0.5 sm:space-x-1 flex-nowrap inline-block-block"> 
                            {(values.aka && values.aka !== '')?<div className="inline-flex items-center justify-center pl-2"> 
                                <span className="text-xs truncate sm:text-sm text-ellipsis text-dim-grey">({values.aka})</span>
                            </div>:null}
                        </div>
                        <div className="flex space-x-0.5 sm:space-x-1.5 items-center sm:flex-row sm:flex-wrap">
                        <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Educator Rating: </div>

                            <Rating name={values.first_name + values.last_name} value={parseFloat(values.avg)} precision={0.5} size="small" sx={{
                                    color: "yellow",
                                    borderRadius: '10px',
                                    '& .MuiSvgIcon-root': {
                                        fill: '#F8DC81',
                                    },
                                    '& .css-dqr9h-MuiRating-label': {
                                    display: 'block'
                                    }                        
                                    }} readOnly/>
                            <div className={`{styles.inline_block} text-denim sm:text-sm text-xs`}>{values.avg}</div>
                            <div className={`{styles.inline_block} text-denim sm:text-sm text-xs`}>({values.count})</div>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0 order-2" onClick={setLikeIndividual}>
                    {(session)? <Image width={25} height={25} className="width-25 cursor-point" src={(notification)? star_mark.src: staring.src }/>:null}
                    {/* <svg onClick={setLikeIndividual} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 22" width="17" height="22">
                        <path id="Layer" fillRule="evenodd" style={{fill: '#f88181', stroke: '#f88181', strokeWidth: '.4'}} className="s0" d={(notification) ?"m14.2 3.6l-1.2 1.2c-0.1 0.1-0.2 0.1-0.3 0l-0.1-0.1c-0.1-0.1-0.1-0.2 0-0.3l1.2-1.2c0.1-0.1 0.2-0.1 0.3 0l0.1 0.1c0.1 0.1 0.1 0.2 0 0.3zm-2.4-1.7q0 0-0.1 0.1-0.2 0.7-0.5 1.3 0 0.1 0 0.1c-0.1 0.1-0.3 0.2-0.4 0.1-0.2 0-0.2-0.2-0.1-0.4q0.3-0.7 0.6-1.4 0 0 0 0 0.1-0.2 0.3-0.1 0.2 0 0.2 0.3zm-3-0.7v1.7c0 0.1-0.1 0.2-0.3 0.2-0.2 0-0.3-0.1-0.3-0.2v-1.7c0-0.1 0.1-0.2 0.3-0.2 0.2 0 0.3 0.1 0.3 0.2zm-3.1 0.5l0.7 1.5c0.1 0.1 0 0.3-0.1 0.3v0.1c-0.2 0-0.3 0-0.4-0.2l-0.7-1.4c-0.1-0.1 0-0.3 0.1-0.3l0.1-0.1c0.1 0 0.2 0 0.3 0.1zm-2.5 1.6l1.2 1.1c0.2 0 0.2 0.2 0.1 0.3l-0.1 0.1c-0.1 0.1-0.2 0.1-0.3 0l-1.3-1c-0.1-0.1-0.1-0.3 0-0.4 0.1-0.2 0.3-0.2 0.4-0.1zm12.6 2.9l-1.5 0.6c-0.2 0.1-0.3 0-0.4-0.1v-0.1c0-0.1 0-0.3 0.1-0.3l1.6-0.6c0.1-0.1 0.2 0 0.3 0.1v0.1c0.1 0.1 0 0.3-0.1 0.3zm-14.4-0.5l1.5 0.6c0.2 0.1 0.2 0.2 0.2 0.3l-0.1 0.1c0 0.1-0.1 0.2-0.3 0.1l-1.5-0.6c-0.1 0-0.2-0.2-0.1-0.3v-0.1c0.1-0.1 0.2-0.2 0.3-0.1zm7 9.5q-1.4 0-2.8 0c-0.3 0-0.4-0.1-0.4-0.4q-0.1-1.9-1-3.5-0.8-1.3-0.6-2.8 0.1-2.2 1.8-3.6c0.7-0.5 1.5-0.9 2.4-1q1.3-0.2 2.5 0.3c0.8 0.3 1.6 0.8 2.1 1.5 0.7 0.9 1 1.9 1 3 0.1 1-0.2 2-0.8 2.9-0.4 0.7-0.7 1.5-0.8 2.3q-0.1 0.5-0.1 0.9c-0.1 0.3-0.2 0.4-0.4 0.4q-1.2 0-2.5 0z" : "m5.7 15.2c-0.4 0-0.5-0.1-0.5-0.4q0-1.8-0.9-3.4-0.8-1.3-0.7-2.9 0.2-2.1 1.8-3.5c0.7-0.6 1.5-0.9 2.4-1q1.3-0.2 2.5 0.2c0.8 0.4 1.6 0.9 2.1 1.6 0.7 0.9 1 1.8 1 2.9 0.1 1.1-0.2 2-0.8 2.9-0.4 0.7-0.7 1.5-0.8 2.4q-0.1 0.4-0.1 0.8c0 0.3-0.2 0.4-0.4 0.4q-1.2 0-2.4 0c-1 0-2.3 0-3.2 0zm5.5-0.6q0-0.2 0.1-0.5c0.1-0.8 0.3-1.6 0.7-2.4 0.2-0.3 0.4-0.6 0.5-0.9 0.4-0.8 0.5-1.7 0.4-2.6q-0.2-1.7-1.5-2.8-1.8-1.5-4-0.9-1.5 0.4-2.4 1.6-0.8 1.1-0.9 2.4c0 0.9 0.1 1.8 0.6 2.5q0.6 1.1 0.9 2.3 0.1 0.7 0.2 1.3z"}/>
                        <path id="Layer" fillRule="evenodd" style={{fill: '#f88181', stroke: '#f88181', strokeWidth: '.4'}}  d="m11.4 16.3h-5.8q-0.1 0-0.2 0 0-0.1 0-0.2 0-0.2 0-0.2 0.1-0.1 0.2-0.1h5.8q0.1 0 0.2 0.1 0 0 0 0.2 0 0.1 0 0.2-0.1 0-0.2 0zm-2.9 0.6h2.4c0.4 0 0.5 0.1 0.5 0.5-0.1 0.4 0 0.8-0.1 1.3-0.2 1.2-1.3 2.2-2.6 2.2-0.4 0-0.9 0-1.3-0.2-1.1-0.3-1.7-1.3-1.8-2.5q0-0.4 0-0.9c0-0.3 0.1-0.4 0.4-0.4q1.3 0 2.5 0zm-2.3 0.6q0 0.4 0 0.8c0 1 0.6 1.8 1.6 2q0.5 0.1 1 0 1.4-0.1 1.9-1.4c0.2-0.4 0.1-0.9 0.1-1.4z"/>
                    </svg> */}
                </div>    
            </div>
            <div className="pt-2 text-dim-grey">
                {get_description(values.description)}
                <div className="pl-1.5 no-underline text-denim cursor-point">
                <Link href={'/directory/person/' + values.linkname}>
                    Learn more about{values.first_name} {values.last_name}
                </Link>
                </div>
            </div>

        </div>
  );

}