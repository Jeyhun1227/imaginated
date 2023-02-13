import React, { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import Link from 'next/link';
import {CATEOGORIES_PAGE} from '../../../GraphQL/Queries/CategoryPage';
import {LOAD_STATIC_DIRECTORY} from '../../../GraphQL/Queries/StaticPaths';
import client from '../../../components/GraphQL';
import CategoryPageSub from '../../../components/CategoryPage/CategoryPageSub';
import VerticalCallToAction from '../../../components/CallToAction/VerticalCallToAction';
import HeroNoBtn from "../../../components/Hero/HeroNoBtn";
import Head from 'next/head'

export default function CategoryPageMain(props) {
    const routerID = props.routerID;
    let subcategory = [];
    props.category_values.map((e) => {
        if(!subcategory.includes(e.subcategory)){
            subcategory.push(e.subcategory)
        }
    })


    return (
        <div>
          <Head>
            <title>{`Learn ${routerID} from Experts | Imaginated`}</title>
            <meta name="description" content={`Learn ${routerID} from credible educational creators. Compare reviews and explore their offerings, all on one page.`}/>
            <link rel="canonical" href={`https://www.imaginated.com/directory/${routerID}/`} />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
          </Head>
          <HeroNoBtn setLargeTextTop={'Learn ' + routerID} setLargeTextBottom={" "} setSmallText={`Learn ${routerID} from credible educational creators. Compare reviews and explore their offerings.`}/>
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
                          <div className="pl-2 text-2xl tracking-tight text-dark-blue">{routerID} Categories</div>
                      </div>
                  </div>
                  {subcategory.slice(0, 5).map((e) =>
                  <div key={e} className="py-6 border-b border-very-light-grey">
                          <h3 className="flow-root -my-3">
                              <div className="flex flex-wrap items-center justify-between w-full py-2 mx-auto text-sm bg-white">
                                  <div className="flex flex-wrap items-center justify-between">
                                      <Link href={ `${routerID}/Learn-${e.replace(' ', '-')}/`} legacyBehavior><div className="flex pl-2 text-large no-underline text-denim whitespace-nowrap cursor-point">{e}</div></Link>
                                  </div>
                                  <div className="flex-shrink-0 order-2">
                                      <div className="flex items-center flex-1">
                                          <span className="flex items-center">
                                              <div className="color-none">
                                              <Link href={ routerID + '/' + e} legacyBehavior>
                                                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" stroke="#187BC0" strokeWidth="1">
                                                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                  </svg>
                                              </Link>
                                              </div>
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
          
            </div>
    );
}

export async function getStaticProps({params}){
    const routerID = params.id

    const category_values = await client.query({query:CATEOGORIES_PAGE, variables: { categoryName: routerID }})
    // console.log(category_values.data.getCategoryPage.rows)
    // let category_values = {}

    return {
      props: {
        category_values: category_values.data.getCategoryPage.rows,
        routerID
      },
      revalidate: 1200, // In seconds
    }
}

export async function getStaticPaths() {
  const all_values = await client.query({query:LOAD_STATIC_DIRECTORY, variables: { types: 'category' }})
  const category = all_values.data.getEachStaticPathDirectory.category
  var paths = category.map((parent) => ({params: {id: parent}}))


  return { paths, fallback: false }

}