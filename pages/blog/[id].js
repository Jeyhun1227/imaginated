import Image from 'next/image'
import Link from 'next/link';
import home from '../../public/home.svg';
import React, { useEffect, useState, useRef } from "react";
import parse, { domToReact } from 'html-react-parser';
import YouTube from 'react-youtube';
import Head from 'next/head';
import { ChevronDown, ChevronRight } from 'react-bootstrap-icons';

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
import axios from 'axios';


export default function Post( data ){

    const post = data.post;
    const categories = post.categories.nodes[0]
    var category_all = categories.ancestors ? categories.ancestors.nodes.filter((e) => e.uri):[];
    category_all.push({name: categories.name, uri: categories.uri})
    const author = post.author.node;
    const date = post.modified;
    var today = new Date(date);
    var month = today.toLocaleString('default', { month: 'long' });
    const full_year = month + ' ' + today.getDate() + ', ' + today.getFullYear();
    const [shareUrl, setShareUrl] = useState('');
    const [showGlossary, setShowGlossary] = useState(false);
    const [showDesktopImage, setShowDesktopImage] = useState(false);

    

    const change_glossary = (current_glossary) => {

      setShowGlossary(current_glossary)

      setContent(get_react_Parser(current_glossary))

    }

    const get_react_Parser = (showGlossary) => {
      const options = {
        replace: ({ attribs, children }) => {
            if (!attribs) return;
            if(attribs.src && attribs.src.includes('https://www.imaginated.com/wp-content')){
              // console.log('attribs: ', attribs)

              return <Image src={attribs.src.replace('www.', 'wordpress.')} className={attribs.class} alt={attribs.alt} height={attribs.height} width={attribs.width}/>
            }
            if(attribs.class === 'wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube'){
                var child = children.find((e) => e.attribs.class === 'lyte-wrapper')
                var video_id = child.children[0].attribs.id
                video_id = video_id.split('WYL_')[1]

                const opts = {
                    height: 450,
                    width: 100,
                    playerVars: {
                      autoplay: 0,
                    },
                  };
                  return <div className='wp-content-youtube'><YouTube videoId={video_id} opts={opts}   sandbox="allow-presentation" className="margin-bottom-two"/></div>;
            }
            if(attribs.id === 'ez-toc-container'){
              if(showGlossary){
                return <div  className='ez-toc-v2_0_36_1 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction' id='ez-toc-container' ><div className='glossary-DropDownOpen'><ChevronDown onClick={() => change_glossary(false)} /></div>{domToReact(children, options)}</div>
              }else{
                return <div className='ez-toc-v2_0_36_1 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction' id='ez-toc-container'><div className='glossary-DropDown' onClick={() => change_glossary(true)}><div className='glossary-title'>Table of Contents</div> <div className='glossary-open'><ChevronRight /></div></div></div>

              }

            }

        }
      };
      return parse(post.content, options);
    }
    const [content, setContent] = useState(get_react_Parser());

    useEffect(() => {
        setShareUrl(window.location.href)
        if(window.innerWidth > 650) setShowDesktopImage(true)

      }, []); 
      const ref = useRef(null);

      
    return (
        <div>
        <Head>
          {parse(data.metadata)}
        </Head>
        {(post.content)? <div className="grid-container">
            <div className="site-content">
              <div className="content-area" ref={ref}>
              <div className="flex flex-row flex-wrap space-x-3">
                  <div className="inline-flex items-center justify-center cursor-point">
                  <Link href="/" >  
                  <a ><Image width={18} height={18} className="content-center h-4" src={home.src}/></a>
                  </Link>
                  <div className="inline-flex pointing-right"><ChevronRight/></div>

                  </div>
                  {category_all.map((e, i) => <div key={e.uri}>
                      <div className={(i < category_all.length - 1)?"inline-block ml-2 no-underline text-dark-blue font-semibold cursor-point": "text-whisper inline-block ml-2 no-underline cursor-point"} ><Link href={e.uri}><div>{e.name}</div></Link></div>
                      
                      {(i < category_all.length - 1)? <div className="inline-flex pointing-right"><ChevronRight/>
                      </div>:null}
                  </div>)}
              </div>
              <h1 className="blog-header">{post.title}</h1>
              <div className="margin-bottom-ten"><div className='blog-full-year'>{full_year} by</div><div className='blog-individual-link'><Link href={author.uri}><a>{author.name}</a></Link></div>
              </div>
              {(showDesktopImage)?<div className='Blog-main-images-desktop'>
                {(post.featuredImage)? <div className='Blog-Main-Image'><Image     layout='fill'
                src={post.featuredImage.node.sourceUrl} /></div>:null}
                <div className='margin-bottom-two'>
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
              </div>:<div className='margin-bottom-threeem'></div>}
              <article>{content}</article>
              </div>
              <div className="widget-area sidebar is-right-sidebar" id="right-sidebar">
                <div className="inside-right-sidebar"></div>
              </div>
            </div>
        </div>:<h1>Post Not Found</h1>}</div>
    )

}
export async function getStaticProps(context) {
    const res = await fetch('https://wordpress.imaginated.com/index.php?graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query SinglePost($id: ID!, $idType: PostIdType!) {
                post(id: $id, idType: $idType) {
                  title
                  modified
                  slug
                  content
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                  author {
                    node {
                      name
                      slug
                      uri
                    }
                  }
                  categories {
                    nodes {
                      name
                      slug
                      ancestors {
                        nodes {
                          slug
                          name
                          uri
                        }
                      }
                      parent {
                        node {
                          name
                          slug
                          uri
                        }
                      }
                      uri
                    }
                  }
                }
              }
            `,
            variables: {
                id: context.params.id,
                idType: 'SLUG'
            }
        })
    })

    let metadata_raw = await axios.get('https://wordpress.imaginated.com/wp-json/rankmath/v1/getHead?url=https://wordpress.imaginated.com/blog/' + context.params.id)
    let metadata = metadata_raw.data.head;
    const json = await res.json()

    return {
        props: {
            post: json.data.post,
            metadata: metadata
        },
        revalidate: 1200, // In seconds
    }

}

export async function getStaticPaths() {

    const res = await fetch('https://wordpress.imaginated.com/index.php?graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query AllPostsQuery {
                posts(first: 1000) {
                    nodes {
                    slug
                    }
                }
                
            }
        `})
    })

    const json = await res.json()
    const posts = json.data.posts.nodes;

    const paths = posts.map(post =>({
        params: {id: post.slug},
    }))


    return { paths, fallback: false }

}