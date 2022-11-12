import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import home from '../../../public/home.svg';
import axios from 'axios';
import Head from 'next/head';
import parse, { domToReact } from 'html-react-parser';



export default function SubCategoryBlogMain( {post, metadata} ){

      
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
            query SinglePost($id: String!) {
                posts(where: {categoryName: $id}, first: 1000) {
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
            `,
            variables: {
                id: context.params.Parent            
            }
        })
    })
    let metadata_raw = await axios.get('https://www.imaginated.com/wp-json/rankmath/v1/getHead?url=https://www.imaginated.com/blog/category/' + context.params.Parent)
    let metadata = metadata_raw.data.head;

    const json = await res.json()
    return {
        props: {
            post: json.data.posts.nodes,
            metadata
        },
    }

}

export async function getStaticPaths() {

    const res = await fetch('https://www.imaginated.com/index.php?graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query SinglePost {
                categories(first: 500)  {
                  nodes {
                    slug
                    children {
                      nodes {
                        slug
                      }
                    }
                  }
                }
            }
        `})
    })

    const json = await res.json()
    const categories = json.data.categories.nodes;
    var paths = []
    categories.map((parent) => {
        paths.push({params: {Parent: parent.slug}})

    })


    return { paths, fallback: false }

}