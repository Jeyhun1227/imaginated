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


export default function SubCategoryBlogMain( {shopAll, directory, slug, metadata} ){

      
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
                <div className="inline-flex pointing-right"><ChevronRight/></div>

                </div>
                <div className="inline-block ml-2 no-underline text-dark-blue font-semibold cursor-point">
                    <Link href='/shop/lightroom-presets/'>Lightroom Presets</Link>
                    <div className="inline-flex pointing-right"><ChevronRight/></div>
                </div>

                <div className="text-whisper inline-block ml-2 no-underline" ><div>{directory.title}</div></div>
                {/* <div className="text-whisper inline-block ml-2 no-underline" ><div>Lightroom Presets</div></div> */}
            </div>
        <div className="grid-container-blog">
            <div className='shop-title'>
            <h1>{directory.title}</h1>
            <p>{directory.desc}</p>
            </div>
            {shopAll.map((e) => <div key={e.uri} className="blog-each-post">
                <Link href={e.uri}>
                    <div className='shop-post-image'><Image src={e.image} width={350} height={350}/></div>
                    <h3 className='blog-title'>{e.title}</h3></Link>
            </div>)} 
        </div></div>
    );

}

export async function getStaticProps(context) {

    let metadata_raw = await axios.get(`https://wordpress.imaginated.com/wp-json/rankmath/v1/getHead?url=https://wordpress.imaginated.com/shop/lightroom-presets/${context.params.lightroomId}`)
    let metadata = metadata_raw.data.head;
    let shopKeys = Object.keys(Shop);
    let shopURI = shopKeys.filter((e) => e.includes(context.params.lightroomId))
    let shopAll = shopURI.map((e) => ({image: Shop[e].image, title: Shop[e].title, uri: Shop[e].uri}))
    let directory = ShopDirectory[context.params.lightroomId]
    return {
        props: {
            metadata,
            shopAll,
            directory,
            slug: context.params.lightroomId
        },
    }

}

export async function getStaticPaths() {

    let shopKeys = Object.keys(Shop);
    let shopKeysClean = []
    shopKeys.filter((e) => {
        if(e.includes('lightroom-presets')){
            let shopKey = e.replace('/shop/lightroom-presets/', '').split('/')[0];
            if(!shopKeysClean.includes(shopKey)) shopKeysClean.push(shopKey)
        }
    })
    const paths = shopKeysClean.map(sk =>({
        params: {lightroomId: sk},
    }))


    return { paths, fallback: false }

}