import React, { useEffect, useState } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import {Rating} from '@mui/material';
import styles from  '../../styles/Home.module.css';
import Link from 'next/link';


export default function CategoryPageSub(props) {

  return  <div className="mb-8">
        <div className="relative flex items-baseline justify-between pb-3 border-b border-very-light-grey">
            <a href={props.category + '/' + props.subcategory} className="text-2xl font-medium tracking-tight no-underline text-dark-blue">{props.subcategory}</a>
        </div>
        <div className="py-6 border-b border-very-light-grey">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {props.values.map((e) => <div className="flex flex-row items-center flex-shrink-0 overflow-hidden">
                    <div className="flex-shrink-0 pr-2.5 overflow-hidden">
                        <img src={e.imagelink} className="w-10 h-10 rounded-full"/>
                    </div>
                    <div className="">
                        <div className="flex flex-row space-x-1 flex-nowrap"> 
                            <h2  className="mb-0 truncate md:text-base text-denim">{e.first_name + ' ' + e.last_name} </h2>
                            <div className="inline-flex items-center justify-center pl-3"> 
                                <span className="truncate text-ellipsis">A.K.A {e.aka}</span>
                            </div> 
                        </div>
                        <div className="flex space-x-1.5 sm:flex-row sm:flex-wrap">
                            <Rating name={e.first_name + e.last_name} value={parseFloat(e.avg)} precision={0.5} sx={{
                                    color: "yellow",
                                    borderRadius: '10px',
                                    '& .MuiSvgIcon-root': {
                                        fill: '#F8DC81',
                                    },
                                    '& .css-dqr9h-MuiRating-label': {
                                    display: 'block'
                                    }                        
                                    }} readOnly/>
                            <div className={`{styles.inline_block} text-denim`}>{e.avg}</div>
                            <div className={`{styles.inline_block} text-denim`}>({e.count})</div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </div>

}