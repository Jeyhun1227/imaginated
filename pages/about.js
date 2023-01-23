
import Image from 'next/image'
import Link from 'next/link'
export default function Settings() {




  return (
      <div className="wtr-content">
        <div className="grid-container about-page-main">
              <h1 className='has-text-align-center'>About Imaginated.com</h1>
              <div className='About-Main-Image'>
                  <Image     layout='fill' src='https://wordpress.imaginated.com/wp-content/uploads/2021/02/google-removebg-preview-3-300x300.png.webp' />
               </div>
               <p>
                  Imaginated.com is a digital media publishing platform dedicated to inspiring others in business, artistry, and mind through educational content in the form of blogs, guides, downloadable content, case studies, and videos.
                  We do this by ensuring our authors have credibility in the article they are writing about, this way you can gain first-hand knowledge from credible individuals.
               </p>
               <div className='about-page-container'>
                  <h1 className='has-text-align-center'>Featured On</h1>
                  <div className='grid-container-about'>
                      <div className='About-second-Image'>
                          <Image     layout='fill' src='https://wordpress.imaginated.com/wp-content/uploads/2021/01/pf-logo.png.webp' />
                      </div>
                      <div className='About-second-Image'>
                          <Image     layout='fill' src='https://wordpress.imaginated.com/wp-content/uploads/2021/01/slrlounge-logo-300x120.png.webp' />
                      </div>
                      <div className='About-second-Image'>
                          <Image     layout='fill' src='https://wordpress.imaginated.com/wp-content/uploads/2021/01/ezgif-1-180e1b29a6f9-removebg-preview.png.webp' />
                      </div>
                  </div>
               </div>
               <div className='about-page-container'>
                  <h1 className='has-text-align-center'>A living network of thoughts for creators.</h1>
                  <div className='About-Main-Image about-width-two-five'>
                  <Image     layout='fill' src='https://wordpress.imaginated.com/wp-content/uploads/2021/04/what-does-it-mean-to-be-creative.png.webp' />
                  </div>
                  <p>Whether you’re a photographer, painter, content creator, Instagram influencer, videographer, musician, makeup artist, podcaster etc. — we want to hear from you and gain insight into your professional and personal journey. Our goal is for our contributors to tell their story and journey to educate and inspire others.</p>
              </div>
              <div className='about-page-container'>
                  <h1 className='has-text-align-center'>Updates:</h1>
                  <p>July 2022 – Imaginated.com acquired <Link href='/presetsgalore'>PresetsGalore</Link> to further enhance their mission to be a top resources for creatives.
  </p>
              </div>
        </div>
      </div>
  );
  
}

