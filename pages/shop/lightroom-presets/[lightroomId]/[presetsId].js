import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import home from '../../../../public/home.svg';
import Shop from '../../../../components/Shop/shop.json';
import ShopDirectory from '../../../../components/Shop/shop-directory.json';
import { ChevronRight } from 'react-bootstrap-icons';
import ImageGallery from 'react-image-gallery';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TwitterShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TwitterIcon
  } from "react-share";
import YouTube from 'react-youtube';
import axios from 'axios';
import Head from 'next/head';
import parse, { domToReact } from 'html-react-parser';

export default function SubCategoryBlogMain( {mainShop, uri, slug, directory, metadata} ){
    const [shareUrl, setShareUrl] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        setShareUrl(window.location.href)
        const options = {
            replace: ({ attribs, children }) => {
                if (!attribs) return;
                if(attribs['data-lazy-src'] && attribs['data-lazy-srcset']){
                    return <Image src={attribs['data-lazy-src']} className={attribs.class} alt={attribs.alt} height={attribs.height} width={attribs.width}/>
                  }                
            }
          };
          setContent(parse(mainShop.page.blog, options));

    }, [])

    const downloadButton = () => {
        console.log('mainShop.page.download: ', mainShop.page.download)
        window.open('https://imaginated-individual-image-public.s3.amazonaws.com/' + mainShop.page.download)
    }

    let images = mainShop.page.image.map((e) => ({original: e, thumbnail: e}))
    return (
        <div>
            <Head>
              {parse(metadata)}
            </Head>
            <div className="grid-container margin-ten-mobile">
                    {/* <div className="content-area" > */}
                        <div className="flex flex-row flex-wrap space-x-3">
                                <div className="inline-flex items-center justify-center cursor-point">
                                <Link href="/" >  
                                <a ><Image className="content-center h-4" width={20} height={20} src={home.src}/></a>
                                </Link>
                                <div className="inline-flex pointing-right"><ChevronRight/></div>

                                </div>
                                <div className="inline-block ml-2 no-underline text-dark-blue font-semibold cursor-point">
                                    <Link href='/shop/lightroom-presets/'><a>Lightroom Presets</a></Link>
                                    <div className="inline-flex pointing-right"><ChevronRight/></div>
                                </div>
                                <div className="inline-block ml-2 no-underline text-dark-blue font-semibold cursor-point">
                                    <Link href={`/shop/lightroom-presets/${uri}`}><a>{directory.title}</a></Link>
                                    <div className="inline-flex pointing-right"><ChevronRight/></div>
                                </div>
                                <div className="text-whisper inline-block ml-2 no-underline" ><div>{mainShop.title}</div></div>
                                {/* <div className="text-whisper inline-block ml-2 no-underline" ><div>Lightroom Presets</div></div> */}
                        </div>
                    {/* </div> */}
                    <div className="main-shop-tab">
                    <ImageGallery items={images}/>
                    <div>
                        <h1 className="blog-header">{mainShop.page.title}</h1>
                        <div className='margin-bottom-two margin-top-forty'>
                        <div className='share-button'>Sharing is caring!</div>
                            <div>
                                <EmailShareButton url={shareUrl} className='margin-right-two'>
                                    <EmailIcon size={40} round={false}/>
                                </EmailShareButton>
                                <FacebookShareButton url={shareUrl} className='margin-right-two'>
                                    <FacebookIcon size={40} round={false}/>
                                </FacebookShareButton>
                                <LinkedinShareButton url={shareUrl} className='margin-right-two'>
                                    <LinkedinIcon size={40} round={false}/>
                                </LinkedinShareButton>
                                <PinterestShareButton url={shareUrl} className='margin-right-two'>
                                    <PinterestIcon size={40} round={false}/>
                                </PinterestShareButton>
                                <RedditShareButton url={shareUrl} className='margin-right-two'>
                                    <RedditIcon size={40} round={false}/>
                                </RedditShareButton >
                                <TwitterShareButton url={shareUrl} className='margin-right-two'>
                                    <TwitterIcon size={40} round={false}/>
                                </TwitterShareButton>
                            </div>
                        </div>
                        <p>{mainShop.page.desc_top}</p>
                        <div className="shop-container"><button onClick={downloadButton} className='shop-download'>Download</button></div>
                    </div>
                    <article className='shop-article-desc'>{content}</article>
                    </div>

                </div>
            </div>        
    )

}

export async function getStaticProps(context) {
    let slug = context.params.presetsId;
    let shopKeys = Object.keys(Shop);
    let key = shopKeys.find((e) => e.includes(slug))

    let metadata_raw = await axios.get(`https://wordpress.imaginated.com/wp-json/rankmath/v1/getHead?url=https://wordpress.imaginated.com/shop/lightroom-presets/${context.params.lightroomId}/${context.params.presetsId}`)
    let metadata = metadata_raw.data.head;

    return {
        props: {
            mainShop: Shop[key],
            metadata,
            uri: context.params.lightroomId,
            slug,
            directory: ShopDirectory[context.params.lightroomId]

        },
    }

}

export async function getStaticPaths() {
    
    let shopKeys = Object.keys(Shop);
    let shopKeysClean = []
    shopKeys.filter((e) => {
        if(e.includes('lightroom-presets')){
            let shopKey = e.replace('/shop/lightroom-presets/', '').split('/')[1];
            let shopValue = e.replace('/shop/lightroom-presets/', '').split('/')[0];
            if(!shopKeysClean.includes(shopKey)) shopKeysClean.push([shopKey, shopValue])
        }
    })
    const paths = shopKeysClean.map(sk =>({
        params: {presetsId: sk[0], lightroomId: sk[1]},
    }))


    return { paths, fallback: false }

}