import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import home from '../../../../public/home.svg';
import { ChevronRight } from 'react-bootstrap-icons';
import axios from 'axios';
import Head from 'next/head';
import parse, { domToReact } from 'html-react-parser';

export default function SubCategoryBlogMain( {post, category_all, metadata} ){

      
    return (
        <div>
                    <Head>
                        {parse(metadata)}
                    </Head>
                    <div className="flex flex-row flex-wrap space-x-3 margin-left-top">
                    <div className="inline-flex items-center justify-center cursor-point">
                    <Link href="/" >  
                    <Image width={18} height={18} className="content-center h-4" src={home.src}/>
                    </Link>
                    <div className="inline-flex pointing-right"><ChevronRight/></div>

                    </div>
                    {category_all.map((e, i) => <div key={e.uri}>
                        <div className={(i < category_all.length - 1)?"inline-block ml-2 no-underline text-dark-blue font-semibold cursor-point": "text-whisper inline-block ml-2 no-underline cursor-point"} ><Link href={`/blog/category/${e.uri}`} legacyBehavior><div>{e.name}</div></Link></div>
                        
                        {(i < category_all.length - 1)? <div className="inline-flex pointing-right"><ChevronRight/>
                        </div>:null}
                    </div>)}
                </div>

                <div className="grid-container-blog">
                    {post.map((e) => <div key={e.id} className="blog-each-post">
                        <Link href={e.uri}><h3 className='blog-title'>{e.title}</h3>
                            <div className='blog-post-image'>{(e.featuredImage)?<Image src={e.featuredImage.node.sourceUrl} width={2048} height={1152}/>:null}</div>
                            <div className="pl-1.5 no-underline text-denim cursor-point">...Read more</div></Link>
                    </div>)} 
                </div>
            </div>
    );

}

export async function getStaticProps(context) {
    const res = await fetch('https://wordpress.imaginated.com/index.php?graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query SinglePost($id: String!) {
                posts(where: {categoryName: $id}, first: 500) {
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
                id: context.params.Subcategory            
            }
        })
    })
    function capitalizeFirstLetterAll(string){
        var capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
        
        return string.split('-').map((e) => capitalizeFirstLetter(e)).join(' ')
    }


    const json = await res.json()

    let metadata_raw = await axios.get(`https://wordpress.imaginated.com/wp-json/rankmath/v1/getHead?url=https://wordpress.imaginated.com/blog/category/${context.params.Parent}/${context.params.Subcategory}`)
    let metadata = metadata_raw.data.head;

    return {
        props: {
            post: json.data.posts.nodes,
            metadata,
            category_all: [{uri: context.params.Parent, name: capitalizeFirstLetterAll(context.params.Parent)}, {uri: `${context.params.Parent}/${context.params.Subcategory}`, name: capitalizeFirstLetterAll(context.params.Subcategory)}]
        },
    }

}

export async function getStaticPaths() {

    const res = await fetch('https://wordpress.imaginated.com/index.php?graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query SinglePost {
                categories(first: 500) {
                  nodes {
                    slug
                    children(first: 100){
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
        parent.children.nodes.map((category) => {
            paths.push({params: {Subcategory: category.slug, Parent: parent.slug}})

        })
    })


    return { paths, fallback: false }

}