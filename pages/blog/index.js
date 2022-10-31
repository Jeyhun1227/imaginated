import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import home from '../../public/home.svg';



export default function SubCategoryBlogMain( {post} ){

      
    return (
        <div><div className="flex flex-row flex-wrap space-x-3 margin-left-top">
        <div className="inline-flex items-center justify-center cursor-point">
        <Link href="/" >  
        <a ><img className="content-center h-4" src={home.src}/></a>
        </Link>
        </div>

        </div>
        <div className="grid-container-blog">
            {post.map((e) => <div key={e.id} className="blog-each-post">
                <Link href={e.uri}><a><h3 className='blog-title'>{e.title}</h3>
                <div className='blog-post-image'>{(e.featuredImage)?<Image src={e.featuredImage.node.sourceUrl} width={2048} height={1152}/>:null}</div>
                <div className="pl-1.5 no-underline text-denim cursor-point">...Read more</div></a></Link>
            </div>)} 
        </div></div>
    )

}

export async function getStaticProps(context) {
    const res = await fetch('https://www.imaginated.com/index.php?graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query SinglePost{
                posts{
                  nodes {
                    id
                    title
                    uri
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
                }
              }
            `
        })
    })

    const json = await res.json()
    return {
        props: {
            post: json.data.posts.nodes,
        },
    }

}

// export async function getStaticPaths() {

//     const res = await fetch('https://www.imaginated.com/index.php?graphql', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             query: `
//             query SinglePost {
//                 categories {
//                   nodes {
//                     slug
//                     children {
//                       nodes {
//                         slug
//                       }
//                     }
//                   }
//                 }
//             }
//         `})
//     })

//     const json = await res.json()
//     const categories = json.data.categories.nodes;
//     var paths = []
//     categories.map((parent) => {
//         paths.push({params: {Parent: parent.slug}})

//     })


//     return { paths, fallback: false }

// }