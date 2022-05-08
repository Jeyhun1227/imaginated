import React, { useEffect, useState } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import {Rating} from '@mui/material';
import styles from  '../../styles/Home.module.css';
import Link from 'next/link';


export default function SubCategoryPageSub({values}) {

  return  <div>
        {/* <h5><Link href={values.category + '/' + values.subcategory} className={styles.CategoryMainTitle} >{values.subcategory}
        </Link>
        </h5> */}
        <div>
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
        </div>
    </div>

}