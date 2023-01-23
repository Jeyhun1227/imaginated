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

export default function photo_overlays_function( {photo_overlays, metadata} ){

      
    return (
        <div>
            <Head>
              {parse(metadata)}
            </Head>
            <div className="flex flex-row flex-wrap space-x-3 margin-left-top">
                <div className="inline-flex items-center justify-center cursor-point">
                <Link href="/" >  
                <Image className="content-center h-4" width={20} height={20} src={home.src}/>
                </Link>
                </div>
            </div>
        <div className="grid-container-blog">
            <div className='shop-title'>
            <h1>Photo Overlays, Textures & Graphics</h1>
            </div>
            {photo_overlays.map((e) => <div key={e.uri} className="blog-each-post">
                <Link href={e.uri}>
                    <div className='shop-post-image'><Image src={e.image} width={350} height={350}/></div>
                    <h3 className='blog-title'>{e.title}</h3></Link>
            </div>)} 
        </div></div>
    );

}

export async function getStaticProps() {
    let metadata_raw = await axios.get(`https://wordpress.imaginated.com/wp-json/rankmath/v1/getHead?url=https://wordpress.imaginated.com/shop/photo-overlays`)
    let metadata = metadata_raw.data.head;
    let shopKeys = Object.keys(Shop);
    let photo_overlays = shopKeys.map((e) => e.includes('photo-overlays') ? Shop[e] : null)
    photo_overlays = photo_overlays.filter((e) => e)
    return {
        props: {
            metadata,
            photo_overlays
        },
    }

}

