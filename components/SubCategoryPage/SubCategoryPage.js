import React, { useEffect, useState } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import {Rating} from '@mui/material';
import styles from  '../../styles/Home.module.css';
import Link from 'next/link';


export default function SubCategoryPageSub({values}) {

  return  <div className="py-6 my-5 border-y border-very-light-grey">

        <div className="flex flex-row items-center flex-shrink-0 truncate">
            <div className="flex-shrink-0 pr-2.5 overflow-hidden">
                <img src={values.imagelink} className="w-8 h-8 rounded-full sm:w-10 sm:h-10"/>
            </div>
            <div className="">
                <div className="flex flex-row space-x-0.5 sm:space-x-1 flex-nowrap"> 
                    <a href={'/category/person/' + values.linkname}  className="mb-0 text-sm no-underline truncate sm:text-base md:text-lg text-denim">{values.first_name + ' ' + values.last_name} </a>
                    {(values.aka && values.aka !== '')?<div className="inline-flex items-center justify-center pl-2"> 
                        <span className="text-xs truncate sm:text-sm text-ellipsis text-dim-grey">A.K.A {values.aka}</span>
                    </div>:null}
                </div>
                <div className="flex space-x-0.5 sm:space-x-1.5 items-center sm:flex-row sm:flex-wrap">
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
        <div className="pt-2 text-dim-grey">
            {values.description}
            <a className="pl-1.5 no-underline text-denim" href={'/category/person/' + values.linkname}>
                Learn more about {values.first_name} {values.last_name}
            </a>
        </div>
        {/* <h5><Link href={values.category + '/' + values.subcategory} className={styles.CategoryMainTitle} >{values.subcategory}
        </Link>
        </h5> */}
        {/* <div>
            <div className={styles.CategoryEachContainer}>
                <div>
                    <Col className={styles.displayInlineWidth40}><img src={values.imagelink} className={styles.CategoryImage}/></Col>
                    <div className={styles.CategoryEachMainContainer}><Col>
                    <div>
                    <Link href={'/category/person/' + values.linkname}><div>
                    <div className={styles.inlin_block_margin_right}>{values.first_name}</div>
                    <div className={styles.inline_block}>{values.last_name}</div>
                    {(values.aka && values.aka !== '')?<div className={styles.inlin_block_margin_left}>A.K.A {values.aka}</div>:null}
                    </div>
                    </Link>
                    </div>
                    <Rating name={values.first_name + values.last_name} value={parseFloat(values.avg)} precision={0.5} readOnly/>
                    <div className={styles.inline_block}>{values.avg}</div>
                    <div className={styles.inline_block}>({values.count})</div></Col></div>
                    <div>{values.description}</div>
                </div>
            </div>
        </div> */}
    </div>

}