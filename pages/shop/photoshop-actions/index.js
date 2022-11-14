import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import home from '../../../public/home.svg';
import { ChevronRight } from 'react-bootstrap-icons';
import Shop from '../../../components/Shop/shop.json';
import ShopDirectory from '../../../components/Shop/shop-directory.json';
import axios from 'axios';
import Head from 'next/head';
import parse, { domToReact } from 'html-react-parser';

export default function photoshop_actions_function( {photoshop_actions, metadata} ){

      
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

                </div>
            </div>
        <div className="grid-container-blog">
            <div className='shop-title'>
            <h1>Free Photoshop Actions – Portraits, Wedding, Frequency Separation</h1>
            <p>These days I use Adobe Lightroom to do most of my photo editing. Shooting in RAW preserves all of the image data captured by the camera with no loss in quality. Lightroom is the most powerful and straightforward way to work with that data.</p>
            <p>However, there are times when I want to get creative in ways that Lightroom can’t accommodate. Enter Adobe Photoshop. Having the ability to work in unlimited layers gives near total control of the creative process. You can edit nearly every aspect of every layer.</p>
            <p>A Photoshop action is a recorded series of steps by the creator. You can then use the recording, a .ATN file, to apply these steps automatically to any photo. I’ve made some sets over the past handful of years, and I’m going to give all of them to you, free.</p>
            </div>
            {photoshop_actions.map((e) => <div key={e.uri} className="blog-each-post">
                <Link href={e.uri}><a>
                <div className='shop-post-image'><Image src={e.image} width={350} height={350}/></div>
                <h3 className='blog-title'>{e.title}</h3></a></Link>
            </div>)} 
        </div></div>
    )

}

export async function getStaticProps() {
    let metadata_raw = await axios.get(`https://wordpress.imaginated.com/wp-json/rankmath/v1/getHead?url=https://wordpress.imaginated.com/shop/photoshop-actions`)
    let metadata = metadata_raw.data.head;

    let shopKeys = Object.keys(Shop);
    let photoshop_actions = shopKeys.map((e) => e.includes('photoshop-actions') ? Shop[e] : null)
    photoshop_actions = photoshop_actions.filter((e) => e)
    return {
        props: {
            metadata,
            photoshop_actions
        },
    }

}

