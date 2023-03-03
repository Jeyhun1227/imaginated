
import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import Image from 'next/image'
import { styled } from "@mui/material/styles";
import MobilePopup from './MobilePopup';
import DesktopPopup from './DesktopPopup';

const useStyles = styled((theme) => ({
  dialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '25%',
  },
  iframe: {
    width: '100%',
    height: '100%',
  },
}));



export default function IndividualYoutube({WordIndividualFound, link, name, scroll_down, showVideoId, showVideoIdChange}) {

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
          setWindowDimensions(getWindowDimensions());
        }
        setWindowDimensions(getWindowDimensions());
    
        window.addEventListener('resize', handleResize);
        () => window.removeEventListener('resize', handleResize);
      }, [])
    // const freeContentSubFind = () => {
    //     let all_subs = []
    //     free_content.map((e) => {
    //         if(!e) return;
    //         e.subcategory.map((v) => !all_subs.includes(v) ? all_subs.push(v): null)
    //     })
    //     return all_subs
    // }
    
    // const free_content_filter_func = (subcategory) => {
    //     return free_content.filter(e => e.subcategory.includes(subcategory))
    // }

    // const [free_content_subcategory, setfree_content_subcategory] = useState(freeContentSubFind);
    // const [free_content_filtered, setfree_content_filtered] = useState(free_content);
    // const [selectedSubcategoryVideo, setSelectedSubcategoryVideo] = useState(free_content_subcategory[0]);

    // useEffect(() => {
    //   setfree_content_filtered(free_content)
    // }, [free_content]);  
    const myRef = useRef(null)

    // const executeScroll = () => myRef.current.scrollIntoView()
    // useEffect(() => {
    //   if(scroll_down) executeScroll()
    // }, [scroll_down]); 


    return (
        <div className="no-underline font-normal sm:text-2xl text-xl text-denim padding-top-20"><Link href={link} target="_blank" rel="noopener noreferrer nofollow">
            <div className="flex flex-row space-x-2"><Image src='/Youtube.svg' width={13} height={15}/> <div className="text-sm text-dim-grey ">Youtube</div></div>
            {name}
        </Link>
          <div className={"my-10"}>
            <div className="indiv-gallery-parent" ref={myRef}>{windowDimensions.width > 800 ? <DesktopPopup WordIndividualFound={WordIndividualFound} showVideoId={showVideoId} showVideoIdChange={showVideoIdChange}/>:
            <MobilePopup showVideoId={showVideoId} showVideoIdChange={showVideoIdChange}/>}
            </div>
          </div>
        </div>
    );
}