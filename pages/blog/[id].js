import Image from 'next/image'
import Link from 'next/link';
import home from '../../public/home.svg';
import { ChevronRight } from 'react-bootstrap-icons';
import React, { useEffect, useState, useRef } from "react";
import parse, { domToReact } from 'html-react-parser';
import YouTube from 'react-youtube';

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
    const [content, setContent] = useState('');

    const _onReady = (event) =>  {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    useEffect(() => {
        setShareUrl(window.location.href)
        const options = {
            replace: ({ attribs, children }) => {
                if (!attribs) return;
    
                if(attribs.class === 'wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube'){
                    var child = children.find((e) => e.attribs.class === 'lyte-wrapper')
                    var video_id = child.children[0].attribs.id
                    video_id = video_id.split('_')[1]
                    const width = ref.current.offsetWidth;
                    width = width > 850 ? Math.round(width * .7): width;

                    const opts = {
                        height: Math.round(width * .6),
                        width: width,
                        playerVars: {
                          autoplay: 0,
                        },
                      };
                  
                      return <YouTube videoId={video_id} opts={opts} onReady={_onReady} className="margin-bottom-two"/>;
                }
    
            }
          };
          setContent(parse(post.content, options));
        //   console.log('ref.current.offsetWidth: ', ref.current.offsetWidth)
      }, []); 
      const ref = useRef(null);

      
    return (
        <div>{(post.content)? <div className="grid-container">
            <div className="site-content">
            <div className="content-area" ref={ref}>
            <div className="flex flex-row flex-wrap space-x-3">
                <div className="inline-flex items-center justify-center cursor-point">
                <Link href="/" >  
                <a ><img className="content-center h-4" src={home.src}/></a>
                </Link>
                <div className="inline-flex pointing-right"><ChevronRight/></div>

                </div>
                {category_all.map((e, i) => <div key={e.uri}>
                    <div className={(i == category_all.length - 1)?"inline-block ml-2 no-underline text-dark-blue font-semibold cursor-point": "text-whisper inline-block ml-2 no-underline cursor-point"} ><Link href={e.uri}><div>{e.name}</div></Link></div>
                    
                    {(i < category_all.length - 1)? <div className="inline-flex pointing-right"><ChevronRight/>
                    </div>:null}
                </div>)}
            </div>
            <h1 className="blog-header">{post.title}</h1>
            <div className="margin-bottom-ten"><div className='blog-full-year'>{full_year} by</div><div className='blog-individual-link'><Link href={author.uri}><a>{author.name}</a></Link></div>
            </div>
            {(post.featuredImage)? <Image width="640" height="426" src={post.featuredImage.node.sourceUrl} />:null}
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
            <article>{content}</article>
            </div>
            </div>
        </div>:<h1>Post Not Found</h1>}</div>
    )

}
export async function getStaticProps(context) {
    const res = await fetch('https://www.imaginated.com/index.php?graphql', {
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

    const json = await res.json()

    return {
        props: {
            post: json.data.post,
        },
    }

}

export async function getStaticPaths() {

    const res = await fetch('https://www.imaginated.com/index.php?graphql', {
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