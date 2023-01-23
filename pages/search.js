import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head'
import { useRouter } from 'next/router';
import {Rating} from '@mui/material';
import ImageWithFallback from '../components/Image/Image';
import styles from '../styles/Home.module.css';
import SearchDisplayVideos from '../components/search/SearchDisplayVideos'

export default function SearchFunction() {
    // const [userFollow, setUserFollow] = useState([])
    const [youtubeChannel, setYoutubeChannel] = useState([]);
    const [youtubeKeywords, setYoutubeKeywords] = useState([]);
    const [FormDetails, setFormDetails] = useState('');

    const router = useRouter();
    const {query} = router.query;
    const getChannelValues = async () =>{

        // console.log(query, router.query)
        const res = await axios.post(`/api/search/search`, { keyword: query });
        const data = res.data;
        if(data.youtubeChannel.length === 0) return setFormDetails('No Results found');
        setYoutubeChannel(data.youtubeChannel)
        setYoutubeKeywords(data.youtubeKeywords)
        
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
            <div className="py-12 mx-auto max-w-7xl">
                <div className="items-center px-4 sm:px-0 sm:-mt-14 sm:col-span-4 xl:ml-28 min-height-200">
                <div className="items-center">
                    <div className="text-xl font-semibold truncate md:text-3xl mt-5">{FormDetails}</div>
                    {
                        youtubeChannel.map((yc) => 
                        <div key={yc.id} className="py-6 border-b border-very-light-grey ">
              
                            <div className="inline-block">

                                <div className="">  
                                    <Link href={`/directory/person/${yc.linkname}/?query=${query}`}><div className="person-flex flex-row space-x-3 flex-nowrap md:pt-7"> 
                                        <div className="self-start inline-block">
                                            <ImageWithFallback src={yc.imagelink} className={styles.IndividualImage} width={60} height={60} fallbackSrc={"/fallbackimage.svg"}/>
                                        </div>
                                        <h1  className="text-xl font-semibold truncate md:text-3xl inline-block">{yc.first_name + ' ' + yc.last_name} </h1>
                                        {yc.aka ? <h2  className="text-sm md:text-lg text-dim-grey inline-block padding-top-10 pt-phone-5 truncate">{`"${yc.aka}"`}</h2>:null}
                                        <div className="flex space-x-3 sm:flex-row sm:flex-wrap padding-top-8 pt-phone-0">
                                            {/* <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Educator Rating: </div> */}
                                            <Rating name={yc.first_name + yc.last_name} value={parseFloat(yc.avg)} precision={0.5} sx={{
                                                        color: "yellow",
                                                        borderRadius: '10px',
                                                        '& .MuiSvgIcon-root': {
                                                        fill: '#F8DC81',
                                                        },
                                                        '& .css-dqr9h-MuiRating-label': {
                                                        display: 'block'
                                                        }                        
                                                    }} readOnly/>
                                            <div className={styles.inline_block}>{yc.avg}</div>
                                            <div className={styles.inline_block}>({yc.count})</div>
                                            <div className="inline-block text-dim-grey">keyword Match: {yc.match_rate * 100}%</div>
                                        </div>
                                    </div></Link>
                                    <div className="margin-left-70-0">
                                        <div className="inline-block">
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
                                        <div className="space-y-3 sm:space-x-3 md:flex font-weight-500 font-size-14 margin-top-bottom-10">Matching Content: </div>
                                        <SearchDisplayVideos youtubeKeywords={youtubeKeywords} youtube_channel={yc} query={query}/>
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