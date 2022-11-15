import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
// import home from '../../../public/home.svg';



export default function AuthorBlogMain( {post, author} ){
    let author_value = (author) ? {avatar: author.node.avatar.url, description: author.node.description, name: author.node.name} : {name: '', avatar: null, description: ''};
      
    return (
        <div>
            <div className='grid-container'>
                <div className='site-content'>
                    <div className='content-area'>
                        <div className='main-author-wrap'>
                            <div className='main-author-tab'>
                                <div className='main-author-gravatar'>
                                    <Image src={author_value.avatar}  width={80} height={80}/>
                                </div>
                                <div className='main-author-text'>
                                    <h3 className='main-author-authorname'>{author_value.name}</h3>
                                    <div className='main-author-desc' dangerouslySetInnerHTML={{__html: author_value.description}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid-container-blog">
                {post.map((e) => <div key={e.id} className="blog-each-post">
                    <Link href={e.uri}><a><h3 className='blog-title'>{e.title}</h3>
                    <div className='blog-post-image'>{(e.featuredImage)?<Image src={e.featuredImage.node.sourceUrl} width={2048} height={1152}/>:null}</div>
                    <div className="pl-1.5 no-underline text-denim cursor-point">...Read more</div></a></Link>
                </div>)} 
            </div>
        </div>
    )

}

export async function getStaticProps(context) {
    console.log(context.params)
    const res = await fetch('https://wordpress.imaginated.com/index.php?graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query SinglePost($id: String!) {
                posts(where: {authorName: $id}, first: 500)  {
                    nodes {
                        id
                        title
                        uri                        
                        featuredImage {
                            node {
                            sourceUrl
                            }
                        }
                        author {
                            node {
                            name
                            description
                            avatar {
                                url
                            }
                            }
                        }
                    }
                }
            }
            `,
            variables: {
                id: context.params.author            
            }
        })
    })

    const json = await res.json()
    console.log(json)
    return {
        props: {
            post: json.data.posts.nodes,
            author: json.data.posts.nodes[0].author
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
                users(first: 100) {
                  nodes {
                    name
                    slug
                  }
                }
              }
        `})
    })

    const json = await res.json()
    const categories = json.data.users.nodes;
    var paths = []
    categories.map((author) => {
        paths.push({params: {author: author.slug}})

    })


    return { paths, fallback: false }

}