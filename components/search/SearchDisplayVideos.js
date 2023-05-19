import React, { useState, useEffect } from "react";
import ImageWithFallback from '../Image/Image';
import {PlayFill} from 'react-bootstrap-icons';
import Link from 'next/link'
import Video_extra from '../../public/video-extra.svg'
import YoutubePlayButton from '../../public/youtube-play-button.svg'
import HorizontalStackedBarChart from '../Person/BarChart';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import hex_colors_list from '../Colors/HexColorSub.json';
import Router from 'next/router';


export default function SearchDisplayVideos({youtubeKeywords, youtube_channel, query, youtubeSubs, premiumOfferings}) {
    const [youtubeKeywordsVal, setYoutubeKeywordsVal] = useState([]);
    const [youtubeSubsVal, setYoutubeSubsVal] = useState([]);
    const [premiumOfferingsVal, setPremiumOfferingsVal] = useState([]);
    // console.log('youtubeKeywords: ', youtubeKeywords)
    // const hex_colors_list = ["#214499", "#215d99", "#216950", "#217599", "#218150", "#218d98", "#219150", "#219599"]

    useEffect( () => {
        setYoutubeKeywordsVal(youtubeKeywords.filter((e) => youtube_channel.channelId === e.channelId))
      }, [youtubeKeywords]);
    
    useEffect( () => {
        setYoutubeSubsVal(youtubeSubs.filter((e) => youtube_channel.channelId === e.channelId))
      }, [youtubeSubs]);

    useEffect( () => {
        setPremiumOfferingsVal(premiumOfferings.filter((e) => youtube_channel.individualid === e.individual))
    }, [premiumOfferings]);
    
    const getMaxValue = () => {
        if(windowDimensions.width > 850){
            if(youtubeKeywordsVal.length > 3) return 2;
        } else{
            if(youtubeKeywordsVal.length > 2) return 1;
        }
        return youtubeKeywordsVal.length
    }
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    }
    const [windowDimensions, setWindowDimensions] = useState({});
  
    useEffect(() => {
      function handleResize() {
        let WindowTemp = getWindowDimensions();
        setWindowDimensions(WindowTemp);
      }
      setWindowDimensions(getWindowDimensions());
  
      window.addEventListener('resize', handleResize);
      () => window.removeEventListener('resize', handleResize);
    }, [])
    const putMainClickedBucket = async (category) => {
        Router.push(`/directory/person/${youtube_channel.linkname}/?category=${category}`)
    }

    const categoryClicked = async () => {

    }

    return (
        <div className="grid-layout-repeat-2-1 grid-gap-20">
            <div >
                <div className="search-header-main">Matching Content: </div>

                <div className="grid-layout-repeat-2 grid-gap-20">
                    {youtubeKeywordsVal.slice(0,4).map((e) => 
                        <div key={e.id} className="py-2" >
                            <Link href={{pathname: `/directory/person/${youtube_channel.linkname}`, query: { query: query, videoid:e.videoid }}}>
                                <div >
                                    <div className="position-relative">
                                    {/* <div><PlayFill className="fa-9x position-absolute z-index-5 play-button fill-dark-red" size={50}/></div> */}
                                    <ImageWithFallback src={YoutubePlayButton} width={53} height={42} alt={'youtube play button'} className='fa-9x position-absolute z-index-5 play-button' />
                                    <ImageWithFallback src={e.thumbnail.replace('default.jpg', 'mqdefault.jpg')} width={355} height={200} fallbackSrc={"/fallbackimage.svg"}/>
                                    </div>
                                    <div className="text-small no-underline sm:text-base md:text-lg text-denim indiv-youtube-video-each">{e.title}</div>
                                </div>

                            </Link>
                        </div>)}
                </div>
            </div>
            <div>
            {premiumOfferingsVal.length === 0 ? <div>
                <div  className="search-header-main">Content Breakdown: </div>
                <HorizontalStackedBarChart getChart categoryClicked={categoryClicked} putMainClickedBucket={putMainClickedBucket} sub_bucket_list={youtubeSubsVal}/>
                {youtubeSubsVal.map((each_bucket, index) => <div key={each_bucket.sub_bucket}>
                    <Accordion TransitionProps={{ unmountOnExit: true }} expanded={false} onChange={() => putMainClickedBucket(each_bucket.sub_bucket)}>
                        <AccordionSummary
                        expandIcon={<NavigateNextIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <div className="accordion-circle" style={{backgroundColor: index > 5 ? 'rgba(0, 0, 0, 0.1)': hex_colors_list[each_bucket.sub_bucket]}}></div>
                                <div>
                                    <div>{each_bucket.sub_bucket}</div>
                                <div>
                                    {/* <div className='inline-block font-size-14 text-dim-grey margin-right-10'>{each_bucket.avg}%</div> */}
                                    <div className='inline-block font-size-14 text-dim-grey'>{each_bucket.count} videos</div>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                </div>)}
            </div>: <div>
                <div  className="search-header-main">Premium Offerings: </div>
                <div className="grid-layout-repeat-2 grid-gap-20">
                    {premiumOfferingsVal.slice(0,4).map((e) => 
                            <div key={e.id} className="py-2" >
                                <Link href={{pathname: `/shop/${e.name.toLowerCase().replace(/\s+/g, "-")}`}}>
                                    <div >
                                        <div className="position-relative">
                                        <ImageWithFallback src={e.imagelink} width={355} height={200} fallbackSrc={"/fallbackimage.svg"}/>
                                        </div>
                                        <div className="text-small no-underline sm:text-base md:text-lg text-denim indiv-youtube-video-each">{e.name}</div>
                                    </div>

                                </Link>
                            </div>)}
                </div>
            </div>}
            </div>

            </div>
    );
}