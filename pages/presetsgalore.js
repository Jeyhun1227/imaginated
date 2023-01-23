import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import parse, { domToReact } from 'html-react-parser';
import YouTube from 'react-youtube';




export default function Post( data ){

    const post = data.post;

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
                    var width = ref.current.offsetWidth;
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

            <h1 className="blog-header">{post.title}</h1>

            {(post.featuredImage)? <div className='Blog-Main-Image'><Image     layout='fill'
             src={post.featuredImage.node.sourceUrl} /></div>:null}
            <article>{content}</article>
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
            query SinglePost {
                page(id: 23604, idType: DATABASE_ID) {
                      slug
                      uri
                      title
                      content
                }
            }
            `,
        })
    })

    const json = await res.json()

    return {
        props: {
            post: json.data.page,
        },
    }

}

