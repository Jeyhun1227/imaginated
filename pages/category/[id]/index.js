import React, { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';
import Header from '../../../components/NavBars/headers';
import {Container, Row, Col} from 'react-bootstrap';
import {CATEOGORIES_PAGE} from '../../../GraphQL/Queries/CategoryPage';
import client from '../../../components/GraphQL';
import CategoryPageSub from '../../../components/CategoryPage/CategoryPageSub';
import { signIn, signOut, useSession } from "next-auth/react";
import VerticalCallToAction from '../../../components/CallToAction/VerticalCallToAction';
import QASingle from "../../../components/CallToAction/QASingle";
import HeroNoBtn from "../../../components/Hero/HeroNoBtn";

export default function CategoryPageMain(props) {
    // const router = useRouter();
    const routerID = props.routerID;
    let subcategory = [];
    props.category_values.map((e) => {
        if(!subcategory.includes(e.subcategory)){
            subcategory.push(e.subcategory)
        }
    })


    return <div>
      <HeroNoBtn setLargeTextTop={routerID} setLargeTextBottom={" "} setSmallText={`Discover the best ${routerID} to learn from. Compare reviews and explore their offferings.`}/>
      <div className="px-4 bg-white sm:px-0">
        <div className="py-12 mx-auto sm:px-0 max-w-7xl">
          <div className="sm:grid sm:grid-rows-3 sm:grid-cols-9 sm:gap-4">
          <div className="items-center sm:row-span-3 sm:col-span-5 xl:mr-28 sm:mr-16">
            <h2 className="pb-4 text-2xl font-medium tracking-tight sm:text-4xl text-dark-blue">Popular {routerID} Categories</h2>
          </div>
            <div className="items-center sm:row-span-3 sm:col-span-5 xl:mr-28 sm:mr-16">
              <div>
              {subcategory.map((e) => <CategoryPageSub key={e} subcategory={e} category={routerID} values={props.category_values.filter((f) => f.subcategory === e)}/>)}
              </div>
            </div>
            <div className="items-center sm:col-span-4 xl:ml-28 sm:ml-16">
              <VerticalCallToAction/>
            </div>
            <div className="items-center sm:col-span-4 xl:ml-28 sm:ml-16">
              <div className="mx-auto mt-4 max-w-7xl">
                  <div className="relative flex items-baseline pb-2 border-b justify-left border-very-light-grey">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#214151" d="M21.92,6.62a1,1,0,0,0-.54-.54A1,1,0,0,0,21,6H16a1,1,0,0,0,0,2h2.59L13,13.59l-3.29-3.3a1,1,0,0,0-1.42,0l-6,6a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L9,12.41l3.29,3.3a1,1,0,0,0,1.42,0L20,9.41V12a1,1,0,0,0,2,0V7A1,1,0,0,0,21.92,6.62Z"/></svg>
                      <div className="pl-2.5 text-2xl tracking-tight text-dark-blue">{routerID} Categories</div>
                  </div>
              </div>
              {subcategory.map((e) =>
              <div key={e} className="py-6 border-b border-very-light-grey">
                      <h3 className="flow-root -my-3">
                          <div className="flex flex-wrap items-center justify-between w-full py-2 mx-auto text-sm bg-white">
                              <div className="flex flex-wrap items-center justify-between">
                                  <a href={ routerID + '/' + e} className="flex pl-2 text-lg no-underline text-denim whitespace-nowrap">{e}</a>
                              </div>
                              <div className="flex-shrink-0 order-2">
                                  <div className="flex items-center flex-1">
                                      <span className="flex items-center">
                                          <a href={ routerID + '/' + e} className="color-none">
                                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" stroke="#187BC0" strokeWidth="1">
                                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                              </svg>
                                          </a>
                                      </span>   
                                  </div>
                              </div>
                          </div>
                      </h3>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
        {/* <div className={styles.container}>
            <div className={styles.HeaderLocation}>
            <Container className={styles.MainRowNav}>
            <Row>
            <h1  className={styles.MainHeaderName}>{routerID}</h1>
            </Row>
            <Row>
                <div className={styles.MainSubHeaderName}>Discover the best {routerID} to learn from. Compare reviews and explore their offferings.</div>
            </Row>
            </Container>
            </div>
            <Container>
            <Row>
            <Col className={styles.CategoryLeftCol}>
            <div className={styles.BrandTagLine}>Popular {routerID} Category</div>
            <div>
              <div>
                  {subcategory.map((e) => <CategoryPageSub key={e} subcategory={e} category={routerID} values={props.category_values.filter((f) => f.subcategory === e)}/>)}
              </div>
            </div>
            </Col>
            <Col>
              <div>
                <h4>Looking for a category but can’t find it? Let us know!</h4>
                <button className={styles.CategoryPageButton}>Request a Category</button>
                <div>It takes less than 30 seconds</div>
                <h4>{routerID} Categories</h4>
                {subcategory.map((e) => <div key={e}>{e}</div>)}
              </div>
            </Col>
            </Row>
            </Container>
          </div> */}
        </div>
}

export async function getServerSideProps({query}){
    const routerID = query.id

    const category_values = await client.query({query:CATEOGORIES_PAGE, variables: { categoryName: routerID }})
    console.log(category_values.data.getCategoryPage.rows)
    // let category_values = {}

    return {
      props: {
        category_values: category_values.data.getCategoryPage.rows,
        routerID
      }
    }
}