import {useState} from "react";
import MobileNav from '../NavBars/mobileNav';
import Header from '../NavBars/headers';
import Footer from '../NavBars/footer';
import HeadBar from '../NavBars/headBar';
import Head from 'next/head'
export default function Layout({ children }) {

  return (
    
    <>
        <Head>
          <link rel="shortcut icon" href="https://wordpress.imaginated.com/wp-content/uploads/2021/02/cropped-google-removebg-preview-3.png" />
        </Head>
        <HeadBar/>
        <MobileNav/>
        <Header placeholder={"Search for a creator or category"}/>
        <main>{children}</main>
        <div className="shadow-inner bg-light-grey">
          <Footer/>
        </div>
    </>
    
  )
}

// export async function getServerSideProps(ctx){
//   console.log('testtest')
//   const user = await getSession(ctx)
//   console.log("user: ", user)
//   return {    props: {
//     user}
//   }
// }