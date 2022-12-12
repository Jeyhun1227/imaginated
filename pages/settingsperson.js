import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import {LOAD_INDIVIDUAL_PAGE} from '../../GraphQL/Queries/Individual';
import {LOAD_STATIC_DIRECTORY} from '../../GraphQL/Queries/StaticPaths';
import client from '../../components/GraphQL';
import {Rating} from '@mui/material';
import { Bookmark, ExclamationCircle, ShareFill, Dot, PatchCheckFill, HourglassBottom, PersonXFill, X, Check, Pen } from 'react-bootstrap-icons';
import { signIn, useSession} from "next-auth/react";
import UserReview from '../../components/Form/UserReview';
import axios from 'axios';
import home from '../../public/home.svg'
import star from '../../public/star.svg'
import No_image from '../../public/No-image.png'
import Company_Image from '../../public/company.svg'
import Location_Image from '../../public/location.svg'
import Founded_image from '../../public/founded.svg'
import Link_image from '../../public/link.svg'
import ImageWithFallback from '../../components/Image/Image'
import Head from 'next/head';
import Image from 'next/image';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TwitterIcon
} from "react-share";
import ImageGallery from 'react-image-gallery';



export default function IndividualPageMain({Individual_values, premium_offers, free_offers, free_content, favorites, IndividualID}) {
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
  const [reviews_category, set_reviews_category] = useState([]);
  const [shareUrl, setShareUrl] = useState('');
  const [showShare, setShowShare] = useState(false);
  const [allIndividualValues, setAllIndividualValues] = useState(Individual_values)


  useEffect(() => {
    let href_hash = window.location.href;
    let href_value = (href_hash.split("#").length > 1) ? href_hash.split("#")[1].toLowerCase() : null;
    seturlType(href_value);
    getUseStart()

    let temp_free_offers = freeOfferFunc();
    setFree_offers_list_values(Object.keys(images).map((type) => {
      let found_free_content = temp_free_offers.find((e) => e.type === type)
      let name = found_free_content && found_free_content.name ? found_free_content.name : '';
      return {image: images[type], name}
    }))
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

  let feature = Individual_values.feature? Individual_values.feature.split('||'): [];

  let premium_offers_types = {}
  premium_offers.map((e) =>{
    let val_type = (e.type) ? e.type : "Other";
    (premium_offers_types[val_type]) ? premium_offers_types[val_type].push(e): premium_offers_types[val_type]= [e];
  })


  const getUserFollowing = async () => {
    const getUser = await axios.post(`${window.location.origin}/api/User/GetUser/`, {});
    const getBool = getUser.data.user_follow.find((e) => e.individualid == Individual_values.id) != null;
    setgetUserFollowingBool(getBool)
  }

  const getUseStart = async () => {
    let temp_count_each_rating = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    let temp_favorites_offers = {}
    const getReviews = await axios.post(`${window.location.origin}/api/User/GetReviews/`, {Individual: Individual_values.id});
    let temp_reviews = getReviews.data.rows
    favorites.map((e) =>{
      let val_type = (e.category) ? e.category : "Other";
      let linkName = new URL(e.link).hostname;
      (temp_favorites_offers[val_type]) ? temp_favorites_offers[val_type].push({...e, linkName}): temp_favorites_offers[val_type]= [{...e, linkName}];
    });
    setfavorites_offers(temp_favorites_offers)

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
      if(e.image[1] === type) return {...e, name: event.target.value}
      return e
    }))
  }




  return <div>
          <div className= "mx-auto max-w-7xl">
          <main className="pt-2 px-2 mt-2.5">
            <div className="flex flex-row flex-wrap space-x-3">
              <div className="inline-flex items-center justify-center cursor-point">
              <Link href="/directory" >  
                <a ><Image className="content-center h-4" src={home.src} width={20} height={20}/></a>
              </Link>
              </div>
              <div className="inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 fill-very-light-grey" viewBox="0 0 20 20" fill="very-light-grey" stroke="#CECECE" strokeWidth="1">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="inline-block ml-2.5 text-dark-blue font-semibold" ><Link href={'/directory/' + Individual_values.category}><a>{Individual_values.category}</a></Link></div>
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
                  <input  className="text-xl font-semibold truncate md:text-3xl md:pt-7 editable-indvidual" value={allIndividualValues.first_name} onChange={(e)=>setAllIndividualValues({...allIndividualValues, first_name: e.target.value})}  placeholder='First Name'/>
                  <input  className="text-xl font-semibold truncate md:text-3xl md:pt-7 editable-indvidual" value={ allIndividualValues.last_name} onChange={(e)=>setAllIndividualValues({...allIndividualValues, last_name: e.target.value})} placeholder='Last Name'/>
                  <input  className="self-end text-sm truncate md:text-lg md:pt-7 text-dim-grey editable-indvidual" value={allIndividualValues.aka ? `(${allIndividualValues.aka})`:''} onChange={(e)=>setAllIndividualValues({...allIndividualValues, aka: e.target.value})} placeholder='AKA'/>
                  <div className="inline-flex items-center justify-center pl-3 md:pt-7 cursor-point"> 
                    <ShareFill className="w-3.5 h-3.5 fill-dark-blue" onClick={() => setShowShare(true)}/>
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
                  {Individual_values.subcategory.slice(0, showMoreSubcategory.itemsToShow).map((e) => <Link href={'/directory/' + Individual_values.category + '/Learn-' + e.replace(' ', '-')} key={e} ><a className="flex items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</a></Link>)}
                  <div onClick={showMore} className={`items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke ${Individual_values.subcategory.length - showMoreSubcategory.itemsToShow <= 0 ? "hidden" : 0}`}>+{Individual_values.subcategory.length - showMoreSubcategory.itemsToShow} more</div>
                </div>
                <div className="hidden md:flex">
                  <Link href="/claim-listing">
                    <a className="inline-flex items-center px-2 py-1 underline text-dark-blue bg-light-grey" >
                      <ExclamationCircle className="w-3.5 h-3.5 mr-2 "/>
                      Claim Profile
                    </a>
                  </Link>
                </div>
              </div>
              <div className="block col-span-5 md:hidden">
                <div className="flex flex-wrap space-y-3 md:hidden sm:space-x-3">
                {Individual_values.subcategory.slice(0, showMoreSubcategory.itemsToShow).map((e) => <Link href={'/directory/' + Individual_values.category + '/Learn-' + e.replace(' ', '-')} key={e} ><a className="flex items-center justify-center px-1 py-1 mt-2 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</a></Link>)}
                  <div onClick={showMore} className={`flex items-center justify-center px-1 py-1 mt-2 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke ${Individual_values.subcategory.length - showMoreSubcategory.itemsToShow <= 0 ? "hidden" : 0}`}>+{Individual_values.subcategory.length - showMoreSubcategory.itemsToShow} more</div>
                </div>
                <div className="flex mt-4 md:hidden">
                  <Link href="/claim-listing">
                    <>
                    <button className="inline-flex items-center px-2 py-1 underline text-dark-blue bg-light-grey">
                      <ExclamationCircle className="w-3.5 h-3.5 mr-2 "/>
                      Claim Profile
                    </button>
                    </>
                  </Link>
                </div>
              </div>  
              <div className="col-span-4 sm:col-span-5 md:col-span-2 lg:col-span-2 md:ml-auto">
                <div className="flex space-y-3 md:flex-col md:justify-end"> 
                  <button onClick={(e) => {handleClick(reviewsSection); chanUrlType('reviews');}} className="px-3 py-2 mr-3 text-sm text-center text-white truncate md:mr-0 bg-dark-blue ">Write a review</button>
                    <button className="flex items-center justify-center px-3 py-2 my-auto text-center bg-white md:inline-flex" >
                      {(getUserFollowingBool)? <Check className="mr-2 fill-dark-blue"/> : <Bookmark className="mr-2 fill-dark-blue"/>}
                      <span className={`${styles.TextInline} text-dark-blue truncate text-sm`}>{(getUserFollowingBool)? "Profile Saved": "Save this profile"}</span>
                    </button>

                </div>
              </div>
            </div>
            </main>

            <div ref={headerSection} className="sticky top-0 z-50 flex flex-row space-x-3 bg-white border-b flex-nowrap border-very-light-grey padding-left-20 z-index-5">
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
                <h2>Who is {Individual_values.first_name + ' ' + Individual_values.last_name}?</h2>
                <div className="">
                  <textarea className="text-dim-grey editable-indvidual editable-textarea" value={Individual_values.description}/>

                </div>
              </div>
              <div className="grid person-grid-col-2 my-12">
                <div className="">
                  <h2>Featured In</h2>
                  <ul className="pl-0.5 list-outside">{feature.map((url) => 
                    <li className="" key={url.trim()}>
                      <Dot className="inline-flex items-center justify-center fill-dim-grey inline-block"/>
                      <Link  href={url.trim()} ><a  target="_blank" rel="noopener noreferrer nofollow" className="pl-1 no-underline text-dim-grey inline-block">{new URL(url).hostname}</a></Link>
                    </li>)}
                  </ul>
                </div>
                <div className="">
                  <h2>Contact Details</h2>
                    <div className="pl-2 text-dim-grey"><Image className="" src={Company_Image.src} height={13} width={15}/> Company:  <input className='editable-indvidual' value={allIndividualValues.company? allIndividualValues.company:''} /></div>
                    <div className="pl-2 text-dim-grey"><Image className="" src={Location_Image.src} height={13} width={15}/> Located in <input className='editable-indvidual' value={allIndividualValues.location? allIndividualValues.location:''}/></div>
                    <div className="pl-2 text-dim-grey"><Image className="" src={Founded_image.src} height={13} width={15}/> Founded in <input className='editable-indvidual' value={allIndividualValues.founder? allIndividualValues.founder.split('.')[0]:''}/></div>
                    <div className="flex pl-2 text-dim-grey "><div className="margin-right-five"><Image  src={Link_image.src} height={13} width={15}/></div><div className="flex-initial overflow-hidden no-underline break-words text-dim-grey"><input className='editable-indvidual' value={allIndividualValues.link? allIndividualValues.link:''}/></div></div>
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
              <div>{Object.keys(premium_offers_types).map((key) => <div className="py-12 mx-0 border-b sm:mx-4 last:border-b-0 border-very-light-grey" key={key}>
                <div className="flex justify-between pb-3">
                  <h3 className="">{key}</h3>
                  {/* <button className="px-4 text-sm text-center text-white truncate bg-dark-blue">View all {key} Presets</button> */}
                </div>
                <div className="grid person-flex mt-6 justify-items-center gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
                {premium_offers_types[key].map((value) => <div key={value.name} className="">
                    <Image src={value.imagelink? value.imagelink: No_image.src} className="w-48 h-40 sm:w-64 sm:h-56"  width={256} height={224} onError={({ currentTarget }) => {
                      currentTarget.onerror = null; 
                      currentTarget.src=No_image.src;
                    }} />
                      <div className="pt-3 text-large text-denim">{value.name}</div>
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
                <div className="grid person-flex mt-6 justify-items-center gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
                {favorites_offers[key].map((value) => <div key={value.name} className="flex flex-col space-y-3 margin-bottom-mobile align-center-mobile">
                    <Image src={value.imagelink? value.imagelink: No_image.src} className="w-48 h-40 sm:w-64 sm:h-56"  width={256} height={224}  onError={({ currentTarget }) => {
                      currentTarget.onerror = null; 
                      currentTarget.src=No_image.src;
                    }} />
                      <div className="text-large text-black ">{value.name}</div>
                      <div className="w-48 text-sm text-dim-grey">{value.description}</div>
                      <div className="pt-2">
                        <div className="px-2 py-2 text-xs text-center text-white no-underline truncate sm:px-4 sm:py-2 sm:text-sm bg-dark-blue"><Link href={value.link}  target="_blank" rel="noopener noreferrer nofollow"><a>See Price {value.linkName}</a></Link></div>
                      </div>
                  </div>)}
                  </div>
                </div>)}
            </div>
          </main>
      </div>
    </div>
}


export async function getServerSideProps(ctx) {
  // const IndividualID = ctx.params.id
  let session_backend = await getSession(ctx);
  if(!session_backend){
    const { res } = ctx;
    res.setHeader("location", "/claim-listing/");
    res.statusCode = 302;
    res.end();
    return;
  }
  const Individual_values = await client.query({query:LOAD_INDIVIDUAL_PAGE, variables: { linkname: IndividualID, session: session_backend.id }})
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
      favorites: Individual_values.data.getEachIndividual.favorites,
      IndividualID
    }  
  }

}
