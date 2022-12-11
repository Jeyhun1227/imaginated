import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from "react";
import Mainpage1 from '../public/mainpage1.png';
import Mainpage2 from '../public/mainpage2.png';
import Mainpage3 from '../public/mainpage3.png';
import MainpageFirst from '../public/mainpagefirst.png';
import MainpageLast from '../public/mainpagelast.png';
// import Yelp from '../public/mentioned/yelp1.png';
import Medium from '../public/mentioned/medium2.png';
import Substack from '../public/mentioned/substack3.png';
import Buzzfeed from '../public/mentioned/buzzfeed4.png';


export default function MainPage() {
  const [windowDimensions, setWindowDimensions] = useState(1000);
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    setWindowDimensions(getWindowDimensions());


    window.addEventListener('resize', handleResize);
    () => window.removeEventListener('resize', handleResize);
  }, [])
  return (
    <div>
      <Head>
        <title>Imaginated: A directory of educational creators</title>
        <meta name="description" content="Imaginated is a directory of educational creators. Here you can find the top creators in any given category. Explore their offerings and leave reviews." />
        <link rel="canonical" href={`https://www.imaginated.com/`} />
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
      </Head>
      <div className='py-12 mx-auto max-w-7xl'>
        <div className='grid-layout-two'>
          <div className='width-80'>
            <h1 className='text-4xl tracking-tight'>A directory of educational creators</h1>
            <div className='margin-top-bottom-three text-dim-grey font-size-20'>Save yourself time. Know whom to learn from and where to start learning in just a few clicks.</div>
            <div>
              <Link href='/directory/'><a className='px-3 py-2 mr-3 text-sm text-center text-white truncate md:mr-0 bg-dark-blue'>Start Learning</a></Link>
              <Link href='/signup/'><a className='px-3 py-2 mr-3 text-sm text-center truncate md:mr-0 bg-white-smoke m-left-20'>Sign up for free</a></Link>
            </div>
            <div className='margin-top-bottom-three text-dim-grey'>Trusted by 100,000+ users</div>

          </div>
          <div className='index-image-container'>
            <Image src={MainpageFirst} layout='fill'/>
          </div>
        </div>
      </div>
      <div className='w-full bg-light-grey'>
        <div className='py-12 mx-auto max-w-7xl'>
          <div className='text-dim-grey index-featured'>AS MENTIONED IN</div>
          <div className='index-mention-image-total'>
          <div className='index-mention-image'>
            <Image src={Medium} layout='fill'/>
          </div>
          <div className='index-mention-image'>
            <Image src={Substack} layout='fill'/>
          </div>
          <div className='index-mention-image'>
            <Image src={Buzzfeed} layout='fill'/>
          </div>
          </div>
        </div>
      </div>
      <div className='ptb-2 mx-auto max-w-7xl'>
        <div className='grid-layout-two'>
          <div className={(windowDimensions.width >= 850)? 'grid-column-full': ''}>
            <div className="font-size-20 text-dim-grey">How it works</div>
            <div className="text-3xl">Start learning in 3 simple steps</div>
          </div>

            <div className='width-80'>
              <div className='font-size-20 text-dim-grey margin-bottom-10'>01</div>
              <h2 className='text-3xl tracking-tight'>Browse creator by category</h2>
              <div className='margin-top-bottom-three text-dim-grey font-size-20'>Pick a category to see all the educational creators in that niche.</div>
            </div>
            <div className='index-image-container'>
              <Image src={Mainpage1} layout='fill'/>
            </div>
        </div>
      </div>
      <div className='ptb-2 mx-auto max-w-7xl'>
        <div className='grid-layout-two'>
          {windowDimensions.width >= 850 ? <div className='index-image-container'>
            <Image src={Mainpage2} layout='fill'/>
          </div>:null}
          <div className='width-80'>
            <div className='font-size-20 text-dim-grey margin-bottom-10'>02</div>
            <h2 className='text-3xl tracking-tight'>Filter by reviews</h2>
            <div className='margin-top-bottom-three text-dim-grey font-size-20'>Discover the best educational creators in your choosen category. Filter and compare by reviews.</div>
          </div>
          {windowDimensions.width < 850 ? <div className='index-image-container'>
            <Image src={Mainpage2} layout='fill'/>
          </div>:null}
        </div>
      </div>
      <div className='ptb-2 mx-auto max-w-7xl'>
        <div className='grid-layout-two'>
          <div className='width-80'>
            <div className='font-size-20 text-dim-grey margin-bottom-10'>03</div>
            <h2 className='text-3xl tracking-tight'>Explore al their educational offerings on one page</h2>
            <div className='margin-top-bottom-three text-dim-grey font-size-20'>Learn about the creator and why they ahave credibility in their given niche. Explore their free educational offerings so you can start learning</div>
          </div>
          <div className='index-image-container'>
            <Image src={Mainpage3} layout='fill'/>
          </div>
        </div>
      </div>

      <div className='ptb-2 mx-auto max-w-7xl'>
        <div className='grid-layout-two'>
          <div className='width-80'>
            <div className='text-3xl tracking-tight'>Are you an educational creator?</div>
            <div className='margin-top-bottom-three text-dim-grey font-size-20'>List yourself on the directory and choose your category, respond to reviews, edit links, and more!</div>
            <div>
              <Link href='/signup/'><a className='px-3 py-2 mr-3 text-sm text-center text-white truncate md:mr-0 bg-dark-blue'>Get listed</a></Link>
            </div>

          </div>
          <div className='index-image-container'>
            <Image src={MainpageLast} layout='fill'/>
          </div>
        </div>
      </div>
    </div>
  )
}
export async function getStaticProps(){

  return {
    props: {
    }
  }
}
