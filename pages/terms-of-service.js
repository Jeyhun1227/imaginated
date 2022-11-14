import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import parse, { domToReact } from 'html-react-parser';
import YouTube from 'react-youtube';




export default function Post( data ){

    const post = data.post;

    const [shareUrl, setShareUrl] = useState('');
    const [content, setContent] = useState('');


    useEffect(() => {
          setContent(parse(post.content));
      }, []); 

      
    return (
        <div>{(post.content)? <div className="grid-container">
            <div className="site-content">
            <div className="content-area" >

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
                page(id: 3106, idType: DATABASE_ID) {
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

