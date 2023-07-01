import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import {LOAD_INDIVIDUAL_PAGE} from '../GraphQL/Queries/Individual';
import {LOAD_STATIC_DIRECTORY} from '../GraphQL/Queries/StaticPaths';
import client from '../components/GraphQL';
import {Rating} from '@mui/material';
import { Bookmark, ExclamationCircle, ShareFill, Dot, ChevronDown, PatchCheckFill, HourglassBottom, PersonXFill, X, Check, Pen } from 'react-bootstrap-icons';
import { signIn, useSession, getSession} from "next-auth/react";
import UserReview from '../components/Form/UserReview';
import axios from 'axios';
import home from '../public/home.svg'
import star from '../public/star.svg'
import No_image from '../public/No-image.png'
import Company_Image from '../public/company.svg'
import Location_Image from '../public/location.svg'
import Founded_image from '../public/founded.svg'
import Link_image from '../public/link.svg'
import ImageWithFallback from '../components/Image/Image'
import { Transition, Listbox  } from '@headlessui/react';
import Head from 'next/head';
import Image from 'next/image';
import SettingsPersonsFavorite from '../components/SettingsPersons/SettingsPersonsFavorite'
import SettingsPersonsFeature from '../components/SettingsPersons/SettingsPersonsFeature'
import SettingsPersonsPremium from '../components/SettingsPersons/SettingsPersonsPremium'
import Stripe_logo from '../public/logos/stripe.png'
// import SettingsPersonsVideos from '../components/SettingsPersons/SettingsPersonsVideos'

export default function IndividualPageMain({Individual_values, premium_offers, free_offers, free_content, favorites}) {
  const {data: session} = useSession()
  let at_types = ['twitter', 'instagram']
  let images = {'youtube': ['/Youtube.svg', 'YouTube'], 'twitter': ['/Twitter.svg', 'Twitter'], 
  'instagram': ['/Instagram.svg', 'Instagram'],
  'slack': ['/Slack.svg', 'Slack'],
  'facebook': ['/Facebook.svg', 'Facebook'],
  'tiktok': ['/Tiktok.svg', 'TikTok'],
  'linkedin': ['/Linkedin.svg', 'Linkedin'],
  'discord': ['/Discord.svg', 'Discord'],
  }

  const getCleanVariables = (main_values, unmerged) => {
    let dis_id = [...new Set(unmerged.map(e => e.id))]
    let filtered = main_values.filter((e) => !dis_id.includes(e.id))
    let cleaned_values = filtered.concat(unmerged)
    return cleaned_values
  }

  const setupValuesFunc = (values) => {
    let temp_values = allIndividualValues;
    values.map((e) => {
      temp_values[e.category] = e.description
      temp_values[`status_${e.category}`] = e.status
    })
    setAllIndividualValuesFixed(temp_values)
    setAllIndividualValues(temp_values)
  }

  const setupFreeFunc = (values) => {
    let temp_free_offers = freeOfferFunc();
    let temp_get_list_offers = Object.keys(images).map((type) => {
      let found_free_content = temp_free_offers.find((e) => e.type === type)
      let name = found_free_content && found_free_content.name ? found_free_content.name : '';
      let found_value = values.find((e) => e.category === images[type][1])
      let status = null;
      if(found_value){
        name = found_value.name;
        status = found_value.status
      }
      return {image: images[type], name, status}
    })
    setFree_offers_list_values(temp_get_list_offers)
    setFree_offers_list_values_fixed(temp_get_list_offers)

  }
  
  const getUserValues = async () => {
    const getUnapproved = await axios.post(`${window.location.origin}/api/User/PersonGetList/`, {Individual: Individual_values.id});
    let rows = getUnapproved.data.rows
    let info = rows.filter((e) => e.record_type === 'info')
    let free_values = rows.filter((e) => e.record_type === 'free')

    let favorite_unmerged = rows.filter((e) => e.record_type === 'favorite')
    let premium_unmerged = rows.filter((e) => e.record_type === 'paid')
    let feature_unmerged = rows.filter((e) => e.record_type === 'feature')
    // console.log('feature_unmerged: ', feature_unmerged.map((e) => e.link)
    feature_unmerged = feature_unmerged.map((e) => e.link)
    let feature_temp = Individual_values.feature? Individual_values.feature.split('||'): [];
    let favorite_value = getCleanVariables(favorites, favorite_unmerged) 
    let premium_offers_value = getCleanVariables(premium_offers, premium_unmerged) 
    let feature_value = feature_temp.concat(feature_unmerged)
    setupFreeFunc(free_values)
    setupValuesFunc(info)
    favoritesFunc(favorite_value)
    premiumFunc(premium_offers_value)
    setFeature(feature_value)
    // console.log('getUnapproved: ', rows)
  }

  const DeleteValueFavorite = async (delete_value, record_type) => {
    let main_id = delete_value.id;
    if(typeof main_id === 'string'){
      main_id = parseInt(delete_value.id.replace('USER_', ''))
      const deleteValue = await axios.post(`${window.location.origin}/api/User/PersonDeleteList/`, {id: main_id});
      if(record_type === 'paid'){
        let temp_premium_offers_types = premium_offers_types;
        temp_premium_offers_types[delete_value.type] = temp_premium_offers_types[delete_value.type].map((e) => {
          if(e.id === delete_value.id){
            return {...e, status: 'In Review Deletion'}
          }
          return e
        })
        setpremium_offers_types(temp_premium_offers_types)
      }else{
        let temp_favorites_offers = favorites_offers;
        temp_favorites_offers[delete_value.category] = temp_favorites_offers[delete_value.category].map((e) => {
          if(e.id === delete_value.id){
            return {...e, status: 'In Review Deletion'}
          }
          return e
        })
        setfavorites_offers(temp_favorites_offers)
      }
    }else{
      const deleteValue = await axios.post(`${window.location.origin}/api/User/PersonDeleteList/`, {id: main_id});
      getUserValues()
    }    

  }

  const SubmitChanges = async () => {
    if(submitted) return;
    const getUnapproved = await axios.post(`${window.location.origin}/api/User/PersonAddSubmit/`, {});
    setSubmitted(true);

  }

  const FreeSaveChanges = async () => {
    let check_values = ["first_name", "last_name", "aka", "company", "location", "founder", "link", "description"]
    let main_changes = {}
    let found_ind = check_values.filter((e) =>{
      if(allIndividualValues[e] !== allIndividualValuesFixed[e]){
        main_changes[e] = allIndividualValues[e]
      }
    })
    // console.log('main_changes: ', main_changes)
    let free_offer_main = free_offers_list_values.filter((e) => e.changed)
    if(free_offer_main.length > 0 || found_ind){
    const setFreeOffering = await axios.post(`${window.location.origin}/api/User/PersonAddListMain/`, {Individual: Individual_values.id, free_offer_main, main_changes});
    }
    setAllIndividualValuesFixed(allIndividualValues)
    setFree_offers_list_values(free_offers_list_values.map((e) => ({...e, changed: false})))

  }

  const changeNeeded = () => {
    let check_values = ["first_name", "last_name", "aka", "company", "location", "founder", "link", "description"]
    let found_ind = check_values.find((e) =>{
      if(allIndividualValues[e] !== allIndividualValuesFixed[e]){
        return true
      }
    })
    if(found_ind) return true;
    let free_offer_main = free_offers_list_values.find((e) => e.changed)
    if(free_offer_main) return true;
    return false

  }

  const featureFunc = (feature_value) => {
    let feature_temp = feature_value.split('||');
    setFeature(feature_temp)
  }

  const premiumFunc = (premium_offers_value) => {  
    let premium_offers_types_temp = {}
    premium_offers_value.map((e) =>{
      let val_type = (e.type) ? e.type : "Other";
      (premium_offers_types_temp[val_type]) ? premium_offers_types_temp[val_type].push(e): premium_offers_types_temp[val_type]= [e];
    })
    setpremium_offers_types(premium_offers_types_temp)

  }

  const favoritesFunc = (favorites_val) => {
    let temp_favorites_offers = {}
    favorites_val.map((e) =>{
      let val_type = (e.category) ? e.category : "Other";
      let linkName = new URL(e.link).hostname;
      (temp_favorites_offers[val_type]) ? temp_favorites_offers[val_type].push({...e, linkName}): temp_favorites_offers[val_type]= [{...e, linkName}];
    });
    setfavorites_offers(temp_favorites_offers)

  }

  const freeOfferFunc = () => {
    let temp_free_offers_array = Object.keys(free_offers).map((key) => {
      if(!free_offers[key]) return {link: '', name: "IndividualFreeOffers"};
      let o_val = free_offers[key].split('/')
      let images_name = images[key]
      let name = (o_val[o_val.length - 1] === '' || o_val[o_val.length - 1] === 'feature')? o_val[o_val.length - 2] : o_val[o_val.length - 1];
      // name = (at_types.includes(key))? '@' + name: name;
      return {name, link: free_offers[key], type: key, images_name}
    })
    temp_free_offers_array = temp_free_offers_array.filter((e) => e.link != '' && e.name !== "IndividualFreeOffers")
    return temp_free_offers_array
  }

  const concatUserReview = (temp_free_offers) => {
    let premiumTempUserReview = premium_offers.map((e) => {return {name: e.name, id: e.id, type: 'Paid'}});
    let freeTempUserReview = temp_free_offers.map((e) => {return {name: e.type.charAt(0).toUpperCase() + e.type.slice(1), id: e.type, type: 'Free'}});
    return premiumTempUserReview.concat(freeTempUserReview)
  }

  const [reviews, setReviews] = useState([]);
  const [UserReviewSelect, setUserReviewSelect] = useState(() => concatUserReview(freeOfferFunc()));
  const [urlType, seturlType] = useState();
  const [count_each_rating, setcount_each_rating] = useState({});
  const [favorites_offers, setfavorites_offers] = useState({})
  const [getUserFollowingBool, setgetUserFollowingBool] = useState(false);
  const [free_offers_array, setFree_offers_array] = useState([]);
  const [free_offers_list_values, setFree_offers_list_values] = useState([]);
  const [free_offers_list_values_fixed, setFree_offers_list_values_fixed] = useState([]);
  const [reviews_category, set_reviews_category] = useState([]);
  const [shareUrl, setShareUrl] = useState('');
  const [showShare, setShowShare] = useState(false);
  const [allIndividualValues, setAllIndividualValues] = useState(Individual_values)
  const [allIndividualValuesFixed, setAllIndividualValuesFixed] = useState(Individual_values)
  const [premium_offers_types, setpremium_offers_types] = useState([])
  const [feature, setFeature] = useState([])
  const [submitted, setSubmitted] = useState(false)


  useEffect(() => {
    let href_hash = window.location.href;
    let href_value = (href_hash.split("#").length > 1) ? href_hash.split("#")[1].toLowerCase() : null;
    seturlType(href_value);
    getUseStart()
    getUserValues()
    let temp_free_offers = freeOfferFunc();
    setFree_offers_array(temp_free_offers)
    setShareUrl(window.location.href)
    setUserReviewSelect(concatUserReview(temp_free_offers));

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
        chanUrlType(selected.section);
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



  const getUserFollowing = async () => {
    const getUser = await axios.post(`${window.location.origin}/api/User/GetUser/`, {});
    const getBool = getUser.data.user_follow.find((e) => e.individualid == Individual_values.id) != null;
    setgetUserFollowingBool(getBool)
  }


  const getUseStart = async () => {
    let temp_count_each_rating = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    const getReviews = await axios.post(`${window.location.origin}/api/User/GetReviews/`, {Individual: Individual_values.id});
    let temp_reviews = getReviews.data.rows


    var getCats = []
    let allreviews = temp_reviews.map((e) => { 
      let date = new Date(e.createdate);
      let createDate_Val = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate() + ', '  +date.getFullYear()
      let premium_name_value = e.premium_name//(e.type === 'Paid')? e.premium_name: reviews_free[e.premium_offer];
      temp_count_each_rating[Math.round(e.review)] += 1
      if(!getCats.includes(premium_name_value)) getCats.push(premium_name_value)
      return {...e, createDate_Val, premium_name_value}
    })
    setReviews(allreviews)
    set_reviews_category(getCats)
    setcount_each_rating(temp_count_each_rating)
    if(session){
      allreviews = allreviews.reduce((acc, element) => {
        if (session.id === element.user) {
          return [element, ...acc];
        }
        return [...acc, element];
      }, []);

      allreviews = allreviews.map((element) => {
        if (session.id === element.user) element.editable = true;
        return element
      })
      getUserFollowing()
    }
    setreviewAll(allreviews)

  }


  const [reviewAll, setreviewAll] = useState(reviews);



  const [showMoreSubcategory, setShowMoreSubcategory] = useState({itemsToShow: 3, expanded: false});
  
  const showMore = () => {
    showMoreSubcategory.itemsToShow === 3 ? (
      setShowMoreSubcategory({ itemsToShow: Individual_values.subcategory.length, expanded: true })
    ) : (
      setShowMoreSubcategory({ itemsToShow: 3, expanded: false })
    )
  }

  const free_offering_change_func = (event, type) => {
    setFree_offers_list_values(free_offers_list_values.map((e) => {
      if(e.image[1] === type) return {...e, name: event.target.value, changed: true}
      return e
    }))
  }

  const options = [
    {
      id: 1,
      option: 'Favorite',
    },
    {
      id: 2,
      option: 'Premium Offering',
    },
    {
      id: 3,
      option: 'Featured In',
    }
  ]
  const [selected, setSelected] = useState(options[0])
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const getApproval = () => {
    if(submitted) return 'Sent for Approval!';
    if(changeNeeded()) return 'Save Changes first';

    return 'Submit for Approval'

  }
  const create_account = async () => {
    let account_creation_req = await  axios.post('/api/payments/account_creation/', 
    {  
    });
    let account_url = await account_creation_req.data;
    return window.location.href = account_url.url

  };

  return (
    <div>
            <div className= "mx-auto max-w-7xl">
            <main className="pt-2 px-2 mt-2.5">
              <div className="flex flex-row flex-wrap space-x-3">
                <div className="inline-flex items-center justify-center cursor-point">
                <Link href="/directory" >  
                  <Image className="content-center h-4" src={home.src} width={20} height={20}/>
                </Link>
                </div>
                <div className="inline-flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 fill-very-light-grey" viewBox="0 0 20 20" fill="very-light-grey" stroke="#CECECE" strokeWidth="1">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="inline-block ml-2.5 text-dark-blue font-semibold" ><Link href={'/directory/' + Individual_values.category}>{Individual_values.category}</Link></div>
                <div className="inline-flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 fill-very-light-grey" viewBox="0 0 20 20" fill="very-light-grey" stroke="#CECECE" strokeWidth="1">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="inline-block ml-2 no-underline text-whisper cursor-point">Profile</div>
              </div>
              <div className="grid items-center grid-cols-4 mb-6 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-y-6 justify-items-start">
                <div className="self-start mt-6">
                  {/* <Image src={Individual_values.imagelink} className={styles.IndividualImage}/> */}
                  <ImageWithFallback src={Individual_values.imagelink} className={styles.IndividualImage} width={80} height={80} fallbackSrc={"/fallbackimage.svg"}/>
                </div>
                <div className="col-span-1 mt-6 space-y-3 md:mt-0 sm:col-span-2 md:col-span-6 lg:col-span-9 grid-row-4">  
                  <div className="person-flex flex-row space-x-3 flex-nowrap"> 
                    <input  className="text-xl font-semibold truncate md:text-3xl md:pt-7 editable-indvidual" value={allIndividualValues.first_name} onChange={(e)=>setAllIndividualValues({...allIndividualValues, first_name: e.target.value, first_name_change: true})}  placeholder='First Name'/>
                    <input  className="text-xl font-semibold truncate md:text-3xl md:pt-7 editable-indvidual" value={ allIndividualValues.last_name} onChange={(e)=>setAllIndividualValues({...allIndividualValues, last_name: e.target.value, last_name_change: true})} placeholder='Last Name'/>
                    <input  className="self-end text-sm truncate md:text-lg md:pt-7 text-dim-grey editable-indvidual" value={allIndividualValues.aka ? `${allIndividualValues.aka}`:''} onChange={(e)=>setAllIndividualValues({...allIndividualValues, aka: e.target.value, aka_change: true})} placeholder='AKA'/>
                    <div className="inline-flex items-center justify-center pl-3 md:pt-7 cursor-point"> 
                      <ShareFill className="w-3.5 h-3.5 fill-dark-blue" onClick={() => setShowShare(true)}/>
                    </div>
                  </div>
                  <div className="flex space-x-3 sm:flex-row sm:flex-wrap">
                  <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Educator Rating: </div>
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
                    {Individual_values.subcategory.slice(0, showMoreSubcategory.itemsToShow).map((e) => <Link
                      href={'/directory/' + Individual_values.category + '/Learn-' + e.replace(' ', '-')}
                      key={e}
                      className="flex items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</Link>)}
                    <div onClick={showMore} className={`items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke ${Individual_values.subcategory.length - showMoreSubcategory.itemsToShow <= 0 ? "hidden" : 0}`}>+{Individual_values.subcategory.length - showMoreSubcategory.itemsToShow} more</div>
                  </div>
                </div>
                <div className="block col-span-5 md:hidden">
                  <div className="flex flex-wrap space-y-3 md:hidden sm:space-x-3">
                  {Individual_values.subcategory.slice(0, showMoreSubcategory.itemsToShow).map((e) => <Link
                    href={'/directory/' + Individual_values.category + '/Learn-' + e.replace(' ', '-')}
                    key={e}
                    className="flex items-center justify-center px-1 py-1 mt-2 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</Link>)}
                    <div onClick={showMore} className={`flex items-center justify-center px-1 py-1 mt-2 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke ${Individual_values.subcategory.length - showMoreSubcategory.itemsToShow <= 0 ? "hidden" : 0}`}>+{Individual_values.subcategory.length - showMoreSubcategory.itemsToShow} more</div>
                  </div>
                </div>  
              </div>
              </main>

              <div ref={headerSection} className="sticky top-0 z-50 space-x-3 bg-white border-b flex-nowrap border-very-light-grey padding-left-20 z-index-5">
                <div className='width-max-500 center-all'>
                <div className="relative flex justify-center px-4 bg-white-smoke text-med group inline-block margin-2 cursor-point margin-top-20" onClick={create_account}>Connect Stripe <Image src={Stripe_logo} width={42} height={42} alt='stripe' className='inline-block'/></div>

                  {(getApproval() !== 'Save Changes first') && <button className="relative flex justify-center px-4 py-2 bg-white-smoke text-med group inline-block margin-2 margin-top-20" onClick={SubmitChanges}>{getApproval()}</button>}
                  <button className="relative flex justify-center px-4 py-2 text-white border border-transparent text-med bg-dark-blue group margin-top-20 inline-block" onClick={FreeSaveChanges}>{ changeNeeded() ? 'Save Changes': 'Up to Date!'}</button>
                </div>
                <div>
                  <div  onClick={(e) => {handleClick(aboutSection); chanUrlType('about');}} className={`cursor-pointer inline-block mt-3.5 pb-3.5 ${visibleSection === "about" ? "margin-2 md:mr-12 border-b border-black" : "md:mr-12 margin-2" }`}>
                    About
                  </div>
                  <div  onClick={(e) => {handleClick(offeringsSection); chanUrlType('offerings');}} className={`cursor-pointer inline-block mt-3.5 pb-3.5 ${visibleSection === "offerings" ? "margin-2 md:mr-12 border-b border-black" : "md:mr-12 margin-2" }`}>
                    Offerings
                  </div>
                  <div  onClick={(e) => {handleClick(favoritesSection); chanUrlType('favorites');}} className={`cursor-pointer inline-block mt-3.5 pb-3.5 ${visibleSection === "favorites" ? "margin-2 md:mr-12 border-b border-black" : "md:mr-12 margin-2" }`}>
                    Favorites
                  </div>
                  <div  onClick={(e) => {handleClick(reviewsSection); chanUrlType('reviews');}} className={`cursor-pointer inline-block mt-3.5 pb-3.5 ${visibleSection === "reviews" ? "margin-2 md:mr-12 border-b border-black" : "md:mr-12 margin-2" }`}>
                    Reviews
                  </div>
                </div>
              </div>
              <main className="pt-2 px-2 mt-2.5">
              {/* <div className={(!urlType) ? "my-8" : "hidden"}> */}
              <div className={"my-10"} ref={aboutSection}>
                <div className="pb-12 border-b border-very-light-grey">
                  <h2>Who is {allIndividualValues.first_name + ' ' + allIndividualValues.last_name}?</h2>
                  <div className="">
                    <textarea className="text-dim-grey editable-indvidual editable-textarea" value={allIndividualValues.description} onChange={(e)=>setAllIndividualValues({...allIndividualValues, description: e.target.value, desc_change: true})}/>

                  </div>
                </div>
                <div className="grid person-grid-col-2 my-12">
                  <div className="">
                    <h2>Featured In</h2>
                    <ul className="pl-0.5 list-outside">{feature.map((url) => 
                      <li className="" key={url.trim()}>
                        <Dot className="inline-flex items-center justify-center fill-dim-grey inline-block"/>
                        <Link
                          href={url.trim()}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="pl-1 no-underline text-dim-grey inline-block">{new URL(url).hostname}</Link>
                      </li>)}
                    </ul>
                  </div>
                  <div className="">
                    <h2>Contact Details</h2>
                      <div className="pl-2 text-dim-grey"><Image className="" src={Company_Image.src} height={13} width={15}/> Company:  <input className='editable-indvidual' value={allIndividualValues.company? allIndividualValues.company:''} onChange={(e)=>setAllIndividualValues({...allIndividualValues, company: e.target.value, company_change: true})}/></div>
                      <div className="pl-2 text-dim-grey"><Image className="" src={Location_Image.src} height={13} width={15}/> Located in <input className='editable-indvidual' value={allIndividualValues.location? allIndividualValues.location:''} onChange={(e)=>setAllIndividualValues({...allIndividualValues, location: e.target.value, location_change: true})}/></div>
                      <div className="pl-2 text-dim-grey"><Image className="" src={Founded_image.src} height={13} width={15}/> Founded in <input className='editable-indvidual' value={allIndividualValues.founder? allIndividualValues.founder.split('.')[0]:''} onChange={(e)=>setAllIndividualValues({...allIndividualValues, founder: e.target.value, founder_change: true})}/></div>
                      <div className="flex pl-2 text-dim-grey "><div className="margin-right-five"><Image  src={Link_image.src} height={13} width={15}/></div>Link <div className="flex-initial overflow-hidden no-underline break-words text-dim-grey"><input className='editable-indvidual' value={allIndividualValues.link? allIndividualValues.link:''} onChange={(e)=>setAllIndividualValues({...allIndividualValues, link: e.target.value, link_change: true})}/></div></div>
                  </div>
                </div>
              </div>
              {/* <div className={(urlType === 'offerings')? null: styles.displayNone}> */}
              <div className={"my-10"} ref={offeringsSection}>
                <div className="pt-12 pb-2 mx-0 border-b sm:mx-4 MainOfferingValue border-very-light-grey">
                  <h3>Free Offerings</h3>
                </div>
                <div className="grid grid-cols-2 pt-4 pb-3 mx-0 border-b sm:mx-4 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 border-very-light-grey">
                  {/* FREE OFFERING VALUES */}
                  {free_offers_list_values.map((type) => <div className="inline-block mr-2 py-.5 px-1 no-underline font-normal sm:text-2xl text-xl text-denim" key={type.image[1]}><div >
                      <div className="flex flex-row space-x-2"><Image src={type.image[0]} width={13} height={15}/> <div className="text-sm text-dim-grey ">{type.image[1]}</div></div>
                      <input className='editable-indvidual' value={type.name} onChange={(event) => free_offering_change_func(event, type.image[1])}  placeholder='Provide handle'/>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                {Object.keys(premium_offers_types).length > 0 ? <div className="pt-12 pb-2 mx-0 border-b sm:mx-4 MainOfferingValue border-very-light-grey">
                    <h3>Premium Offerings</h3>
                  </div>:null}
                {Object.keys(premium_offers_types).map((key) => <div className="py-12 mx-0 border-b sm:mx-4 last:border-b-0 border-very-light-grey" key={key}>
                  <div className="flex justify-between pb-3">
                    <h3 className="">{key}</h3>
                    {/* <button className="px-4 text-sm text-center text-white truncate bg-dark-blue">View all {key} Presets</button> */}
                  </div>
                  <div className="grid person-flex mt-6 justify-items-center gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
                  {premium_offers_types[key].map((value) => <div key={value.name} className="">
                      <Image src={value.imagelink? value.imagelink: No_image.src} className="w-48 h-40 sm:w-64 sm:h-56"  width={256} height={224}/>
                        <div className="pt-3 text-large text-denim">{value.name}</div>
                        <div className="flex flex-row flex-wrap items-center space-x-2">
                        <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Educator Rating: </div>
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
                          <div className="text-denim">{value.count ? `(${value.count})`:null}</div>
                        </div>
                      <div className="w-48 text-sm text-dim-grey">{value.description}</div>
                      <div className="delete-container cursor-pointer" onClick={() => DeleteValueFavorite(value, 'paid')}><div className="inline-block">Delete</div><div className="inline-block font-size-30 position-absolute"><X/></div></div>
                      <div className="pt-2 text-dark-blue font-semibold">Status: {value.status ? value.status : 'Approved'}</div>
                    </div>)}
                    </div>
                  </div>)}
                </div>
              </div>
              {/* <div className={(urlType === 'favorites')? null: styles.displayNone}> */}
              <div className={"my-8"} ref={favoritesSection}>
              {Object.keys(favorites_offers).length > 0 ? <div className="pt-12 pb-2 mx-0 border-b sm:mx-4 MainOfferingValue border-very-light-grey">
                  <h3>Favorites</h3>
              </div>:null}
              {Object.keys(favorites_offers).map((key) => <div className="py-12 mx-0 border-b sm:mx-4 last:border-b-0 border-very-light-grey" key={key}>
                  <h3 className="pb-3">{key}</h3>
                  <div className="grid person-flex mt-6 justify-items-center gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
                  {favorites_offers[key].map((value) => <div key={value.name} className="flex flex-col space-y-3 margin-bottom-mobile align-center-mobile">
                      <Image src={value.imagelink? value.imagelink: No_image.src} className="w-48 h-40 sm:w-64 sm:h-56"  width={256} height={224}  />
                        <div className="text-large text-black ">{value.name}</div>
                        <div className="w-48 text-sm text-dim-grey">{value.description}</div>
                        <div className="pt-2">
                          <div className="px-2 py-2 text-xs text-center text-white no-underline truncate sm:px-4 sm:py-2 sm:text-sm bg-dark-blue"><Link href={value.link}  target="_blank" rel="noopener noreferrer nofollow">See Price{value.linkName}</Link></div>
                          <div className="delete-container cursor-pointer" onClick={() => DeleteValueFavorite(value, 'favorite')}><div className="inline-block">Delete</div><div className="inline-block font-size-30 position-absolute"><X/></div></div>
                          <div className="pt-2 text-dark-blue font-semibold">Status: {value.status ? value.status : 'Approved'}</div>

                        </div>
                    </div>)}
                    </div>
                  </div>)}
              </div>
              <div className={"my-8"} >
                <div>
                <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="block text-xl font-medium whitespace-nowrap text-dark-blue">Add new listing:</Listbox.Label>
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
              <div className={"my-8"} >
                {(selected.id === 1)? <SettingsPersonsFavorite getUserValues={getUserValues}/> : null}
                {(selected.id === 2) ? <SettingsPersonsPremium getUserValues={getUserValues} category={Individual_values.category}/> : null}
                {(selected.id === 3) ? <SettingsPersonsFeature  getUserValues={getUserValues}/> : null}
              </div>
              {/* <div><SettingsPersonsVideos/></div> */}
            </main>
        </div>
      </div>
  );
}


export async function getServerSideProps(ctx) {
  // const IndividualID = ctx.params.id
  let session_backend = await getSession(ctx);
  const redirect = {
    redirect: {
      permanent: false,
      destination: "/claim-listing/"
    }
  }
  if(!session_backend) return redirect;
  
  const Individual_values = await client.query({query:LOAD_INDIVIDUAL_PAGE, variables: { session: session_backend.id }})
  if(!Individual_values.data.getEachIndividual.rows) return redirect;
  let free_offers = Individual_values.data.getEachIndividual.free_offers;
  let free_content = Individual_values.data.getEachIndividual.free_content.map((e) => ({...e, embedUrl: `https://www.youtube.com/embed/${e.url.split('watch?v=')[1]}?autoplay=0&showinfo=0`, thumbnail: `https://img.youtube.com/vi/${e.url.split('watch?v=')[1]}/0.jpg`}))
  if(free_offers.length > 0) 
    free_offers = free_offers[0] 
  return {
    props: {
      Individual_values: Individual_values.data.getEachIndividual.rows[0],
      premium_offers: Individual_values.data.getEachIndividual.premium_offers,
      free_content: free_content,
      free_offers,
      favorites: Individual_values.data.getEachIndividual.favorites
    }  
  }

}
