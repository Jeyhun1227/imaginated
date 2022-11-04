import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import home from '../../../public/home.svg';
import { ChevronRight } from 'react-bootstrap-icons';
import axios from 'axios';
import Head from 'next/head';
import parse, { domToReact } from 'html-react-parser';


export default function lightroom_presets( {post, metadata} ){

      
    return (
        <div>
            <Head>
              {parse(metadata)}
            </Head>
            <div className="flex flex-row flex-wrap space-x-3 margin-left-top">
                <div className="inline-flex items-center justify-center cursor-point">
                <Link href="/" >  
                <a ><img className="content-center h-4" src={home.src}/></a>
                </Link>
                <div className="inline-flex pointing-right"><ChevronRight/></div>

                </div>
                <div className="text-whisper inline-block ml-2 no-underline" ><div>Lightroom Presets</div></div>
            </div>
        <div className="grid-container-blog">
            <div className='shop-title'>
            <h1>Lightroom Presets</h1>
            <p>View each preset by category. Currently offering free mobile presets, free desktop presets, and premium presets!</p>
            </div>
            {post.map((e) => <div key={e.id} className="blog-each-post">
                <Link href={e.uri}><a>
                <div className='shop-post-image'><Image src={e.featuredImage} width={350} height={350}/></div>
                <h3 className='blog-title'>{e.title}</h3></a></Link>
            </div>)} 
        </div></div>
    )

}

export async function getStaticProps(context) {
    
    let metadata_raw = await axios.get(`https://www.imaginated.com/wp-json/rankmath/v1/getHead?url=https://www.imaginated.com/shop/lightroom-presets`)
    let metadata = metadata_raw.data.head;
    
    return {
        props: {
            metadata,
            post: [
                {id: 1, uri: '/shop/lightroom-presets/free-mobile-presets', title: 'Free Mobile Presets', featuredImage: 'https://www.imaginated.com/wp-content/uploads/2022/07/coolfantasy1.jpg.webp'},
                {id: 2, uri: '/shop/lightroom-presets/free-desktop-lightroom-presets', title: 'Free Desktop Lightroom Presets', featuredImage: 'https://www.imaginated.com/wp-content/uploads/2022/07/warmenrich1.jpg.webp'},
                // {id: 1, uri: '/shop/lightroom-presets/premium-desktop-presets', title: 'Premium Desktop Presets', featuredImage: 'https://www.imaginated.com/wp-content/uploads/2022/07/done-cover.jpg.webp'}
            
        ],
        },
    }

}
