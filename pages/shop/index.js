import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Head from 'next/head';
import parse, { domToReact } from 'html-react-parser';


export default function SubCategoryBlogMain( {post, metadata} ){

      
    return (
        <div>
            <Head>
              {parse(metadata)}
            </Head>
            <div className="grid-container-blog">
                <h1 className='shop-title'>Shop</h1>
                {post.map((e) => <div key={e.id} className="blog-each-post">
                    <Link href={e.uri}><a>
                    <div className='shop-post-image'><Image src={e.featuredImage} width={350} height={350}/></div>
                    <h3 className='blog-title'>{e.title}</h3></a></Link>
                </div>)} 
            </div>
        </div>
    )

}

export async function getStaticProps(context) {
    let metadata_raw = await axios.get(`https://www.imaginated.com/wp-json/rankmath/v1/getHead?url=https://www.imaginated.com/shop`)
    let metadata = metadata_raw.data.head;
    return {
        props: {
            metadata,
            post: [
                {id: 1, uri: '/shop/lightroom-presets', title: 'Free & Premium Lightroom Presets', featuredImage: 'https://www.imaginated.com/wp-content/uploads/2022/07/bigstock-beautiful-brunette-woma-600x550.jpg.webp'},
                {id: 2, uri: '/shop/photo-overlays', title: 'Photo Overlays', featuredImage: 'https://www.imaginated.com/wp-content/uploads/2022/07/gdfhfg1.jpg.webp'},
                {id: 3, uri: '/shop/photoshop-actions', title: 'Photoshop Actions', featuredImage: 'https://www.imaginated.com/wp-content/uploads/2022/07/3-1-600x600.jpg.webp'}
            
        ],
        },
    }

}
