import React, { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import {LOAD_INDIVIDUAL_PAGE} from '../../../GraphQL/Queries/Individual';
import client from '../../../components/GraphQL';
import {Select, MenuItem, Rating} from '@mui/material';
import { Bookmark, ExclamationCircle, ShareFill } from 'react-bootstrap-icons';


export default function IndividualPageMain({Individual_values, premium_offers, free_offers, reviews, favorites}) {
  
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


  return <div className= "mx-auto max-w-7xl">
        <main className="pt-2 px-2 mt-2.5">
          <div className="flex flex-row flex-wrap space-x-3">
            <a href="/" className="inline-flex items-center justify-center">  
              <img className="content-center h-4" src='/home.svg'/>
            </a>
            <div className="inline-flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 fill-very-light-grey" viewBox="0 0 20 20" fill="very-light-grey" stroke="#CECECE" stroke-width="1">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <a href="#" className="inline-block ml-2 no-underline text-whisper" >Course</a>
            <div className="inline-flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 fill-very-light-grey" viewBox="0 0 20 20" fill="very-light-grey" stroke="#CECECE" stroke-width="1">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div className="inline-block ml-2.5 text-dark-blue font-semibold">Profile</div>
          </div>
          <div className="grid items-center grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-y-6 justify-items-start">
            <div className="self-start mt-6">
              <img src={Individual_values.imagelink} className={styles.IndividualImage}/>
            </div>
            <div className="col-span-1 mt-6 space-y-3 md:mt-0 sm:col-span-2 md:col-span-6 lg:col-span-9 grid-row-4">  
              <div className="flex flex-row flex-wrap space-x-3"> 
                <h2  className="font-semibold md:text-3xl text:xl md:pt-7">{Individual_values.first_name + ' ' + Individual_values.last_name} </h2>
                <div className="inline-flex items-center justify-center pl-3 md:pt-7"> 
                  <ShareFill className="w-3.5 h-3.5 fill-dark-blue"/>
                </div> 
              </div>
              <div className="flex space-x-3 sm:flex-row sm:flex-wrap">
                <Rating name={Individual_values.first_name + Individual_values.last_name} value={parseFloat(Individual_values.avg)} precision={0.5} readOnly/>
                <div className={styles.inline_block}>{Individual_values.avg}</div>
                <div className={styles.inline_block}>({Individual_values.count})</div>
              </div>
              <div className="hidden space-y-3 sm:space-x-3 md:flex">
                {Individual_values.subcategory.map((e) => <a href={'/category/' + Individual_values.category + '/' + e} key={e} className="flex items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</a>)}
              </div>
              <div className="hidden md:flex">
                <button className="inline-flex items-center px-2 py-1 underline text-dark-blue bg-light-grey" href={'/claim-listing'}>
                  <ExclamationCircle className="w-3.5 h-3.5 mr-2 "/>
                  Claim Profile</button>
              </div>
            </div>
            <div className="block col-span-5 md:hidden">
              <div className="flex flex-row space-y-3 md:hidden sm:space-x-3">
                {Individual_values.subcategory.map((e) => <a href={'/category/' + Individual_values.category + '/' + e} key={e} className="flex items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</a>)}
              </div>
              <div className="flex mt-4 md:hidden">
                <button className="inline-flex items-center px-2 py-1 underline text-dark-blue bg-light-grey" href={'/claim-listing'}>
                  <ExclamationCircle className="w-3.5 h-3.5 mr-2 "/>
                  Claim Profile</button>
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
          <Row className="border-b border-very-light-grey">
            <div>
              <div onClick={(e) => chanUrlType('')} className={urlType ? styles.IndividualSubHeaders : styles.IndividualSubHeadersClicked }>
                About
              </div>
              <div onClick={(e) => chanUrlType('offerings')} className={urlType === 'offerings' ? styles.IndividualSubHeadersClicked : styles.IndividualSubHeaders}>
                Offerings
              </div>
              <div onClick={(e) => chanUrlType('reviews')}  className={urlType === 'reviews' ? styles.IndividualSubHeadersClicked : styles.IndividualSubHeaders}>
                Reviews
              </div>
              <div onClick={(e) => chanUrlType('favorites')}  className={urlType === 'favorites' ? styles.IndividualSubHeadersClicked : styles.IndividualSubHeaders}>
                Favorites
              </div>
            </div>
          </Row>
          <div className={(!urlType)? null: styles.displayNone}>
            <div className={styles.IndividualGridDescription}>
              <h2>Who is {Individual_values.first_name + ' ' + Individual_values.last_name}?</h2>
              <div className={styles.GridLayoutIndividual}>
                <div className={styles.IndividualGridLayoutDescription}>{Individual_values.description}</div>
              </div>
            </div>
              <div className={styles.IndividualGridLayoutBottom}>
              <div>
                <h2>Featured In</h2>
                <ul>{feature.map((url) => <li key={url}><a  href={url} className={styles.IndividualFeatureEach}>{new URL(url).hostname}</a></li>)}</ul>
              </div>
              <div>
                <h2>Contact Details</h2>
                  {(Individual_values.company)?<div><img src={'/company.svg'}/> {Individual_values.company}</div>:null}
                  {(Individual_values.location)?<div><img src={'/location.svg'}/> Located in {Individual_values.location}</div>:null}
                  {(Individual_values.founder)?<div><img src={'/founded.svg'}/> Founded in {Individual_values.founder}</div>:null}
                  {(Individual_values.link)?<div><img src={'/link.svg'}/><a href={Individual_values.link} className={styles.IndividualFeatureEach}> {Individual_values.link}</a></div>:null}

              </div>
              </div>
            </div>
          <div className={(urlType === 'offerings')? null: styles.displayNone}>
            <h2>Free Offerings</h2>
            <div>
              {free_offers_array.map((e) => <a key={e.name} href={e.link} className={styles.SubcategoryBlock}>
              <div><img src={e.images_name[0]}/> <div>{e.images_name[1]}</div></div>
              {e.name}
              
              </a>)}
            </div>
            <div>{Object.keys(premium_offers_types).map((key) => <div key={key}>
              <h2>{key}</h2>
              <div className={styles.MainOfferingKeys}>
              {premium_offers_types[key].map((value) => <div key={value.name} className={styles.MainOfferingValue}>
                  <img src={value.imagelink? value.imagelink: "/No-image.png"} className={styles.MainOfferingImage}   onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="/No-image.png";
                  }} />
                    <div>{value.name}</div>
                    <Rating name={value.name} value={parseFloat(value.avg)} precision={0.5} readOnly/>
                    <div className={styles.inline_block}>{value.avg}</div>
                    <div className={styles.inline_block}>({value.count})</div>
                  <div>{value.description}</div>
                </div>)}
                </div>
              </div>)}
            </div>
          </div>
          <div className={(urlType === 'reviews')? null: styles.displayNone}>
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
          </div>
          <div className={(urlType === 'favorites')? null: styles.displayNone}>
          {Object.keys(favorites_offers).map((key) => <div key={key}>
              <h2>{key}</h2>
              <div className={styles.MainOfferingKeys}>
              {favorites_offers[key].map((value) => <div key={value.name} className={styles.MainOfferingValue}>
                  <img src={value.imagelink? value.imagelink: "/No-image.png"} className={styles.MainOfferingImage}   onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="/No-image.png";
                  }} />
                    <div>{value.name}</div>
                    <div>{value.description}</div>
                    <a href={value.link} target="_blank">See Price {value.linkName}</a>
                </div>)}
                </div>
              </div>)}
          </div>
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