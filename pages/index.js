import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from "react";
// import Mainpage1 from '../public/mainpage1.png';
// import Mainpage2 from '../public/mainpage2.png';
// import Mainpage3 from '../public/mainpage3.png';
import MainpageFirst from '../public/mainpagefirst.png';
import MainpageLast from '../public/mainpagelast.png';
// import Yelp from '../public/mentioned/yelp1.png';
import Medium from '../public/mentioned/medium2.png';
import Substack from '../public/mentioned/substack3.png';
import Buzzfeed from '../public/mentioned/buzzfeed4.png';
import Searchbar from '../components/NavBars/searchBar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IntroGif1 from '../public/introgif1.gif';
import IntroGif2 from '../public/introgif2.gif';
import IntroGif3 from '../public/introgif3.gif';
export default function MainPage() {
  const [windowDimensions, setWindowDimensions] = useState(1000);
  const [getMainLink, setGetMainLink] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const videos_instructions = [{title: 'Enter an educational topic or keyword', 
  desc: 'Input a term or phrase related to a subject of learning or study, which will help to narrow down the search for the best educational creator on that topic.'}, 
  {title: 'Discover the credible educators on that topic',
  desc: 'After entering an educational topic or keyword, our algorithm will help you to identify reliable and trustworthy educators related to that topic, which can provide you with accurate and relevant information on the subject.'}, 
  {title: 'Explore all of their content on one page',
  desc: 'Upon discovering credible educators on a particular topic, you can explore all of their educational content, resources or materials on their Creator Profile page, allowing you to easily navigate and access their teachings, insights, and perspectives in one place.'}
  ]

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

  const getVideoIframe = () => {
    // const links = ['ri6uea31x9', 'ofa6van345', 'f1dah4nt9h']
    const links = [IntroGif1, IntroGif2, IntroGif3]
    const altlinks = ['main intro video', 'second intro video', 'third intro video']
    return <div className='main-links-gifs'><Image src={links[getMainLink]} alt={altlinks[getMainLink]} fill /></div>
  }

  const getVideoChange = (index) => {
    setPlayVideo(true);
    setGetMainLink(index)
  }
  return (
    <div>
      <Head>
        <title>Imaginated: A search engine of educational creators</title>
        <meta name="description" content="Imaginated is a search engine of educational creators. Here you can find the top creators in any given category. Explore their offerings and leave reviews." />
        <link rel="canonical" href={`https://www.imaginated.com/`} />
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
      </Head>
      <div className='ptb-140-100 mx-auto max-w-7xl'>
        <div className="flex justify-center">
          <div className='width-80'>
            <div className='text-align-center'>
            <h1 className='text-4xl tracking-tight'>Revolutionalize your learning</h1>
            <div className='margin-top-bottom-three text-dim-grey font-size-20'>Enter an educational topic, find the credible educators on that topic, and access all their content on one page.</div>
            </div>
            <Searchbar/>
            <div className='mgt-12 mgl-15 relative w-full center-items inline-block-650 text-dim-grey'>Search engine of educational creators</div>
            {/* <div>
              <Link
                href='/directory/'
                className='px-3 py-2 mr-3 text-sm text-center text-white truncate md:mr-0 bg-dark-blue'>Start Learning</Link>
              <Link
                href='/directory/signup/'
                className='px-3 py-2 mr-3 text-sm text-center truncate md:mr-0 bg-white-smoke m-left-20'>Sign up for free</Link>
            </div> */}
            {/* <div className='margin-top-bottom-three text-dim-grey'>Trusted by 100,000+ users</div> */}

          </div>
        </div>
      </div>
      
      <div className='w-full bg-light-grey mb-100-50'>
        
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
      <div className='ptb-2 mx-auto max-w-7xl mb-100-50'>
        <div className='grid-layout-two'>
          {/* <div className={(windowDimensions.width >= 850)? 'grid-column-full': ''}>
            <div className="font-size-20 text-dim-grey">How it works</div>
            <div className="text-3xl">Start learning in 3 simple steps</div>
          </div> */}

            <div className=''>
              {getVideoIframe()}
            </div>
            <div>
            <div className='padding-bottom-10'>
            <div className="font-size-20 text-dim-grey">How it works</div>
            <div className="text-3xl">Start learning in 3 simple steps</div>
            </div>
            {videos_instructions.map((each_vid, index) => <div key={each_vid.title}>
              <Accordion TransitionProps={{ unmountOnExit: true }} onChange={() => getVideoChange(index)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className='index-video-number'>0{index + 1}</div>
                  <div className='text-xl index-video-title'>{each_vid.title}</div>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className='text-dim-grey'>{each_vid.desc}
                  </Typography>
                </AccordionDetails>
                </Accordion>
                </div>
            )}

            </div>
        </div>
      </div>

      <div className='ptb-2 mx-auto max-w-7xl'>
        <div className='grid-layout-two'>
          <div className='width-80'>
            <div className='text-3xl tracking-tight'>Are you an educational creator?</div>
            <div className='margin-top-bottom-three text-dim-grey font-size-20'>List yourself on the directory and choose your category, respond to reviews, edit links, and more!</div>
            <div>
              <Link
                href='/directory/signup/'
                className='px-3 py-2 mr-3 text-sm text-center text-white truncate md:mr-0 bg-dark-blue'>Get listed</Link>
            </div>

          </div>
          <div className='index-image-container'>
            <Image src={MainpageLast} layout='fill'/>
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps(){

  return {
    props: {
    }
  }
}
