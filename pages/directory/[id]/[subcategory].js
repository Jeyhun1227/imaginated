import React, { useEffect, useState, useRef } from "react";
import {useRouter} from 'next/router';
import Link from 'next/link';
import {CATEOGORIES_PAGE} from '../../../GraphQL/Queries/CategoryPage';
import {LOAD_STATIC_DIRECTORY} from '../../../GraphQL/Queries/StaticPaths';
import client from '../../../components/GraphQL';
import SubCategoryPageSub from '../../../components/SubCategoryPage/SubCategoryPage';
import {Select, MenuItem} from '@mui/material';
import HeroNoBtn from "../../../components/Hero/HeroNoBtn";
import VerticalCallToAction from '../../../components/CallToAction/VerticalCallToAction';
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDown, QuestionCircle } from 'react-bootstrap-icons'
import axios from 'axios';
import { InView } from 'react-intersection-observer';
import Head from 'next/head'


export default function SubCategoryPageMain(props) {
    // const router = useRouter();
    const [userFollow, setUserFollow] = useState([])
    const [user, setUser] = useState();
    const routerID = props.routerID;

    let subcategory = [];
    props.Subcategory_values.map((e) => {
        if(!subcategory.includes(e.subcategory)){
            subcategory.push(e.subcategory)
        }
    })
    
    const getStartedValue = async () => {
      try{
        const getUser = await axios.post(`${window.location.origin}/api/User/GetUser`, {});
        // console.log('getUser: ', getUser);
        setUserFollow(getUser.data.user_follow);
        setUser(getUser.data.user_value);
      }catch(e){
        setUser(false);
      }
    }
    useEffect( () => {
      getStartedValue()
    }, [props]);

    const [searchedValue, setsearchedValue] = useState("");
    const [offset, setOffset] = useState(10);
    const [getNewSubcategoryBool, setGetNewSubcategoryBool] = useState(true);


    const [IndividualEach, setIndividualEach] = useState(props.Subcategory_values);
    const [filterSelect, setfilterSelect] = useState("Most Reviews");
    // const [filterSelect] = ["Sponsored", "Highest Rated", "Most Reviews", "Alphabetical"]
    let searchedValueFunction = (searched) => {
      let temp = searched
      let temp_individual = props.Subcategory_values.filter((e) => (e.first_name.toLowerCase() + ' ' + e.last_name.toLowerCase()).includes(temp))
      setIndividualEach(temp_individual)
      setsearchedValue(temp)
    }
    let filterChange = (filter) => {
      let filterValue = filter.option;
      let value_mapping = {'Most Reviewed': ['count', -1, 1], 'Sponsored': ['id', -1, 1], 'Highest Rated': ['avg', -1, 1], 'Alphabetical': ['first_name', 1, -1]}
      let valuemapped = value_mapping[filterValue]
      let field = valuemapped[0]
      let IndividualEachTemp = props.Subcategory_values.sort((a,b) => {
        let current = a[field]
        let previous = b[field]
        if(current > previous) return valuemapped[1]
        if(current < previous) return valuemapped[2]
        return 0
      })
      // setsearchedValue("")
      setIndividualEach(IndividualEachTemp)
      // setfilterSelect(filterValue)
      setSelected(filter)
    }
    const getNewSubcategory = async () => {
      const Subcategory_values = await client.query({query:CATEOGORIES_PAGE, variables: { categoryName: props.routerID, subcategory: props.subcategoryName, offset}})
      if(Subcategory_values.data.getCategoryPage.rows.length === 0) return setGetNewSubcategoryBool(false);
      setIndividualEach(IndividualEach.concat(Subcategory_values.data.getCategoryPage.rows))

      setOffset(offset += 10)
    }
    const options = [
      {
        id: 1,
        option: 'Most Reviewed',
      },
      {
        id: 2,
        option: 'Highest Rated',
      },
      {
        id: 3,
        option: 'Alphabetical',
      }
    ]
    const [selected, setSelected] = useState(options[0])
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }




    return <div >
      <Head>
        <title>{`Learn ${props.subcategoryName} from Experts | Imaginated`}</title>
        <meta name="description" content={`Learn ${props.subcategoryName} from credible educational creators. Compare reviews and explore their offerings, all on one page.`}/>
        <link rel="canonical" href={`https://www.imaginated.com/directory/${routerID}/Learn-${props.subcategoryName.replace(' ', '-')}/`} />
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
      </Head>
      <HeroNoBtn setLargeTextTop={'Learn ' + props.subcategoryName} setLargeTextBottom={" "} setSmallText={`Learn ${props.subcategoryName} from credible educational creators. Compare reviews and explore their offerings.`}/>
      <div className="">
        <div className="py-12 mx-auto max-w-7xl">
          <div className="sm:grid sm:grid-rows-3 sm:grid-cols-9 sm:gap-4">
            <div className="items-center px-4 sm:px-0 sm:row-span-3 sm:col-span-5 xl:mr-28 sm:mr-16">
              <label htmlFor="search" className="block mb-2 text-2xl sm:text-3xl text-dark-blue">Looking for someone specific?</label>
              <input onChange={(e)=> searchedValueFunction(e.target.value)} type="text" name="categoryName" id="search" className="focus:outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Search for a personal brand"/>
            </div>
            <div className="items-center px-4 sm:px-0 sm:row-span-3 sm:col-span-5 xl:mr-28 sm:mr-16">
              <div>
                {IndividualEach.map((e) => {
                  let id = e.id.toLowerCase().split(/[a-z](.*)/s)[0];
                  return <SubCategoryPageSub key={e.id} values={e} selected={userFollow.find((u) => u.individualid === id)} />
                }
                  )}
              </div>
            </div>
            <div className="items-center px-4 sm:px-0 sm:-mt-14 sm:col-span-4 xl:ml-28 margin-left-16">
              <div className="flex flex-row items-center pb-5 space-x-4 sm:border-b sm:border-very-light-grey">
                <Listbox value={selected} onChange={filterChange}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-xl font-medium whitespace-nowrap text-dark-blue">Sort by:</Listbox.Label>
                      <QuestionCircle className="w-6 h-6 fill-denim"/>
                      <div className="relative w-full mt-1">
                        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <span className="flex items-center">
                            <span className="block ml-3 truncate text-dim-grey">{selected.option}</span>
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 ml-3 pointer-events-none">
                            <ChevronDown className="w-3 h-3 text-very-light-grey" aria-hidden="true" />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 w-full py-1 pl-0 mt-1 overflow-auto text-base bg-white shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((option) => (
                              <Listbox.Option key={option.id} className={({ active }) =>
                              classNames(
                                active ? ' bg-light-grey text-dim-grey' : 'text-dim-grey', 'relative py-2 pl-3 text-dim-grey cursor-default select-none pr-9')}
                                value={option}
                              >
                                {({ selected, active  }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span
                                        className={classNames(selected ? 'bg-white' : 'bg-white', 'ml-3 block truncate')}>
                                        {option.option}
                                      </span>
                                    </div>
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
              </div>
            </div>
            <div className="items-center padding-left-right-15 sm:bg-white sm:px-0 bg-light-grey sm:col-span-4 xl:ml-28 margin-left-16">
              <VerticalCallToAction setBtnText={"Request a Listing"} setLink={"/request-listing"} setLargeTextTop={"Looking for a specific creator but"} setLargeTextBottom={"can't find them? Let us know!"}/>
            </div>
            <div className="items-center px-4 mb-auto sm:px-0 sm:row-span-3 sm:col-span-4 xl:ml-28 margin-left-16">
              <div className="mx-auto mt-4 max-w-7xl">
                  <div className="relative flex items-baseline pb-2 border-b justify-left border-very-light-grey">
                      <div className="pl-2 text-2xl tracking-tight text-dark-blue">Related Categories</div>
                  </div>
              </div>
              {(props.subcategory.length > 0)? props.subcategory.filter((e) => e.subcategory !== props.subcategoryName).slice(0, 5).map((e) =>
              <div key={e.id} className="py-6 border-b border-very-light-grey cursor-point" onClick={() => window.location.href=  `/directory/${e.categoryname}/Learn-${e.subcategory.replace(' ', '-')}`}>
                      <div className="flow-root -my-3 font-twofour">
                          <div className="flex flex-wrap items-center justify-between w-full py-2 mx-auto text-sm bg-white">
                              <div className="flex flex-wrap items-center justify-between">
                                  <Link href={ `/directory/${e.categoryname}/${e.subcategory}` } ><div className="flex pl-2 text-large no-underline text-denim whitespace-nowrap cursor-point" >{e.subcategory}</div></Link>
                              </div>
                              <div className="flex-shrink-0 order-2">
                                  <div className="flex items-center flex-1">
                                      <span className="flex items-center">
                                          <div className="color-none">
                                          <Link href={ `/directory/${e.categoryname}/${e.subcategory}` } >
                                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" stroke="#187BC0" strokeWidth="1">
                                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                              </svg>
                                          </Link>
                                          </div>
                                      </span>   
                                  </div>
                              </div>
                          </div>
                      </div>
              </div>
              ):null}
            </div>
          </div>
        </div>
      </div>
      <InView onChange={(inView, entry) => inView && getNewSubcategoryBool ? getNewSubcategory(inView): null}/>
</div>
}

export async function getStaticProps({params}){
    const routerID = params.id
    const subcategory = params.subcategory.replace('Learn-', '').replace('-', ' ')
    const Subcategory_values = await client.query({query:CATEOGORIES_PAGE, variables: { categoryName: routerID, subcategory, offset: 0}})
// 
    // console.log('category_values.error:', category_values.error)

    // let category_values = {}

    return {
      props: {
        Subcategory_values: Subcategory_values.data.getCategoryPage.rows,
        subcategory: Subcategory_values.data.getCategoryPage.subcategory,
        subcategoryName: subcategory,
        routerID
      },
      revalidate: 1200, // In seconds
    }
}

export async function getStaticPaths() {

  const all_values = await client.query({query:LOAD_STATIC_DIRECTORY, variables: { types: 'subcategory' }})
  const subcategory = all_values.data.getEachStaticPathDirectory.subcategory
  var paths = subcategory.map((parent) => ({params: {id: parent.categoryname, subcategory: 'Learn-' + parent.subcategory.replace(' ', '-')}}))

  return { paths, fallback: false }

}