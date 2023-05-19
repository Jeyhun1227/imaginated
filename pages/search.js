import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head'
import { useRouter } from 'next/router';
import {Rating} from '@mui/material';
import ImageWithFallback from '../components/Image/Image';
import styles from '../styles/Home.module.css';
import SearchDisplayVideos from '../components/search/SearchDisplayVideos'
import Star from '../public/star.svg';
import {ColorRing} from 'react-loader-spinner'

export default function SearchFunction() {
    // const [userFollow, setUserFollow] = useState([])
    const [youtubeChannel, setYoutubeChannel] = useState([]);
    const [youtubeKeywords, setYoutubeKeywords] = useState([]);
    const [youtubeSubs, setYoutubeSubs] = useState([]);
    const [FormDetails, setFormDetails] = useState('');
    const [premiumOfferings, setPremiumOfferings] = useState([]);

    const router = useRouter();
    const {query} = router.query;

    const resetValues = () => {
        setFormDetails('No Results found');
        setYoutubeChannel([])
        setYoutubeKeywords([])
        setYoutubeSubs([])
        setPremiumOfferings([])
    }
    const getChannelValues = async () =>{
        const res = await axios.post(`/api/search/search`, { keyword: query });
        const data = res.data;
        if(data.youtubeChannel.length === 0) return resetValues()
        let mainSumValue = data.youtubeChannel.map((e) => e.match_rate).reduce((e, prev) => e + prev, 0)
        let mainYoutubeChannel = data.youtubeChannel.map((e) => ({...e, match_rate: Math.round((e.match_rate / mainSumValue) * 100)}))
        setYoutubeChannel(mainYoutubeChannel)
        setYoutubeKeywords(data.youtubeKeywords)
        setYoutubeSubs(data.youtubeSubs)
        setPremiumOfferings(data.premiumOfferings)
    }

    useEffect( () => {
        if(query) getChannelValues()
      }, [query]);




    return (
        <div >
          <Head>
            {/* <title>{`Learn ${props.subcategoryName} from Experts | Imaginated`}</title>
            <meta name="description" content={`Learn ${props.subcategoryName} from credible educational creators. Compare reviews and explore their offerings, all on one page.`}/>
            <link rel="canonical" href={`https://www.imaginated.com/directory/${routerID}/Learn-${props.subcategoryName.replace(' ', '-')}/`} />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/> */}
          </Head>

          <div className="">
            <div className="mx-auto max-w-7xl">
                <div className="items-center px-4 sm:px-0 sm:col-span-4 min-height-200">
                <div className="items-center">
                    {FormDetails ? <div className="text-xl font-semibold truncate md:text-3xl mt-5">{FormDetails}</div>:null}
                    {!FormDetails && youtubeChannel.length === 0 ? <div  className="inline-block align-content-center  mt-5"><ColorRing
                            visible={true}
                            height="120"
                            width="120"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"

                            colors={["#214499", "#215d99", "#1b4c8c", "#256ea6", "#218150"]}
                        /></div>:null
                    }
                    {
                        youtubeChannel.map((yc) => 
                        <div key={yc.id} className="padding-tb-50 border-b border-very-light-grey ">
              
                            <div className="">

                                <div className="">  
                                    <Link href={`/directory/person/${yc.linkname}/?query=${query}`}><div className="search-each-result"> 
                                        <div className="self-start inline-block">
                                            <ImageWithFallback alt={yc.first_name + yc.last_name} src={yc.imagelink} className={styles.IndividualImage} width={60} height={60} fallbackSrc={"/fallbackimage.svg"}/>
                                        </div>
                                        <div>
                                        <h1  className="text-xl font-semibold truncate md:text-3xl inline-block">{yc.first_name + ' ' + yc.last_name} </h1>
                                        {yc.aka ? <h2  className="text-sm md:text-lg text-dim-grey inline-block padding-top-10 pt-phone-0 truncate margin-left-10-desktop">{`"${yc.aka}"`}</h2>:null}
                                        <div className="flex sm:flex-row sm:flex-wrap pt-phone-0 text-sm text-md-mobile">
                                            <ImageWithFallback alt='star rating' src={Star}/>
                                            {/* <Rating name={yc.first_name + yc.last_name} value={parseFloat(yc.avg)} precision={0.5} sx={{
                                                        color: "yellow",
                                                        borderRadius: '10px',
                                                        '& .MuiSvgIcon-root': {
                                                        fill: '#F8DC81',
                                                        },
                                                        '& .css-dqr9h-MuiRating-label': {
                                                        display: 'block'
                                                        }                        
                                                    }} readOnly/> */}
                                            <div className='margin-left-5'>{yc.avg}</div>
                                            <div className='margin-left-5'>({yc.count})</div>
                                            <div className="inline-block text-dim-grey margin-left-5">Keyword Match: {yc.match_rate}%</div>
                                        </div>
                                        </div>
                                    </div></Link>
                                    <div className="margin-top-20">
                                        <div className="">
                                        <div className="hidden space-y-3 sm:space-x-3 md:flex font-weight-500 font-size-14">Categories: </div>
                                        <div className="hidden space-y-3 sm:space-x-3 md:flex">
                                        {yc.subcategory.slice(0, 3).map((e) => <Link
                                            href={'/directory/' + yc.category + '/Learn-' + e.replace(' ', '-')}
                                            key={e}
                                            className="flex items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</Link>)}
                                        <div className={`items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke ${yc.subcategory.length - 3 <= 0 ? "hidden" : 0}`}>+{yc.subcategory.length - 3} more</div>
                                        </div>
                                        <div className="block col-span-5 md:hidden">
                                            <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Categories: </div>
                                            <div className="flex flex-wrap space-y-3 md:hidden sm:space-x-3">
                                            {yc.subcategory.slice(0, 3).map((e) => <Link
                                                href={'/directory/' + yc.category + '/Learn-' + e.replace(' ', '-')}
                                                key={e}
                                                className="flex items-center justify-center px-1 py-1 mt-2 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke">{e}</Link>)}
                                            <div  className={`flex items-center justify-center px-1 py-1 mt-2 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke ${yc.subcategory.length - 3 <= 0 ? "hidden" : 0}`}>+{yc.subcategory.length - 3} more</div>
                                            </div>
                                        </div>  
                                        <SearchDisplayVideos youtubeKeywords={youtubeKeywords} youtube_channel={yc} query={query} youtubeSubs={youtubeSubs} premiumOfferings={premiumOfferings}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>

              </div>

            </div>
          </div>
    </div>
    );
}
// export async function getServerSideProps({ query }) {
//     const { q } = query;
//     const res = await axios.post(`/search`, { query: q });
//     const data = res.data;
//     return {
//       props: {
//         data
//       }
//     };
//   }
// export async function getStaticProps({params}){
//     const routerID = params.id
//     const subcategory = params.subcategory.replace('Learn-', '').replace('-', ' ')
//     const Subcategory_values = await client.query({query:CATEOGORIES_PAGE, variables: { categoryName: routerID, subcategory, offset: 0}})
//     // console.log('category_values.error:', category_values.error)

//     return {
//       props: {
//         Subcategory_values: Subcategory_values.data.getCategoryPage.rows,
//         subcategory: Subcategory_values.data.getCategoryPage.subcategory,
//         subcategoryName: subcategory,
//         routerID
//       },
//       revalidate: 1200, // In seconds
//     }
// }

// export async function getStaticPaths() {

//   const all_values = await client.query({query:LOAD_STATIC_DIRECTORY, variables: { types: 'subcategory' }})
//   const subcategory = all_values.data.getEachStaticPathDirectory.subcategory
//   var paths = subcategory.map((parent) => ({params: {id: parent.categoryname, subcategory: 'Learn-' + parent.subcategory.replace(' ', '-')}}))

//   return { paths, fallback: false }

// }