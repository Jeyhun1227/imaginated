import {useState, useEffect} from "react";
// import {useSession } from "next-auth/react";
import MobileNav from '../NavBars/mobileNav';
import Header from '../NavBars/headers';
import Footer from '../NavBars/footer';
import HeadBar from '../NavBars/headBar';
import Head from 'next/head'
import Script from 'next/script';

 

export default function Layout({ children }) {

  useEffect(() => {
    var main_blog_value_temp = [];
    if(children.props.post && children.props.post.categories){
      main_blog_value_temp.push(children.props.post.categories.nodes[0].name)
      if(children.props.post.categories.nodes[0].ancestors)
      main_blog_value_temp = main_blog_value_temp.concat(children.props.post.categories.nodes[0].ancestors.nodes.map((e) => e.name))
    }
    setMain_blog_value(main_blog_value_temp)
  }, [children])


  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  const [windowDimensions, setWindowDimensions] = useState({});
  const [main_blog_value, setMain_blog_value] = useState({});

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    setWindowDimensions(getWindowDimensions());

    window.addEventListener('resize', handleResize);
    () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    
    <>
          {/* <Partytown debug={true} forward={['dataLayer.push']} /> */}

          <Script id='gtm-setup'
          dangerouslySetInnerHTML={{
            __html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PZPQDSJ');`
            }}/>
        <Script type="text/javascript" async="async" data-noptimize="1" data-cfasync="false" src="//scripts.mediavine.com/tags/imaginated.js"/>
        <Head>
          <link rel="shortcut icon" href="https://wordpress.imaginated.com/wp-content/uploads/2021/02/cropped-google-removebg-preview-3.png" />
          <meta httpEquiv="Content-Security-Policy" content="block-all-mixed-content" />
        </Head>
        {/* <HeadBar/> */}
        {(windowDimensions.width > 1000)?<Header main_blog_value={main_blog_value}/>:<MobileNav main_blog_value={main_blog_value}/>}
        <main>{children}</main>
        <div className="shadow-inner bg-light-grey">
          <Footer/>
        </div>
    </>
    
  )
}
