import React, { useEffect, useState } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import {Rating} from '@mui/material';
import styles from  '../../styles/Home.module.css';
import Link from 'next/link';


export default function CategoryPageSub(props) {

  return  <div>
        <h5><Link href={props.category + '/' + props.subcategory} className={styles.CategoryMainTitle} >{props.subcategory}
        </Link>
        </h5>
        <div>
            <div className={styles.CategoryEachContainer}>
                {props.values.map((e) => <div>
                    {/* <div className={styles.CategoryImageDiv}>
                        <img src={e.imagelink} className={styles.CategoryImage}/>
                    </div> */}
                    <Col className={styles.displayInlineWidth40}><img src={e.imagelink} className={styles.CategoryImage}/></Col>
                    <div className={styles.CategoryEachMainContainer}><Col>
                    <div>
                    <div className={styles.inlin_block_margin_right}>{e.first_name}</div>
                    <div className={styles.inline_block}>{e.last_name}</div>
                    {(e.aka && e.aka !== '')?<div className={styles.inlin_block_margin_left}>A.K.A {e.aka}</div>:null}
                    </div>
                    <Rating name={e.first_name + e.last_name} defaultValue={parseInt(e.avg)} precision={0.5} readOnly/>
                    <div className={styles.inline_block}>{e.avg}</div>
                    <div className={styles.inline_block}>({e.count})</div></Col></div>
                </div>)}
            </div>
        </div>
    </div>

}