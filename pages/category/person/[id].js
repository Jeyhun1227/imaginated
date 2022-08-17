import React, { useEffect, useState, useRef } from "react";
import {useRouter} from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import {LOAD_INDIVIDUAL_PAGE} from '../../../GraphQL/Queries/Individual';
import client from '../../../components/GraphQL';
import {Select, MenuItem, Rating} from '@mui/material';
import { Listbox, Transition } from '@headlessui/react'
import { Bookmark, ExclamationCircle, ShareFill, Dot, PatchCheckFill, HourglassBottom, PersonXFill, ChevronDown } from 'react-bootstrap-icons';


export default function IndividualPageMain({Individual_values, premium_offers, free_offers, reviews, favorites}) {
  
  const router = useRouter();
  const previousRoute = () => {
    router.back()
  }

  const [urlType, seturlType] = useState();

  React.useEffect(() => {
    let href_hash = window.location.href;
    let href_value = (href_hash.split("#").length > 1) ? href_hash.split("#")[1].toLowerCase() : null;
    seturlType(href_value);
    // setreviewAll(reviews);
  }, []);  
  
  let chanUrlType = (type) => {
    history.replaceState(undefined, undefined, '#'+ type)
    seturlType(type)
  }

  const headerSection = useRef(null);
  const aboutSection = useRef(null);
  const offeringsSection = useRef(null);
  const reviewsSection = useRef(null);
  const favoritesSection = useRef(null);

  const sectionRefs = [
    { section: "about", ref: aboutSection },
    { section: "offerings", ref: offeringsSection },
    { section: "reviews", ref: reviewsSection },
    { section: "favorites", ref: favoritesSection },
  ];

  const handleClick = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop-50,
      behavior: 'smooth',
    });
  };

  const [visibleSection, setVisibleSection] = useState();

  const getDimensions = ele => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;
    return {
      height,
      offsetTop,
      offsetBottom,
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerSection.current);
      const scrollPosition = window.scrollY + headerHeight;
      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });
      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } 
      else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  let feature = Individual_values.feature? Individual_values.feature.split('||'): [];
  let at_types = ['twitter', 'instagram', 'tiktok']
  let images = {'youtube': ['/Youtube.svg', 'YouTube'], 'twitter': ['/Twitter.svg', 'Twitter'], 
  'instagram': ['/Instagram.svg', 'Instagram'],
  'slack': ['/Slack.svg', 'Slack'],
  'facebook': ['/Facebook.svg', 'Facebook'],
  'tiktok': ['/Tiktok.svg', 'TikTok'],
  'linkedin': ['/Linkedin.svg', 'Linkedin'],
  'discord': ['/Discord.svg', 'Discord'],
  }
  let free_offers_array = Object.keys(free_offers).map((key) => {
    let o_val = free_offers[key].split('/')
    let images_name = images[key]
    let name = (o_val[o_val.length - 1] === '' || o_val[o_val.length - 1] === 'feature')? o_val[o_val.length - 2] : o_val[o_val.length - 1];
    name = (at_types.includes(key))? '@' + name: name;
    return {name, link: free_offers[key], type: key, images_name}
  })
  free_offers_array = free_offers_array.filter((e) => e.link != '' && e.name !== "IndividualFreeOffers")
  let premium_offers_types = {}
  premium_offers.map((e) =>{
    let val_type = (e.type) ? e.type : "Other";
    (premium_offers_types[val_type]) ? premium_offers_types[val_type].push(e): premium_offers_types[val_type]= [e];
  })

  let favorites_offers = {}
  favorites.map((e) =>{
    let val_type = (e.category) ? e.category : "Other";
    let linkName = new URL(e.link).hostname;
    (favorites_offers[val_type]) ? favorites_offers[val_type].push({...e, linkName}): favorites_offers[val_type]= [{...e, linkName}];
  })

  let reviews_free = {1: "YouTube", 2: "Facebook", 3: "Twitter", 4:"TikTok", 5: "Instagram", 6: "Linkedin", 7: "Slack", 8: "Discord"}
  let count_each_rating = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
  let reviews_category = []
  reviews = reviews.map((e) => { 
    let date = new Date(parseInt(e.createdate))
    let createDate_Val = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate() + ', '  +date.getFullYear()
    let premium_name_value = (e.type === 'Paid')? e.premium_name: reviews_free[e.premium_offer];
    count_each_rating[e.review] += 1
    if(!reviews_category.includes(premium_name_value))
      reviews_category.push(premium_name_value)
    return {...e, createDate_Val, premium_name_value}
  })

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

  const [showMoreSubcategory, setShowMoreSubcategory] = useState({itemsToShow: 3, expanded: false});
  
  const showMore = () => {
    showMoreSubcategory.itemsToShow === 3 ? (
      setShowMoreSubcategory({ itemsToShow: Individual_values.subcategory.length, expanded: true })
    ) : (
      setShowMoreSubcategory({ itemsToShow: 3, expanded: false })
    )
  }

  const [showMoreReview, setShowMoreReview] = useState({itemsToShow: 3, expanded: false});
  
  const reviewShowMore = () => {
    showMoreReview.itemsToShow === 3 ? (
      setShowMoreReview({ itemsToShow: reviews.length, expanded: true })
    ) : (
      setShowMoreReview({ itemsToShow: 3, expanded: false })
    )
  }

  const select = [
    {
      id: 1,
      name: 'YouTube Channel'
    },
    {
      id: 2,
      name: 'Facebook Page'
    },
    {
      id: 3,
      name: 'Udemy'
    },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const [selected, setSelected] = useState(select[0])

  return <div className= "mx-auto max-w-7xl">
        <main className="pt-2 px-2 mt-2.5">
          <div className="flex flex-row flex-wrap space-x-3">
            <a href="/" className="inline-flex items-center justify-center">  
              <img className="content-center h-4" src='/home.svg'/>
            </a>
            <div className="inline-flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 fill-very-light-grey" viewBox="0 0 20 20" fill="very-light-grey" stroke="#CECECE" strokeWidth="1">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <a onClick={previousRoute} className="inline-block ml-2 no-underline text-whisper" >Category</a>
            <div className="inline-flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 fill-very-light-grey" viewBox="0 0 20 20" fill="very-light-grey" stroke="#CECECE" strokeWidth="1">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="inline-block ml-2.5 text-dark-blue font-semibold">Profile</div>
          </div>
          <div className="grid items-center grid-cols-4 mb-6 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-y-6 justify-items-start">
            <div className="self-start mt-6">
              <img src={Individual_values.imagelink} className={styles.IndividualImage}/>
            </div>
            <div className="col-span-1 mt-6 space-y-3 md:mt-0 sm:col-span-2 md:col-span-6 lg:col-span-9 grid-row-4">  
              <div className="flex flex-row space-x-3 flex-nowrap"> 
                <h2  className="font-semibold md:text-3xl text:xl md:pt-7">{Individual_values.first_name + ' ' + Individual_values.last_name} </h2>
                <div className="inline-flex items-center justify-center pl-3 md:pt-7"> 
                  <ShareFill className="w-3.5 h-3.5 fill-dark-blue"/>
                </div> 
              </div>
              <div className="flex space-x-3 sm:flex-row sm:flex-wrap">
                <Rating name={Individual_values.first_name + Individual_values.last_name} value={parseFloat(Individual_values.avg)} precision={0.5} sx={{
                          color: "yellow",
                          borderRadius: '10px',
                          '& .MuiSvgIcon-root': {
                            fill: '#F8DC81',
                          },
                          '& .css-dqr9h-MuiRating-label': {
                          display: 'block'
                          }                        
                        }} readOnly/>
                <div className={styles.inline_block}>{Individual_values.avg}</div>
                <div className={styles.inline_block}>({Individual_values.count})</div>
              </div>
              <div className="hidden space-y-3 sm:space-x-3 md:flex">
                {Individual_values.subcategory.slice(0, showMoreSubcategory.itemsToShow).map((e) => <a href={'/category/' + Individual_values.category + '/' + e} key={e} className="flex items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</a>)}
                <div onClick={showMore} className={`items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke ${Individual_values.subcategory.length - showMoreSubcategory.itemsToShow <= 0 ? "hidden" : 0}`}>+{Individual_values.subcategory.length - showMoreSubcategory.itemsToShow} more</div>
              </div>
              <div className="hidden md:flex">
                <Link href="/claim-listing">
                  <button className="inline-flex items-center px-2 py-1 underline text-dark-blue bg-light-grey">
                    <ExclamationCircle className="w-3.5 h-3.5 mr-2 "/>
                    Claim Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="block col-span-5 md:hidden">
              <div className="flex flex-wrap space-y-3 md:hidden sm:space-x-3">
              {Individual_values.subcategory.slice(0, showMoreSubcategory.itemsToShow).map((e) => <a href={'/category/' + Individual_values.category + '/' + e} key={e} className="flex items-center justify-center px-1 py-1 mt-2 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</a>)}
                <div onClick={showMore} className={`flex items-center justify-center px-1 py-1 mt-2 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke ${Individual_values.subcategory.length - showMoreSubcategory.itemsToShow <= 0 ? "hidden" : 0}`}>+{Individual_values.subcategory.length - showMoreSubcategory.itemsToShow} more</div>
              </div>
              <div className="flex mt-4 md:hidden">
                <Link href="/claim-listing">
                  <button className="inline-flex items-center px-2 py-1 underline text-dark-blue bg-light-grey">
                    <ExclamationCircle className="w-3.5 h-3.5 mr-2 "/>
                    Claim Profile
                  </button>
                </Link>
              </div>
            </div>  
            <div className="col-span-4 sm:col-span-5 md:col-span-2 lg:col-span-2 md:ml-auto">
              <div className="flex space-y-3 md:flex-col md:justify-end"> 
                <button className="px-3 py-2 mr-3 text-sm text-center text-white truncate md:mr-0 bg-dark-blue ">Write a review</button>
                <button className="flex items-center justify-center px-3 py-2 my-auto text-center bg-white md:inline-flex" href={'#'}>
                  <Bookmark className="mr-2 fill-dark-blue"/>
                  <span className={`${styles.TextInline} text-dark-blue truncate text-sm`}>Save this profile</span>
                </button>
              </div>
            </div>
          </div>
          <div ref={headerSection} className="sticky top-0 z-50 flex flex-row space-x-3 bg-white border-b flex-nowrap border-very-light-grey">
            <div>
              <div  onClick={(e) => {handleClick(aboutSection); chanUrlType('');}} className={`cursor-pointer inline-block mt-3.5 pb-3.5 ${visibleSection === "about" ? "mr-8 md:mr-12 border-b border-black" : "md:mr-12 mr-8" }`}>
                About
              </div>
              <div  onClick={(e) => {handleClick(offeringsSection); chanUrlType('offerings');}} className={`cursor-pointer inline-block mt-3.5 pb-3.5 ${visibleSection === "offerings" ? "mr-8 md:mr-12 border-b border-black" : "md:mr-12 mr-8" }`}>
                Offerings
              </div>
              <div  onClick={(e) => {handleClick(favoritesSection); chanUrlType('favorites');}} className={`cursor-pointer inline-block mt-3.5 pb-3.5 ${visibleSection === "favorites" ? "mr-8 md:mr-12 border-b border-black" : "md:mr-12 mr-8" }`}>
                Favorites
              </div>
              <div  onClick={(e) => {handleClick(reviewsSection); chanUrlType('reviews');}} className={`cursor-pointer inline-block mt-3.5 pb-3.5 ${visibleSection === "reviews" ? "mr-8 md:mr-12 border-b border-black" : "md:mr-12 mr-8" }`}>
                Reviews
              </div>
            </div>
          </div>
          {/* <div className={(!urlType) ? "my-8" : "hidden"}> */}
          <div className={"my-10"} ref={aboutSection}>
            <div className="pb-12 border-b border-very-light-grey">
              <h2>Who is {Individual_values.first_name + ' ' + Individual_values.last_name}?</h2>
              <div className="">
                <div className="text-dim-grey">{Individual_values.description}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 my-12">
              <div className="">
                <h2>Featured In</h2>
                <ul className="pl-0.5 list-outside">{feature.map((url) => 
                  <li className="" key={url}>
                    <Dot className="inline-flex items-center justify-center fill-dim-grey"/>
                    <a  href={url} className="pl-1 no-underline text-dim-grey">{new URL(url).hostname}</a>
                  </li>)}
                </ul>
              </div>
              <div className="">
                <h2>Contact Details</h2>
                  {(Individual_values.company)?<div className="pl-2 text-dim-grey"><img className="inline-flex items-center justify-center pr-2 mb-1 flex-nowrap" src={'/company.svg'}/> {Individual_values.company}</div>:null}
                  {(Individual_values.location)?<div className="pl-2 text-dim-grey"><img className="inline-flex items-center justify-center pr-2 mb-1 flex-nowrap" src={'/location.svg'}/> Located in {Individual_values.location}</div>:null}
                  {(Individual_values.founder)?<div className="pl-2 text-dim-grey"><img className="inline-flex items-center justify-center pr-2 mb-1 flex-nowrap" src={'/founded.svg'}/> Founded in {Individual_values.founder}</div>:null}
                  {(Individual_values.link)?<div className="flex pl-2 text-dim-grey"><img className="inline-flex flex-nowrap self-start md:content-center md:items-center justify-center pt-1.5 pr-2 mb-1" src={'/link.svg'}/><a href={Individual_values.link} className="flex-initial overflow-hidden no-underline break-words text-dim-grey" > {Individual_values.link}</a></div>:null}
              </div>
            </div>
          </div>
          {/* <div className={(urlType === 'offerings')? null: styles.displayNone}> */}
          <div className={"my-10"} ref={offeringsSection}>
            <div className="pt-12 pb-2 mx-0 border-b sm:mx-4 MainOfferingValue border-very-light-grey">
              <h3>Free Offerings</h3>
            </div>
            <div className="grid grid-cols-2 pt-4 pb-3 mx-0 border-b sm:mx-4 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 border-very-light-grey">
              {free_offers_array.map((e) => <a key={e.name} href={e.link} className="inline-block mr-2 py-.5 px-1 no-underline font-normal sm:text-2xl text-xl text-denim">
              <div className="flex flex-row space-x-2"><img src={e.images_name[0]}/> <div className="text-sm text-dim-grey ">{e.images_name[1]}</div></div>
              {e.name}
              </a>)}
            </div>
            <div>{Object.keys(premium_offers_types).map((key) => <div className="py-12 mx-0 border-b sm:mx-4 last:border-b-0 border-very-light-grey" key={key}>
              <div className="flex justify-between pb-3">
                <h3 className="">{key}</h3>
                <button className="px-4 text-sm text-center text-white truncate bg-dark-blue">View all {key} Presets</button>
              </div>
              <div className="grid grid-cols-2 mt-6 justify-items-center gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
              {premium_offers_types[key].map((value) => <div key={value.name} className="">
                  <img src={value.imagelink? value.imagelink: "/No-image.png"} className="w-48 h-40 sm:w-64 sm:h-56"   onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="/No-image.png";
                  }} />
                    <div className="pt-3 text-lg text-denim">{value.name}</div>
                    <div className="flex flex-row flex-wrap items-center space-x-2">
                      <Rating name={value.name} value={parseFloat(value.avg)} precision={0.5} size="small" sx={{
                            color: "yellow",
                            borderRadius: '10px',
                            '& .MuiSvgIcon-root': {
                              fill: '#F8DC81',
                            },
                            '& .css-dqr9h-MuiRating-label': {
                            display: 'block'
                            }                        
                          }} readOnly/>
                      <div className="text-denim">{value.avg}</div>
                      <div className="text-denim">({value.count})</div>
                    </div>
                  <div className="w-48 text-sm text-dim-grey">{value.description}</div>
                </div>)}
                </div>
              </div>)}
            </div>
          </div>
          {/* <div className={(urlType === 'favorites')? null: styles.displayNone}> */}
          <div className={"my-8"} ref={favoritesSection}>
          {Object.keys(favorites_offers).map((key) => <div className="py-12 mx-0 border-b sm:mx-4 last:border-b-0 border-very-light-grey" key={key}>
              <h3 className="pb-3">{key}</h3>
              <div className="grid grid-cols-2 mt-6 justify-items-center gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
              {favorites_offers[key].map((value) => <div key={value.name} className="flex flex-col space-y-3">
                  <img src={value.imagelink? value.imagelink: "/No-image.png"} className="w-48 h-40 sm:w-64 sm:h-56"   onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="/No-image.png";
                  }} />
                    <div className="text-lg text-black ">{value.name}</div>
                    <div className="w-48 text-sm text-dim-grey">{value.description}</div>
                    <div className="pt-2">
                      <a href={value.link} className="px-2 py-2 text-xs text-center text-white no-underline truncate sm:px-4 sm:py-2 sm:text-sm bg-dark-blue" target="_blank">See Price {value.linkName}</a>
                    </div>
                </div>)}
                </div>
              </div>)}
          </div>
          {/* <div className={(urlType === 'reviews')? "my-8" : "hidden" }> */}
          <div className={"my-10"} ref={reviewsSection}>
            <div>
              <form action="#" method="POST">
                <div className="p-4 bg-light-grey">
                  <h5 className="mb-4 font-bold">Student Ratings</h5>
                  <div className="flex flex-col gap-3 md:gap-8 md:flex-row">
                    <div className="md:w-1/2">
                      <div className="mb-4">
                        {/* <label htmlFor="source" className="block pb-2.5 text-sm font-medium text-black">
                          What offering would you like to review?
                        </label> */}
                        <Listbox value={selected} onChange={setSelected}>
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block pb-2.5 text-sm font-medium text-black">What offering would you like to review?</Listbox.Label>
                              <div className="relative mt-1">
                                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border cursor-default border-very-light-grey focus:outline-none focus:ring-1 focus:ring-denim focus:border-denim sm:text-sm">
                                  <span className="flex items-center">
                                    <span className="block ml-3 truncate text-trolley-grey">{selected.name}</span>
                                  </span>
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 ml-3 pointer-events-none">
                                    <ChevronDown className="w-3 h-3 text-black" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 w-full pl-0 mt-1 overflow-auto text-base bg-white max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {select.map((source) => (
                                      <Listbox.Option
                                        key={source.id}
                                        className={({ active }) =>
                                          classNames(
                                            active ? 'text-white bg-whisper' : 'text-black',
                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                          )
                                        }
                                        value={source}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex items-center">
                                              <span
                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'text-trolley-grey ml-3 block truncate')}
                                              >
                                                {source.name}
                                              </span>
                                            </div>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active ? 'text-white' : 'text-indigo-600',
                                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                                )}
                                              >
                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                              </span>
                                            ) : null}
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
                        {/* <select
                          id="source"
                          name="source"
                          autoComplete="source-name"
                          className="block w-full px-3 py-2 mt-1 bg-white border border-very-light-grey text-trolley-grey sm:text-sm"
                        >
                          <option>YouTube Channel</option>
                          <option>Facebook Page</option>
                          <option>Udemy</option>
                        </select> */}
                      </div>
                      <div>
                        <label htmlFor="about" className="pb-2.5 block text-sm font-medium text-gray-700">
                          How has this offering benefited you?
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={6}
                            className="block w-full px-3 py-2 mt-1 border border-very-light-grey sm:text-sm"
                            placeholder="Enter here"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2.5 md:w-1/2">
                      <div className="mb-3 md:mb-4">
                        <label htmlFor="source" className="pb-2.5 block text-sm font-medium text-black">
                          Your rating of this offering?
                        </label>
                        <Rating
                          name="Form Review"
                          defaultValue={0}
                          precision={0.5}
                          sx={{
                          color: "yellow",
                          '& .MuiSvgIcon-root': {
                            fill: '#F8DC81'
                          },
                          '& .css-dqr9h-MuiRating-label': {
                          display: 'block'
                          }
                        }}
                        />
                      </div>
                      <div>
                        <label htmlFor="about" className="pb-2.5 block text-sm font-medium text-gray-700">
                          What do you think could be better?
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={6}
                            className="block w-full px-3 py-2 mt-1 border shadow-sm border-very-light-grey sm:text-sm"
                            placeholder="Enter here"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-3 text-left ">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent bg-dark-blue"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="md:w-1/2">
                  <h5 className="mb-6 font-bold">Student Ratings</h5>
                  <div className="flex flex-row">
                    <div className="flex flex-col items-center justify-center w-1/4 mx-auto">
                      <h1 className="font-bold">{Individual_values.avg}</h1>
                      <Rating className="text-base md:text-2xl" name={Individual_values.first_name + Individual_values.last_name} value={parseFloat(Individual_values.avg)} precision={0.5} sx={{
                          color: "yellow",
                          borderRadius: '10px',
                          '& .MuiSvgIcon-root': {
                            fill: '#F8DC81',
                          },
                          '& .css-dqr9h-MuiRating-label': {
                          display: 'block'
                          }                        
                        }} readOnly/>
                      <div className="pt-2">{Individual_values.count} Reviews</div>
                    </div>
                    <div className="flex flex-col w-3/4 pl-12">
                        {Object.keys(count_each_rating).reverse().map((e) => <div key={e} className="flex flex-row items-center">
                          <div className="w-full h-2 rounded-full bg-white-smoke">
                            <div style={{width: Math.round((count_each_rating[e] / reviews.length) * 100) + '%'}} className="h-2 rounded-full bg-saffron"></div>
                          </div>
                            <div className="flex flex-row-reverse pl-3">
                              <div className="pl-1">{e}</div>
                              <img src='/star.svg'/>
                            </div>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                    <h5 className="mb-6 font-bold">Categories</h5>
                    <div className="flex flex-row flex-wrap">
                      {reviews_category.map((e) => <div key={e} className={`mr-4 mb-6 truncate flex items-center justify-center px-2.5 py-2 text-center text-black cursor-pointer border border-gainsboro ${(reviewClickedValue === e)? " bg-white-smoke " : ""}`} onClick={()=> reviewClicked(e)}>{e}</div>)}
                    </div>
                </div>
              </div>
              <div className="my-6">
                <h5 className="font-bold ">Reviews</h5>
                {reviewAll.slice(0, showMoreReview.itemsToShow).map((rev) =><div key={rev.id} className="py-6 border-b border-gainsboro">
                  <div className="flex flex-row">
                    <div className="pr-4">
                      <img className={styles.IndividualReviewImg} src={rev.imagelink? rev.imagelink: "/user.png"}/>
                    </div>
                    <div className="">
                      <div className="mb-2 font-semibold">{rev.name}</div>
                      <div className="flex flex-row space-x-4">
                        {(rev.validation === 'Y')? <div className="inline-flex items-center justify-center space-x-2"><PatchCheckFill className="w-3.5 h-3.5 fill-sea-green"/><div className="truncate">Validated Review</div></div> : <div className="inline-flex items-center justify-center space-x-2"><HourglassBottom className="w-3.5 h-3.5 fill-silver"/><div className="truncate">Pending Validated</div></div>}
                        {(rev.verified === 'Y')? <div className="inline-flex items-center justify-center space-x-2"><PatchCheckFill className="w-3.5 h-3.5 fill-sea-green"/><div className="truncate">Verified User</div></div> : <div className="inline-flex items-center justify-center space-x-2"><PersonXFill className="w-3.5 h-3.5 fill-silver"/><div className="truncate">Unverified User</div></div>}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap mt-4 mb-2">
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
                  <h4 className="font-semibold">"{rev.title}"</h4>
                  <div className="pb-2 mt-4 font-semibold">How has this benefited you?</div>
                  <div>{rev.like}</div>
                  <div className="pb-2 mt-4 font-semibold">What do you think could be better?</div>
                  <div>{rev.dislike}</div>
                </div> )}
                <div className="border-t-2 -mt-0.5 border-white">
                  <div className="flex mr-auto truncate lg:w-2/12">
                    <div onClick={reviewShowMore} className={`items-center justify-center px-4 py-1.5 text-center text-green-vogue cursor-pointer border-1 border-green-vogue ${reviews.length - showMoreReview.itemsToShow <= 0 ? "hidden" : 0}`}>Load More Review</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={(urlType === 'reviews')? "my-8" : "hidden" }>
            <div>
              <div className={styles.DisplayInlineBlock}>
                <h4>Ratings</h4>
                <div className={styles.DisplayInlineBlock}>
                  <h3>{Individual_values.avg}</h3>
                  <Rating name={Individual_values.first_name + Individual_values.last_name} value={parseFloat(Individual_values.avg)} precision={0.5} readOnly/>
                  <div>{Individual_values.count} Reviews</div>
                </div>
                <div className={styles.DisplayInlineBlock}>
                    {Object.keys(count_each_rating).reverse().map((e) => <div key={e}>
                      <div className={styles.IndividualReviewEachMain}>
                        <div style={{width: Math.round((count_each_rating[e] / reviews.length) * 100) + '%'}} className={styles.IndividualReviewEach}></div>
                      </div>
                        <div className={styles.DisplayInlineBlock}>
                        <div className={styles.DisplayInlineBlock}>{e}</div>
                        <img src='/star.svg'/>
                        </div>
                      </div>
                  )}
                </div>
              </div>
              <div className={styles.DisplayInlineBlock}>
                  <h4>Offerings</h4>
                  <div>
                    {reviews_category.map((e) => <div key={e} className={(reviewClickedValue === e)? styles.IndividualReviewOfferingsSelected : styles.IndividualReviewOfferings} onClick={()=> reviewClicked(e)}>{e}</div>)}
                  </div>
              </div>
              {reviewAll.map((rev) =><div key={rev.id} className={styles.IndividualReviewMain}>
                <div>
                <div className={styles.IndividualReviewInlineBlock}>
                  <img className={styles.IndividualReviewImg} src={rev.imagelink? rev.imagelink: "/user.png"}/>
                </div>
                <div className={styles.IndividualReviewInlineBlock}>
                  <div className={styles.IndividualReviewName}>{rev.name}</div>
                  <div className={styles.IndividualReviewValidation}>
                  {(rev.validation === 'Y')? <div className={styles.DisplayInlineBlock}>Validated Review</div>: null}
                  {(rev.verified === 'Y')? <div className={styles.DisplayInlineBlock}>Verified User</div>: null}
                  </div>
                </div>
                </div>
                <Rating name={rev.name} value={parseFloat(rev.review)} precision={0.5} readOnly/>
                <div>{rev.createDate_Val}</div>
                <div>{rev.premium_name_value}</div>
                <h4>{rev.title}</h4>
                <div>{rev.like}</div>
                <div>{rev.dislike}</div>
              </div> )}
            </div>
          </div> */}
        </main>
    </div>

}

export async function getServerSideProps({query}){
    const IndividualID = query.id
    const Individual_values = await client.query({query:LOAD_INDIVIDUAL_PAGE, variables: { linkname: IndividualID }})
    let free_offers = Individual_values.data.getEachIndividual.free_offers;
    if(free_offers.length > 0) 
      free_offers = free_offers[0] 
    return {
      props: {
        Individual_values: Individual_values.data.getEachIndividual.rows[0],
        premium_offers: Individual_values.data.getEachIndividual.premium_offers,
        reviews: Individual_values.data.getEachIndividual.reviews,
        free_offers,
        favorites: Individual_values.data.getEachIndividual.favorites,
        IndividualID
      }
    }
}