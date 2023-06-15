import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import home from '../../public/home.svg';
import checkmark from '../../public/checkmark.png';
import { ChevronRight } from 'react-bootstrap-icons';
import ImageGallery from 'react-image-gallery';
import Head from 'next/head';
import {LOAD_PREMIUM_OFFERINGS_PAGE} from '../../GraphQL/Queries/PremiumOfferingPage';
import {LOAD_STATIC_DIRECTORY} from '../../GraphQL/Queries/StaticPaths';
import client from '../../components/GraphQL';
import { signIn, useSession} from "next-auth/react";
import UserReview from '../../components/Form/UserReview';
import {Rating} from '@mui/material';
import star from '../../public/star.svg'
import ReviewsComponent from '../../components/Person/Reviews';
import axios from 'axios';
import Payment_processing from '../../components/Payments/Payment_processing';


export default function MainPremiumPage( {reviews, premium, individual, productID} ){
    const [shareUrl, setShareUrl] = useState('');
    const [alreadyOwned, setAlreadyOwned] = useState(false);
    // const [content, setContent] = useState('');
    const [reviewAll, setreviewAll] = useState([]);
    const [count_each_rating, setcount_each_rating] = useState({});
    const [ReviewEngagement, setReviewEngagement] = useState([]);
    const [ReviewsAvg, setReviewsAvg] = useState(0);

    useEffect(() => {
        setShareUrl(window.location.href)
        let main_reviews_func = reviewsFunc()
        setcount_each_rating(main_reviews_func[2])
        let reviews_avg = reviews.reduce((total, obj) => total + obj.review, 0);
        setReviewsAvg(reviews_avg)
        setreviewAll(main_reviews_func[0])
        getUserFollowing()
    }, [premium, reviews])

    const alreadyOwnedFunc = () => {
        setAlreadyOwned(true)
    }
    const {data: session} = useSession()

    const getUserFollowing = async () => {
        const getUser = await axios.post(`${window.location.origin}/api/User/GetUser/`, {id: premium.individual});
        setReviewEngagement(getUser.data.reviews_engagement)
    }

    const reviewsFunc = () => {
        let temp_count_each_rating = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    
        var getCats = []
        let allreviews = reviews.map((e) => { 
          let date = new Date(Number(e.createdate));
          let createDate_Val = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate() + ', '  +date.getFullYear()
          let premium_name_value = e.premium_name//(e.type === 'Paid')? e.premium_name: reviews_free[e.premium_offer];
          temp_count_each_rating[Math.round(e.review)] += 1
          if(!getCats.includes(premium_name_value)) getCats.push(premium_name_value)
          return {...e, createDate_Val, premium_name_value}
        })
        return [allreviews, getCats, temp_count_each_rating]
    }

    const [showMoreReview, setShowMoreReview] = useState({itemsToShow: 3, expanded: false});
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    const reviewShowMore = () => {
        showMoreReview.itemsToShow === 3 ? (
          setShowMoreReview({ itemsToShow: reviews.length, expanded: true })
        ) : (
          setShowMoreReview({ itemsToShow: 3, expanded: false })
        )
      }
    const buyButton = async() => {
        if(alreadyOwned){
            const response = await axios.post(`${window.location.origin}/api/download/purchased_downloads/`, {productID});
            const res_date = await response.data
            window.location.href = res_date.url;
            // console.log('url: ', url)
        }else{
            setPaymentProcessing(true);
        }

    }

    const paymentProcessingClose = () => {
        setPaymentProcessing(false)
    }


    return (
        <div>
            <Head>
              {/* {parse(metadata)} */}
            </Head>
            <div className="grid-container margin-ten-mobile">
                        <div className="flex flex-row flex-wrap space-x-3">
                                <div className="inline-flex items-center justify-center cursor-point">
                                <Link href="/" >  
                                <Image className="content-center h-4" width={20} height={20} src={home.src} alt='home link'/>
                                </Link>
                                <div className="inline-flex pointing-right"><ChevronRight/></div>
                                </div>

                                <div className="inline-block ml-2 no-underline text-dark-blue font-semibold cursor-point">
                                    <Link href={`/directory/${individual.category}/`}>{individual.category}</Link>
                                    <div className="inline-flex pointing-right"><ChevronRight/></div>
                                </div>
                                <div className="inline-block ml-2 no-underline text-dark-blue font-semibold">
                                    <b>Profile</b>
                                </div>
                        </div>
                    <div className="main-shop-tab">

                    <Payment_processing alreadyOwnedFunc={alreadyOwnedFunc} paymentProcessing={paymentProcessing} paymentProcessingClose={paymentProcessingClose} productID={productID}/>

                    <ImageGallery showFullscreenButton={false} showPlayButton={false} items={[{original: premium.imagelink}]}/>
                    <div>
                        <h1 className="premium-header">{premium.name}</h1>
                        <div className='margin-top-10'>by <Link href={`/directory/person/${individual.linkname}`}>{individual.first_name + ' ' + individual.last_name}</Link></div>
                        <div className='premium-subheader'>{premium.subheader}</div>
                        <div className=""><button onClick={buyButton} className='shop-download inline-block'>{alreadyOwned ? 'Download':'Buy'}</button>
                        <div className='inline-block premium-description'>${premium.price}</div>
                        </div>
                        <div className='margin-top-20'>
                            <Image width={20} height={20} src={checkmark.src} alt='checkmark' className='inline-block margin-right-10'/>
                            <div className='inline-block'>30-day money back gurantee</div>
                        </div>
                        <div className='margin-top-20'>
                            <Image width={20} height={20} src={checkmark.src} alt='checkmark' className='inline-block margin-right-10'/>
                            <div className='inline-block'>Full Lifetime Access</div>
                        </div>
                    </div>
                    <div>
                    <div className="premium-description">Description</div>
                    <article className='premium-description-text'>{premium.description}</article>
                    </div>
                    </div>


                    <div className={"my-10"} >
                        <div>
                            {(session)?
                            <UserReview IndividualId={premium.individual} editable={false} UserReviewSelect={[{name: premium.name, id: premium.id, type: 'Paid'}]}/>
                            :     <div className="p-4 bg-light-grey marginb-50">
                            <h5 className="mb-4 font-bold">Leave a review on this offering</h5>    <button
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
                                    <h3 className="font-values-big font-bold">{ReviewsAvg}</h3>
                                    <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Product Rating: </div>
                                    <Rating className="text-base md:text-2xl" name={premium.name} value={parseFloat(ReviewsAvg)} precision={0.5} sx={{
                                        color: "yellow",
                                        borderRadius: '10px',
                                        '& .MuiSvgIcon-root': {
                                            fill: '#F8DC81',
                                        },
                                        '& .css-dqr9h-MuiRating-label': {
                                        display: 'block'
                                        }                        
                                        }} readOnly/>
                                    <div className="pt-2">{reviews.length} Reviews</div>
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
                            </div>
                            <div className="my-6">
                                <h5 className="font-bold ">Reviews</h5>
                                {reviewAll.slice(0, showMoreReview.itemsToShow).map((rev) => <ReviewsComponent reviews={rev} key={rev.id} IndividualID={premium.individual} ReviewEngagement={ReviewEngagement.find((e) => e.reviewid === rev.id)} session={session}/>)}
                                <div className="border-t-2 -mt-0.5 border-white">
                                <div className="flex mr-auto truncate lg:w-2/12">
                                    <div onClick={reviewShowMore} className={`items-center justify-center px-4 py-1.5 text-center text-green-vogue cursor-pointer border border-green-vogue ${reviews.length - showMoreReview.itemsToShow <= 0 ? "hidden" : 0}`}>Load More Review</div>
                                </div>
                                </div>
                            </div>
                    </div>
              </div>



                </div>
            </div>
    );

}

export async function getStaticProps(context) {
    let slug = context.params.id;
    // console.log('slug: ', slug.replace(/-/g, ' '))
    const individual_page_values = await client.query({query:LOAD_PREMIUM_OFFERINGS_PAGE, variables: { linkname: slug.replace(/-/g, ' ')}})
    const getPremiumOfferingPage = individual_page_values.data.getPremiumOfferingPage
    // console.log('reviews: ', getPremiumOfferingPage)
    // console.log('premium: ', getPremiumOfferingPage.premium)

    return {
        props: {
            slug, reviews: getPremiumOfferingPage.reviews, premium: getPremiumOfferingPage.premium, individual: getPremiumOfferingPage.individual,
            productID: getPremiumOfferingPage.premium.productid

        },
    }

}

export async function getStaticPaths() {

  const all_values = await client.query({query:LOAD_STATIC_DIRECTORY, variables: { types: 'premium' }})
  const premium = all_values.data.getEachStaticPathDirectory.premium
  var paths = premium.map((parent) => ({params: {id: parent.toLowerCase().replace(/\s+/g, "-")}}))
//   console.log('paths: ', paths)
  return { paths, fallback: false }

}