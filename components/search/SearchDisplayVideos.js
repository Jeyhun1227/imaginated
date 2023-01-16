import React, { useState, useEffect } from "react";
import ImageWithFallback from '../Image/Image';
import {PlayFill} from 'react-bootstrap-icons';
import Link from 'next/link'
import Video_extra from '../../public/video-extra.svg'

export default function SearchDisplayVideos({youtubeKeywords, youtube_channel, query}) {
    const [youtubeKeywordsVal, setYoutubeKeywordsVal] = useState([]);

    useEffect( () => {
        setYoutubeKeywordsVal(youtubeKeywords.filter((e) => youtube_channel.id === e.channel_key))
        // let dimensions = getWindowDimensions()
        // dimensions.width > 850 ? 
      }, [youtubeKeywords]);
    
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

    return ( <div className="grid-layou-repeat-3-2">
        {youtubeKeywordsVal.slice(0,getMaxValue()).map((e) => 
            <div id={e.id} className="py-2" >
                <Link href={{pathname: `/directory/person/${youtube_channel.linkname}`, query: { keyword: query, videoid:e.videoid }}}><a>
                    <div >
                        <div className="position-relative">
                        <div><PlayFill className="fa-9x position-absolute z-index-5 play-button fill-dark-blue" size={50}/></div>
                        <ImageWithFallback src={e.thumbnail.replace('default.jpg', 'mqdefault.jpg')} width={355} height={200} fallbackSrc={"/fallbackimage.svg"}/>
                        </div>
                        <div className="text-small no-underline sm:text-base md:text-lg text-denim">{e.title}</div>
                    </div>
                    </a>
                </Link>
            </div>)}
        {(youtubeKeywordsVal.length - getMaxValue() > 0)? <div className="py-2"><Link href={{pathname: `/directory/person/${youtube_channel.linkname}`, query: { keyword: query }}}><a>
            <div className="position-relative">
                        <div className="fa-9x position-absolute z-index-5  play-button text-xl text-white text-align-center margin-top-23"><div>+{youtubeKeywordsVal.length - getMaxValue()} More</div></div>
                        <ImageWithFallback src={Video_extra.src } width={355} height={200} />
            </div></a></Link>
        </div>:null}
        </div>)
}