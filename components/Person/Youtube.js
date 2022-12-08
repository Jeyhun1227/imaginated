
import ImageGallery from 'react-image-gallery';
import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image'


export default function IndividualYoutube({free_content, link, name}) {
    const _renderVideo = (item) => { 
        // console.log("_renderVideo: ", item)
        return <div className="video-wrapper">
                  <div className='wp-content-youtube'>
                    <a
                      className="close-video"
                    ></a>
                    <iframe
                      width="560"
                      height="315"
                      src={item.embedUrl}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                    </div>
                </div>
      }
    const freeContentSubFind = () => {
        let all_subs = []
        free_content.map((e) => {
            e.subcategory.map((v) => !all_subs.includes(v) ? all_subs.push(v): null)
        })
        return all_subs
    }
    
    const free_content_filter_func = (subcategory) => {
        return free_content.filter(e => e.subcategory.includes(subcategory))
    }

    const [free_content_subcategory, setfree_content_subcategory] = useState(freeContentSubFind);
    const [free_content_filtered, setfree_content_filtered] = useState(free_content_filter_func(free_content_subcategory[0]));
    const [selectedSubcategoryVideo, setSelectedSubcategoryVideo] = useState(free_content_subcategory[0]);
    

    return <div className="no-underline font-normal sm:text-2xl text-xl text-denim padding-top-20" ><Link href={link} >
                    <a target="_blank" rel="noopener noreferrer nofollow" ><div className="flex flex-row space-x-2"><Image src='/Youtube.svg' width={13} height={15}/> <div className="text-sm text-dim-grey ">Youtube</div></div>
                    {name}</a>
                    </Link>
                    <div className={"my-10"}>
                              {(free_content_subcategory.length > 1) ?<div className="">
                                {free_content_subcategory.map((e) =>  <div key={e} className={`${(e === selectedSubcategoryVideo)? 'border-selected': ''} inline-block flex items-center justify-center px-1 py-1 mt-0 mr-2 text-base text-center text-black no-underline truncate bg-white-smoke cursor-point`} onClick={() => {setSelectedSubcategoryVideo(e); setfree_content_filtered(free_content_filter_func(e))}}>{e}</div>)}
                              </div>:null}
                              <div className="indiv-gallery-parent"><ImageGallery lazyLoad={true} showFullscreenButton={false} showPlayButton={false}  items={free_content_filtered} renderItem={_renderVideo}/></div>
                              </div>
                    </div>
}