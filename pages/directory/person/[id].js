import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';
import {LOAD_INDIVIDUAL_PAGE} from '../../../GraphQL/Queries/Individual';
import {LOAD_STATIC_DIRECTORY} from '../../../GraphQL/Queries/StaticPaths';
import client from '../../../components/GraphQL';
import {Rating} from '@mui/material';
import { Bookmark, ExclamationCircle, ShareFill, Dot,  X, Check } from 'react-bootstrap-icons';
import { signIn, useSession} from "next-auth/react";
import UserReview from '../../../components/Form/UserReview';
import axios from 'axios';
import home from '../../../public/home.svg'
import contactImg from '../../../public/contact.svg'
import star from '../../../public/star.svg'
import No_image from '../../../public/No-image.png'
import Company_Image from '../../../public/company.svg'
import Location_Image from '../../../public/location.svg'
import Founded_image from '../../../public/founded.svg'
import Link_image from '../../../public/link.svg'
import ImageWithFallback from '../../../components/Image/Image';
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
import Sidebar from '../../../components/Person/Sidebar';
import IndividualFreeOfferingComponent from '../../../components/Person/FreeOffering';
import ReviewsComponent from '../../../components/Person/Reviews';
import WordChart from '../../../components/Person/WordChart'


export default function IndividualPageMain({Individual_values, category_values, premium_offers, free_offers, reviews_offer, free_content, favorites, IndividualID, wordChartIndividual}) {
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
  
  const get_name_from_link = (link, key) => {
    let o_val = link.split('/')
    let name = (o_val[o_val.length - 1] === '' || o_val[o_val.length - 1] === 'feature')? o_val[o_val.length - 2] : o_val[o_val.length - 1];
    return (at_types.includes(key))? '@' + name: name;
  }
  
  const freeOfferFunc = () => {
    let temp_free_offers_array = Object.keys(free_offers).map((key) => {
      if(!free_offers[key]) return {link: '', name: "IndividualFreeOffers"};
      let images_name = images[key]
      let name = get_name_from_link(free_offers[key], key)
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

  const favoritesOfferFunc = () => {
    let temp_favorites_offers = {}

    favorites.map((e) =>{
      let val_type = (e.category) ? e.category : "Other";
      let linkName = new URL(e.link).hostname;
      (temp_favorites_offers[val_type]) ? temp_favorites_offers[val_type].push({...e, linkName}): temp_favorites_offers[val_type]= [{...e, linkName}];
    });
    return temp_favorites_offers
  }

  const reviewsFunc = () => {
    let temp_count_each_rating = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

    var getCats = []
    let allreviews = reviews_offer.map((e) => { 
      let date = new Date(Number(e.createdate));
      let createDate_Val = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate() + ', '  +date.getFullYear()
      let premium_name_value = e.premium_name//(e.type === 'Paid')? e.premium_name: reviews_free[e.premium_offer];
      temp_count_each_rating[Math.round(e.review)] += 1
      if(!getCats.includes(premium_name_value)) getCats.push(premium_name_value)
      return {...e, createDate_Val, premium_name_value}
    })
    return [allreviews, getCats, temp_count_each_rating]
  }

  const [reviews, setReviews] = useState([]);
  const [UserReviewSelect, setUserReviewSelect] = useState();
  const [urlType, seturlType] = useState();
  const [count_each_rating, setcount_each_rating] = useState({});
  const [favorites_offers, setfavorites_offers] = useState([])
  const [getUserFollowingBool, setgetUserFollowingBool] = useState(false);
  const [free_offers_array, setFree_offers_array] = useState([]);
  const [reviews_category, set_reviews_category] = useState([]);
  const [shareUrl, setShareUrl] = useState('');
  const [showShare, setShowShare] = useState(false);
  const [UserSignUp, setUserSignUp] = useState(false);
  const [ReviewEngagement, setReviewEngagement] = useState([]);
  const [ContactInfoClicked, setContactInfoClicked] = useState(false);

  useEffect(() => {
    let href_hash = window.location.href;
    let href_value = (href_hash.split("#").length > 1) ? href_hash.split("#")[1].toLowerCase() : null;
    seturlType(href_value);
    let temp_reviews = reviewsFunc()[0]
    setcount_each_rating(reviewsFunc()[2])
    setreviewAll(temp_reviews)
    setReviews(temp_reviews)
    setUserReviewSelect(() => concatUserReview(freeOfferFunc()));
    set_reviews_category(reviewsFunc()[1])
    setfavorites_offers(favoritesOfferFunc())

    // getUseStart()
    let signup = localStorage.getItem('signup');
    setUserSignUp(signup > 2)
    let temp_free_offers = freeOfferFunc();
    setFree_offers_array(temp_free_offers)
    setShareUrl(window.location.href)
    setUserReviewSelect(concatUserReview(temp_free_offers));
    let temp_num = localStorage.getItem('signup') ? Number(localStorage.getItem('signup')): 0;
    localStorage.setItem('signup', 1 + temp_num);
  }, [Individual_values]);  

  useEffect(() => {
    getUseStart()
  }, [session]); 
  
  let chanUrlType = (type) => {
    // history.replaceState(undefined, undefined, '#'+ type)
    seturlType(type)
  }

  const headerSection = useRef(null);
  const aboutSection = useRef(null);
  const offeringsSection = useRef(null);
  const offeringsPremiumSection = useRef(null);
  const reviewsSection = useRef(null);
  const favoritesSection = useRef(null);
  

  const sectionRefs = [
    { section: "about", ref: aboutSection },
    { section: "offerings", ref: offeringsSection },
    { section: "offerings", ref: offeringsPremiumSection },
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



  let reviews_free = {1: "YouTube", 2: "Facebook", 3: "Twitter", 4:"TikTok", 5: "Instagram", 6: "Linkedin", 7: "Slack", 8: "Discord"}

  const userFollow = async () => {
    let UserIndividual = await axios.post(`${window.location.origin}/api/User/SetFollower/`, {IndividualId: Individual_values.id, addIndividual: !getUserFollowingBool, aka: Individual_values.aka, name: Individual_values.first_name + ' ' + Individual_values.last_name, imagelink: Individual_values.imagelink, link: Individual_values.linkname})
    setgetUserFollowingBool(!getUserFollowingBool)
  }

  const getUserFollowing = async () => {
    const getUser = await axios.post(`${window.location.origin}/api/User/GetUser/`, {id: Individual_values.id});
    const getBool = getUser.data.user_follow.find((e) => e.individualid == Individual_values.id) != null;
    setgetUserFollowingBool(getBool)
    setReviewEngagement(getUser.data.reviews_engagement)
  }

  const getUseStart = async () => {
    let allreviews = reviews;
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

  const editvalue = (id) => {
    window.open(
      `${window.location.origin}/settings?type=Ratings&id=${id}`, "_blank");
  }

  const isValidHttpUrl = (url) => {
    try {
      const newUrl = new URL(url);
      return newUrl.hostname
    } catch (err) {
      return false;
    }
  }


  return (
    <div>
            <Head>
              <title>{`${Individual_values.first_name} ${Individual_values.last_name} ${Individual_values.aka ? `"${Individual_values.aka}" `:''}| Imaginated`}</title>
              <meta name="description" content={Individual_values.description}/>
              <link rel="canonical" href={`https://www.imaginated.com/directory/person/${IndividualID}/`} />
              <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
            </Head>
            {(['Jonathan-Paragas'].includes(Individual_values.linkname))?<Head>
              <script type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org/", 
                "@type": "Product", 
                "name": `${Individual_values.first_name} ${Individual_values.last_name}`,
                "image": Individual_values.imagelink,
                "description": Individual_values.description,
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": Individual_values.avg,
                  "bestRating": "5",
                  "ratingCount": Individual_values.count
                }
              }) }}></script></Head>:null}
            <div className= "mx-auto max-w-7xl">
            <main className="pt-2 px-2 mt-2.5">
              <div className="flex flex-row flex-wrap space-x-3">
                <div className="inline-flex items-center justify-center cursor-point">
                <Link href="/directory" >  
                  <Image className="content-center h-4" src={home.src} width={20} height={20} alt='home'/>
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
                  <ImageWithFallback src={Individual_values.imagelink} alt={Individual_values.first_name + ' ' + Individual_values.last_name} className={styles.IndividualImage} width={80} height={80} fallbackSrc={"/fallbackimage.svg"}/>
                </div>
                <div className="col-span-1 mt-6 space-y-3 md:mt-0 sm:col-span-2 md:col-span-6 lg:col-span-9 grid-row-4">  
                  <div className="person-flex flex-row space-x-3 flex-nowrap md:pt-7"> 
                    <h1  className="text-xl font-semibold truncate md:text-3xl inline-block">{Individual_values.first_name + ' ' + Individual_values.last_name} </h1>
                    {Individual_values.aka ? <h2  className="self-end text-sm truncate md:text-lg text-dim-grey inline-block margin-bottom-12">{`"${Individual_values.aka}"`}</h2>:null}
                    <div className="pl-3 cursor-point inline-block vertical-align-top padding-top-15-4"> 
                      <ShareFill className="w-3.5 h-3.5 fill-dark-blue" onClick={() => setShowShare(true)}/>
                    </div>
                    {(showShare)?<div>
                      <div className='individual-share-buttons'>
                          <div className="individual-share-exit" onClick={() => setShowShare(false)}><X/></div>
                          <EmailShareButton url={shareUrl} className='margin-right-two'>
                              <EmailIcon size={40} round={true}/>
                          </EmailShareButton>
                          <FacebookShareButton url={shareUrl} className='margin-right-two'>
                              <FacebookIcon size={40} round={true}/>
                          </FacebookShareButton>
                          <LinkedinShareButton url={shareUrl} className='margin-right-two'>
                              <LinkedinIcon size={40} round={true}/>
                          </LinkedinShareButton>
                          <PinterestShareButton url={shareUrl} className='margin-right-two'>
                              <PinterestIcon size={40} round={true}/>
                          </PinterestShareButton>
                          <RedditShareButton url={shareUrl} className='margin-right-two'>
                              <RedditIcon size={40} round={true}/>
                          </RedditShareButton >
                          <TwitterShareButton url={shareUrl} className='margin-right-two'>
                              <TwitterIcon size={40} round={true}/>
                          </TwitterShareButton>
                      </div>
                    </div>:null}
                    <div className='indiv-social-media'>
                      <IndividualFreeOfferingComponent free_offers_array={free_offers_array}/>
                    </div>
                  </div>
                  <div className="grid indiv-content-3 align-items-center">
                  {/* <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Educator Rating: </div> */}
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
                    <div className='inline-block font-size-14'>{Individual_values.avg}</div>
                    <div className='inline-block font-size-14'>({Individual_values.count})</div>
                    <div className='inline-block cursor-point' onClick={()=>setContactInfoClicked(true)}><Image src={contactImg} className='inline-block' alt='contact' ></Image><div className='inline-block font-weight-500 font-size-14 margin-left-10'>Contact</div></div>
                    {(ContactInfoClicked)?<div className='individual-share-buttons individual-contact-buttons'>
                          <div className="individual-share-exit" onClick={() => setContactInfoClicked(false)}><X/></div>
                          <div className="">
                          <h2>Contact Details</h2>
                            {(Individual_values.company)?<div className="pl-2 text-dim-grey margin-top-10"><Image className="inline-block" src={Company_Image.src} height={13} width={15}  alt='company'/> {Individual_values.company}</div>:null}
                            {(Individual_values.location)?<div className="pl-2 text-dim-grey margin-top-10"><Image className="inline-block" src={Location_Image.src} height={13} width={15}  alt='location'/> Located in {Individual_values.location}</div>:null}
                            {(Individual_values.founder)?<div className="pl-2 text-dim-grey margin-top-10"><Image className="inline-block" src={Founded_image.src} height={13} width={15}  alt='founder'/> Founded in {Individual_values.founder.split('.')[0]}</div>:null}
                            {(Individual_values.link)?<div className="pl-2 text-dim-grey margin-top-10"><div className="inline-block margin-right-five"><Image  src={Link_image.src} height={13} width={15}  alt='link'/></div><div className="flex-initial overflow-hidden no-underline break-words text-dim-grey"><Link
                              href={Individual_values.link}
                              target='_blank'
                              rel="noopener noreferrer nofollow">{Individual_values.link}</Link></div></div>:null}
                          </div>
                    </div>:null}
                  </div>
                  <div className="hidden space-y-3 sm:space-x-3 md:flex font-weight-500 font-size-14">Categories: </div>
                  <div className="hidden space-y-3 sm:space-x-3 md:flex">
                    {Individual_values.subcategory.slice(0, showMoreSubcategory.itemsToShow).map((e) => <Link
                      href={'/directory/' + Individual_values.category + '/Learn-' + e.replace(' ', '-')}
                      key={e}
                      className="flex items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</Link>)}
                    <div onClick={showMore} className={`items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke ${Individual_values.subcategory.length - showMoreSubcategory.itemsToShow <= 0 ? "hidden" : 0}`}>+{Individual_values.subcategory.length - showMoreSubcategory.itemsToShow} more</div>
                  </div>
                  <div className="hidden md:flex">
                    <Link
                      href="/claim-listing"
                      className="inline-flex items-center px-2 py-1 underline text-dark-blue bg-light-grey">

                      <ExclamationCircle className="w-3.5 h-3.5 mr-2 "/>Claim Profile
                    </Link>
                  </div>
                </div>
                <div className="block col-span-5 md:hidden">
                  <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Categories: </div>
                  <div className="flex flex-wrap space-y-3 md:hidden sm:space-x-3">
                  {Individual_values.subcategory.slice(0, showMoreSubcategory.itemsToShow).map((e) => <Link
                    href={'/directory/' + Individual_values.category + '/Learn-' + e.replace(' ', '-')}
                    key={e}
                    className="flex items-center justify-center px-1 py-1 mt-2 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</Link>)}
                    <div onClick={showMore} className={`flex items-center justify-center px-1 py-1 mt-2 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke ${Individual_values.subcategory.length - showMoreSubcategory.itemsToShow <= 0 ? "hidden" : 0}`}>+{Individual_values.subcategory.length - showMoreSubcategory.itemsToShow} more</div>
                  </div>
                  <div className="flex mt-4 md:hidden">
                    <Link href="/claim-listing" legacyBehavior>
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
                      <button className="flex items-center justify-center px-3 py-2 my-auto text-center bg-white md:inline-flex" onClick={() => session ? userFollow() : signIn()}>
                        {(getUserFollowingBool)? <Check className="mr-2 fill-dark-blue"/> : <Bookmark className="mr-2 fill-dark-blue"/>}
                        <span className={`${styles.TextInline} text-dark-blue truncate text-sm`}>{(getUserFollowingBool)? "Profile Saved": "Save this profile"}</span>
                      </button>

                  </div>
                </div>
              </div>
              </main>

              <div ref={headerSection} className="sticky top-0 z-50 flex flex-row space-x-3 bg-white border-b flex-nowrap border-very-light-grey padding-left-20 z-index-6">
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
                <div className="grid-layout-70-30">
                  <div>
                    <div className={"my-10"} ref={aboutSection}>
                      <div className="pb-12 border-b border-very-light-grey">
                        <h2>Who is {Individual_values.first_name + ' ' + Individual_values.last_name}?</h2>
                        <div className="">
                          <div className="text-dim-grey">{Individual_values.description}</div>
                          <div className="indiv-featured-in">Featured In</div>

                          <ul className="pl-0.5 list-outside">{feature.map((url) => 
                            <li className="inline-block mr-10" key={url.trim()}>
                              <Dot className="inline-flex items-center justify-center fill-dim-grey inline-block"/>
                              <Link
                                href={url.trim()}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="pl-1 no-underline text-dim-grey inline-block">{isValidHttpUrl(url)}</Link>
                            </li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <div className={(urlType === 'offerings')? null: styles.displayNone}> */}
                    <div className={"my-10"} ref={offeringsSection}>
                      <div className="pb-2 mx-0 border-b sm:mx-4 MainOfferingValue border-very-light-grey">
                        <h3>Content Breakdown Chart</h3>
                        <div>Explore the Bar Chart below to discover the percentage breakdown of {Individual_values.first_name}&apos;s content</div>

                      </div>
                      <div>
                        <WordChart  Youtube_free_offers={free_offers} Youtube_free_content={free_content.slice(0,3)} Youtube_link={free_offers.youtube} Youtube_name={get_name_from_link(free_offers.youtube, 'youtube')} wordChartIndividual={wordChartIndividual} width={offeringsSection.current ? offeringsSection.current.offsetWidth: null} individual={Individual_values.id}/>
                      </div>
                      <div>
                            {/* {(free_offers.youtube && free_content.length > 0) ? <IndividualYoutube free_content={free_content} link={free_offers.youtube} name={get_name_from_link(free_offers.youtube, 'youtube')} />: null} */}
                      </div>
                    </div>
                  </div>
                  <Sidebar category_values={category_values.slice(0, 5)}/>
                </div>

                <div className={"my-10"} ref={offeringsPremiumSection}>
                  {Object.keys(premium_offers_types).length > 0 ? <div className="pt-12 pb-2 mx-0 border-b sm:mx-4 MainOfferingValue border-very-light-grey">
                    <h3>Premium Offerings</h3>
                  </div>:null}
                  <div>{Object.keys(premium_offers_types).map((key) => <div className="py-12 mx-0 border-b sm:mx-4 last:border-b-0 border-very-light-grey" key={key}>
                    <div className="flex justify-between pb-3">
                      <h3 className="">{key}</h3>
                      {/* <button className="px-4 text-sm text-center text-white truncate bg-dark-blue">View all {key} Presets</button> */}
                    </div>
                    <div className="grid person-flex mt-6 justify-items-center gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
                    {premium_offers_types[key].map((value) => <div key={value.name} className="">
                        <Image src={value.imagelink? value.imagelink: No_image.src} alt={value.name} className="w-48 h-40 sm:w-64 sm:h-56"  width={256} height={224} onError={({ currentTarget }) => {
                          currentTarget.onerror = null; 
                          currentTarget.src=No_image.src;
                        }} />
                          <div className="pt-3 text-large text-denim">{value.name}</div>
                          <div className="flex flex-row flex-wrap items-center space-x-2">
                          <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Offering Rating: </div>

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
                            <div className="text-denim">{value.count ? `"${value.count}"`:null}</div>
                          </div>
                        <div className="w-48 text-sm text-dim-grey">{value.description}</div>
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
                      <Image src={value.imagelink? value.imagelink: No_image.src} alt={value.name} className="w-48 h-40 sm:w-64 sm:h-56"  width={256} height={224}  onError={({ currentTarget }) => {
                        currentTarget.onerror = null; 
                        currentTarget.src=No_image.src;
                      }} />
                        <div className="text-large text-black ">{value.name}</div>
                        <div className="w-48 text-sm text-dim-grey">{value.description}</div>
                        <div className="pt-2">
                          <div className="px-2 py-2 text-xs text-center text-white no-underline truncate sm:px-4 sm:py-2 sm:text-sm bg-dark-blue"><Link href={value.link}  target="_blank" rel="noopener noreferrer nofollow">See Price{value.linkName}</Link></div>
                        </div>
                    </div>)}
                    </div>
                  </div>)}
              </div>
              {/* <div className={(urlType === 'reviews')? "my-8" : "hidden" }> */}
              <div className={"my-10"} ref={reviewsSection}>
                <div>
                  {(session)?
                  <UserReview IndividualId={Individual_values.id} editable={false} UserReviewSelect={UserReviewSelect}/>
                  :     <div className="p-4 bg-light-grey marginb-50">
                  <h5 className="mb-4 font-bold">Leave a review on their offerings</h5>    <button
                  onClick={()=> window.location.href='/directory/login'}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent bg-dark-blue"
                  >
                  Sign in to leave a review!
                  </button></div>
                  }
                  <div className="flex flex-col gap-8 md:flex-row">
                    <div className="md:w-1/2">
                      <h5 className="mb-6 font-bold">All Reviews</h5>
                      <div className="flex flex-row">
                        <div className="flex flex-col items-center justify-center w-1/4 ">
                          <h3 className="font-values-big font-bold">{Individual_values.avg}</h3>
                          <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Educator Rating: </div>
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
                                  <Image src={star.src} width={25} height={25} alt='star'/>
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
                    {(!UserSignUp || session) ? <>
                    {reviewAll.slice(0, showMoreReview.itemsToShow).map((rev) => <ReviewsComponent reviews={rev} key={rev.id} IndividualID={Individual_values.id} ReviewEngagement={ReviewEngagement.find((e) => e.reviewid === rev.id)} session={session}/>)}
                    <div className="border-t-2 -mt-0.5 border-white">
                      <div className="flex mr-auto truncate lg:w-2/12">
                        <div onClick={reviewShowMore} className={`items-center justify-center px-4 py-1.5 text-center text-green-vogue cursor-pointer border border-green-vogue ${reviews.length - showMoreReview.itemsToShow <= 0 ? "hidden" : 0}`}>Load More Review</div>
                      </div>
                    </div>
                    </>:
                    <>
                    <div onClick={() => signIn()} className="flex justify-center px-6 pt-4 pb-6 mt-1 border rounded-md cursor-pointer border-green-vogue">
                      <div className="space-y-1 text-center">
                        <h5 className="mb-0 cursor-pointer">Login to See Reviews</h5>
                      </div>
                    </div>
                    </>}
                  </div>
                </div>
              </div>
            </main>
        </div>
      </div>
  );
}


export async function getStaticProps(ctx) {
  const cleanWordChartIndividual = (wordChartIndividual) => {

    let sub_bucket_obj = {}
    let sub_bucket_count = {}
    wordChartIndividual.map(item => {
      const sub_bucket = item.sub_bucket;
      const videoid = item.videoid;
      const title = item.title;
      const thumbnail = item.thumbnail;
      const parent = item.parent;
      const embedUrl = `https://www.youtube.com/embed/${videoid}?autoplay=0&showinfo=0`;
      sub_bucket_count[sub_bucket] = sub_bucket_count[sub_bucket] || [];
      if (!sub_bucket_count[sub_bucket].includes(videoid)) {
        sub_bucket_count[sub_bucket].push(videoid);
      }
      if (!sub_bucket_obj[sub_bucket]) {
        sub_bucket_obj[sub_bucket] = { [parent]: { [videoid]: {title, thumbnail, embedUrl} } };
      } else if (sub_bucket_obj[sub_bucket][parent]) {
        sub_bucket_obj[sub_bucket][parent][videoid] = {title, thumbnail, embedUrl};
      } else {
        sub_bucket_obj[sub_bucket][parent] = { [videoid]: {title, thumbnail, embedUrl} };
      }
    });
    let final_sub_list = Object.keys(sub_bucket_obj).map((obj_key) => ({parents: Object.keys(sub_bucket_obj[obj_key]).map((parent) => ({parent: parent, values: sub_bucket_obj[obj_key][parent], count: Object.keys(sub_bucket_obj[obj_key][parent]).length})).sort((a, b) => b.count - a.count), sub_bucket: obj_key, expanded: false, count: sub_bucket_count[obj_key].length}))
    const _sum = final_sub_list.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0);
    const final_sub_list_with_avg = final_sub_list.map((e) => ({...e, avg: Math.round(e.count * 100 / _sum)}))
    const final_sub_list_sorted = final_sub_list_with_avg.sort((a, b) => b.count - a.count);

    return final_sub_list_sorted.slice(0, 15)
  }
  const IndividualID = ctx.params.id
  // let session_backend = await getSession(ctx);
  var session_backend =  null;
  const Individual_values = await client.query({query:LOAD_INDIVIDUAL_PAGE, variables: { linkname: IndividualID, session: session_backend }})
  let free_offers = Individual_values.data.getEachIndividual.free_offers;
  let free_content = Individual_values.data.getEachIndividual.free_content.map((e) => ({...e, embedUrl: `https://www.youtube.com/embed/${e.url.split('watch?v=')[1]}?autoplay=0&showinfo=0`, thumbnail: `https://img.youtube.com/vi/${e.url.split('watch?v=')[1]}/0.jpg`}))
  let category_values_clean = Individual_values.data.getEachIndividual.similar_Individual.rows.filter((e) => e.linkname != IndividualID)
  let wordChartIndividual = Individual_values.data.getEachIndividual.YoutubeFieldsObject
  wordChartIndividual = wordChartIndividual ? cleanWordChartIndividual(wordChartIndividual) : [];
  // console.log('wordChartIndividual: ', wordChartIndividual)
  // const clean_individual_values = Individual_values.data.getEachIndividual.rows[0]
  // const category_values = await client.query({query:CATEOGORIES_PAGE, variables: { categoryName: clean_individual_values.category, subcategory: clean_individual_values.subcategory[0], offset: 0, }})
  // const category_values_clean = category_values.data.getCategoryPage.rows.filter((e) => e.linkname != IndividualID)
  if(free_offers.length > 0) 
    free_offers = free_offers[0] 
  return {
    props: {
      Individual_values: Individual_values.data.getEachIndividual.rows[0],
      premium_offers: Individual_values.data.getEachIndividual.premium_offers,
      reviews_offer: Individual_values.data.getEachIndividual.reviews,
      category_values: category_values_clean,
      free_content: free_content,
      free_offers,
      wordChartIndividual,
      favorites: Individual_values.data.getEachIndividual.favorites,
      IndividualID
    },
    revalidate: 1200, // In seconds
  }

}

export async function getStaticPaths() {

  const all_values = await client.query({query:LOAD_STATIC_DIRECTORY, variables: { types: 'individual' }})
  const individual = all_values.data.getEachStaticPathDirectory.individual
  var paths = individual.map((parent) => ({params: {id: parent}}))


  return { paths, fallback: false }

}