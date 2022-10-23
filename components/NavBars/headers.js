import styles from '../../styles/Home.module.css';
// import {Container, Row, Col} from 'react-bootstrap';
// import mainLogo from '../../public/imaginated_logo.png'
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, Transition, Combobox  } from '@headlessui/react'
import React, {useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Bell, Star, Gear, BoxArrowInRight, PlayBtn } from 'react-bootstrap-icons';
import GetSearchResults from './headerSearch/HeaderSearch';
import Link from 'next/link';
import ImageWithFallback from '../Image/Image'


export default function Header(props) {
  let placeholder = 'Search for a creator or category'
  const {data: session} = useSession()
  const [notification, setNotification] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState({Individual: [], Subcategory: [], Offering: []});
  const [ShowResults, setShowResults] = useState(true);

  var location_href = null;
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if(!searchTerm) return;
      let returnedSearch = await GetSearchResults(searchTerm);
      console.log(returnedSearch)

      let returnedSearchClean = {Individual: [], Subcategory: [], Offering: []}
      returnedSearch.map((e) => {
        if(e.type_value === 'Individual') return returnedSearchClean.Individual.push(e)
        if(e.type_value === 'Subcategory') return returnedSearchClean.Subcategory.push(e)
        if(e.type_value === 'Offering') return returnedSearchClean.Offering.push(e)
      })
      setSearchResult(returnedSearchClean)

    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])



  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  const [windowDimensions, setWindowDimensions] = useState({});

  useEffect(() => {
    location_href = window.location.pathname;
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    setWindowDimensions(getWindowDimensions());

    window.addEventListener('resize', handleResize);
    () => window.removeEventListener('resize', handleResize);
  }, [])

  const userMenu = [
    // {
    //   title: 'Update',
    //   href: '/update',
    //   svg: <Bell/>
    // },
    {
      title: 'Following',
      href: '/settings?type=Following',
      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
        <path id="Layer" fillRule="evenodd" className="" d="m3.9 7.1c-0.6-0.5-0.9-1.3-0.9-2.1 0-0.8 0.3-1.6 0.9-2.1 0.5-0.6 1.3-0.9 2.1-0.9 0.8 0 1.6 0.3 2.1 0.9 0.6 0.5 0.9 1.3 0.9 2.1 0 0.8-0.3 1.6-0.9 2.1-0.5 0.6-1.3 0.9-2.1 0.9-0.8 0-1.6-0.3-2.1-0.9zm3.5-3.5c-0.4-0.4-0.9-0.6-1.4-0.6-0.5 0-1 0.2-1.4 0.6-0.4 0.4-0.6 0.9-0.6 1.4 0 0.5 0.2 1 0.6 1.4 0.4 0.4 0.9 0.6 1.4 0.6 0.5 0 1-0.2 1.4-0.6 0.4-0.4 0.6-0.9 0.6-1.4 0-0.5-0.2-1-0.6-1.4zm4.6 9.4c0 1-1 1-1 1h-10c0 0-1 0-1-1 0-1 1-4 6-4 5 0 6 3 6 4zm-1 0c0-0.2-0.2-1-0.8-1.7-0.7-0.6-1.9-1.3-4.2-1.3-2.3 0-3.5 0.7-4.2 1.3-0.6 0.7-0.8 1.5-0.8 1.7z"/>
        <path id="Layer" fillRule="evenodd" className="" d="m13.5 4.9c1.4-1.4 4.9 1.1 0 4.3-4.9-3.2-1.4-5.7 0-4.3z"/>
      </svg>
    },
    {
      title: 'Reviews',
      href: '/settings?type=Ratings',
      svg: <Star className='fill-black'/>
    },
    {
      title: 'Settings',
      href: '/settings?type=Settings',
      svg: <Gear/>
    },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <nav className="hidden md:block max-w-7xl mt-1 mx-auto md:border-b md:border-very-light-grey px-2 h-16 sm:px-4 py-2.5">

      <div className="flex items-center justify-between mx-auto flex-nowrap">
          {(windowDimensions.width > 1000)? <div className="flex items-center mr-3"><div className="xl:h-10 sm:h-5 md:h-7 cursor-point"><Link href="/directory">
              <img src="/Imaginated_logo.png"  alt="Imaginated Logo" className="xl:h-10 sm:h-5 md:h-7"/>
          </Link></div></div>: null}
          <Combobox as="li" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setShowResults(true);}} className="relative list-none">
            <div className="items-start justify-start hidden xl:w-4/12 lg:w-3/12 sm:flex sm:order-1">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  </div>
                  <Combobox.Input type="text" id="simple-search" data-dropdown-toggle="dropdown" className="block py-2 text-sm border text-ellipsis xl:pr-20 sm:pr-10 w-96 pl-11 sm:w-96 focus:outline-none" placeholder={placeholder} required onChange={(e) => setSearchTerm(e.target.value)}/>
              </div>
            </div>
            <Combobox.Options className="absolute z-10 py-1 mt-1 overflow-x-hidden overflow-y-auto text-base bg-white shadow-lg w-96 top-10 max-h-56 focus:outline-none sm:text-sm padding-none">


              <div className={(ShowResults) ?'' : 'display-none'} >
              {searchResult.Subcategory.length > 0 ?<div>
                        <div className="each-result-name">Top Categories</div>
                  </div>:null}
                  {searchResult.Subcategory.map( (result) =>  <div key={result.id} onClick={() => window.location.href=`${window.location.origin}/directory/${result.linkname}`}>
                        <div className='each-results-cat-menu cursor-point' >
                          <div className="each-results-fullname">{result.fullname}</div>
                        </div>
                    
                  </div>
                  )}

                  {searchResult.Individual.length > 0 ?<div>
                        <div className="each-result-name">Top Creators</div>
                  </div>:null}
                  {searchResult.Individual.map( (result) =>  <div key={result.id}>
                        <div className='each-results-search cursor-point'  onClick={() => window.location.href=`${window.location.origin}/directory/person/${result.linkname}`}>
                          <div className="each-results-image" >
                          <ImageWithFallback src={result.imagelink} className={"w-8 h-8 rounded-full sm:w-10 sm:h-10"} width={40} height={40} fallbackSrc={"/fallbackimage.svg"}  />
                          </div>
                          <div>
                          <div className="each-results-fullname">{result.fullname}</div>
                          <div className="each-results-subcategory">{result.subcategory ? result.subcategory.map((e, i) => <div key={e} className='subcat-margin'>{(i >= 1)? <div className='bullet'></div>:null}<div className='subcat-each'>{e}</div></div>) : null}</div>
                          </div>
                        </div>
                    
                  </div>
                  )}
                  {searchResult.Offering.length > 0 ?<div>
                        <div className="each-result-name">Top Market</div>
                  </div>:null}
                  {searchResult.Offering.map( (result) =>  <div  key={result.id} onClick={() => window.location.href=`${window.location.origin}/directory/person/${result.linkname}`}>
                        <div className='each-results-search cursor-point' >
                          <div className="each-results-image" >
                          <ImageWithFallback src={result.imagelink} className={"border-radius-five"} width={40} height={40} fallbackSrc={"/fallbackimage.svg"}  />
                          </div>
                          <div>
                          <div className="each-results-fullname">{result.fullname}</div>
                          <div className="each-results-subcategory">{result.subcategory ? result.subcategory.map((e, i) => <div key={e} className='subcat-margin'>{(i >= 1)? <div className='bullet'></div>:null}<div className='subcat-each'>{e}</div></div>) : null}</div>
                          </div>
                        </div>
                    
                  </div>

                  )}
              </div>
            </Combobox.Options>
          </Combobox>
          <div className="items-center justify-between hidden w-full sm:flex sm:w-auto sm:order-1" id="mobile-menu-4">
            <ul className="flex flex-col mb-0 sm:flex-row xl:space-x-8 sm:space-x-4 sm:mt-0 sm:text-sm sm:font-medium">
              <li>
                <div className="block py-2 pl-3 pr-4 no-underline sm:bg-transparent sm:p-0 text-dim-grey sm:hover:text-dim-grey" ><Link href="/about" aria-current="page">About</Link></div>
              </li>
              <li>
                <div className="block py-2 pl-3 pr-4 no-underline border-b border-gray-100 sm:border-0 sm:hover:text-dim-grey sm:p-0 text-dim-grey"><Link href="/directory" >Directory</Link></div>
              </li>
              {/* <li>
                <Link href="/market" className="block py-2 pl-3 pr-4 no-underline border-b border-gray-100 sm:border-0 sm:hover:text-dim-grey sm:p-0 text-dim-grey">Market</Link>
              </li> */}
              {session?
              <li>
                <div className="block py-2 pl-3 pr-4 no-underline truncate border-b border-gray-100 mr-15 sm:border-0 sm:hover:text-dim-grey sm:p-0 text-dim-grey"><Link href="/claim-listing" >Claim Listing</Link></div>
              </li>:null}
              {!(session) ? <>
              <li>
                <button type="button" onClick={(e) => {e.preventDefault();window.location.href='/login?return_url=' + location_href;}} className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:mr-0">{(windowDimensions.width > 800)?"Log In/Sign Up": "Log In"}</button>
              </li>
              </> : <> 
              {/* <li className='flex items-center'>
              <Menu as="div" className="relative inline-block">
                  <>
                  <div>
                    <Menu.Button onClick={() => {setNotification(prevNotification => !prevNotification);}} className="inline-flex items-center content-center justify-center pt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="13" height="13">
                      <path fillRule="evenodd" style={{fill: '#000000'}} d="m7.2 15.8q-0.3-0.1-0.6-0.4-0.3-0.3-0.4-0.6-0.2-0.4-0.2-0.8h4q0 0.4-0.2 0.8-0.1 0.3-0.4 0.6-0.3 0.3-0.6 0.4-0.4 0.2-0.8 0.2-0.4 0-0.8-0.2zm7-3.8q0.4 0.7 0.8 1h-14q0.4-0.3 0.8-1c0.9-1.8 1.2-5.1 1.2-6 0-2.4 1.7-4.4 4-4.9 0-0.3 0.1-0.6 0.3-0.8 0.1-0.2 0.4-0.3 0.7-0.3 0.3 0 0.6 0.1 0.7 0.3 0.2 0.2 0.3 0.5 0.3 0.8q0.8 0.2 1.6 0.6 0.7 0.5 1.3 1.1 0.5 0.7 0.8 1.5 0.3 0.8 0.3 1.7c0 0.9 0.3 4.2 1.2 6zm-6.2-10.1l-0.8 0.2q-0.7 0.1-1.3 0.5-0.6 0.3-1 0.9-0.4 0.5-0.7 1.2-0.2 0.6-0.2 1.3c0 0.6-0.1 2.2-0.5 3.7-0.1 0.8-0.3 1.6-0.6 2.3h10.2c-0.3-0.7-0.5-1.5-0.6-2.3-0.4-1.5-0.5-3.1-0.5-3.7q0-0.7-0.2-1.3-0.3-0.7-0.7-1.2-0.4-0.6-1-0.9-0.6-0.4-1.3-0.5c0 0-0.8-0.2-0.8-0.2z"/>
                      <path style={{fill: notification ?  "#93bdb0" : '#000000'}} d="m13.3 0.2c1.6 0.2 2.2 1 2.2 2.8 0 1.9-0.6 2.6-2.3 2.8-1.4 0.1-2.4-0.5-2.8-1.5-0.3-1-0.3-2.4 0-3.1 0.4-0.7 1.7-1.2 2.9-1z"/>
                    </svg>
                    </Menu.Button>
                  </div>

                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="hover:bg-white-smoke">
                        <Menu.Item>
                          {({ active }) => (
                            <div className='flex items-center mx-3.5 no-underline border-b border-gainsboro'>
                              <span className='block py-2.5 text-sm font-semibold text-black no-underline'>
                                Notifications
                              </span>
                              <Link href="#" className='flex ml-auto text-black'>
                                See All
                              </Link>
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                      <div className='my-2'>
                        <Menu.Item>
                          <div className='py-2 hover:bg-white-smoke'>
                            <Link href="#" className='flex items-center px-3.5 no-underline'>
                              <div className='pr-2 text-black no-underline'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                              </div>
                              <span className='block text-xs font-semibold text-black no-underline'> 
                                SANJ replied to your comment
                              </span>
                            </Link>
                            <span className='block pt-2 text-xs text-black no-underline pl-9'>
                              5:00 pm
                            </span>
                          </div>
                        </Menu.Item>
                        <Menu.Item>
                          <div className='py-2 hover:bg-white-smoke'>
                            <Link href="#" className='flex items-center px-3.5 no-underline'>
                              <div className='pr-2 text-black no-underline'>
                                <PlayBtn/>
                              </div>
                              <span className='block text-xs font-semibold text-black no-underline'>
                                Jhon updated their content, go check it out now!
                              </span>
                            </Link>
                            <span className='block pt-2 text-xs text-black no-underline pl-9'>
                              Yesterday
                            </span>
                          </div>
                        </Menu.Item>
                      </div>  
                    </Menu.Items>
                  </Transition>
                  </>
                </Menu>
              </li> */}
              <li className='flex items-center'>
                <Menu as="div" className="relative inline-block">
                {({ open }) => (
                  <>
                  <div>
                    <Menu.Button className="inline-flex items-center content-center justify-center pt-1">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div> 
                      <span className="flex items-center">
                      {open ? (
                        <ChevronUp className="w-3 h-3 ml-2 -mr-1" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-3 h-3 ml-2 -mr-1" aria-hidden="true" />
                      )}
                      </span>
                      
                    </Menu.Button>
                  </div>

                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="hover:bg-white-smoke">
                        <Menu.Item>
                          {({ active }) => (
                            <div   className={classNames(
                              active ? 'bg-white-smoke text-gray-900' : 'text-gray-700',
                              'flex items-center no-underline border-b border-gainsboro')}>
                                <div className='margin-top-bottom-user'>
                              <div className='pr-2 text-black display-menu'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
                                  <path fillRule="evenodd" className='fill-black' d="m49.5 4.1c5.7-0.1 9.7 0.5 14 1.9 3.3 1.2 7.8 3.1 10 4.4 2.2 1.3 6.2 4.5 8.8 7.2 2.7 2.7 6 6.9 7.4 9.4 1.5 2.5 3.5 7.2 4.5 10.5 1 3.3 1.8 8.7 1.8 12 0 3.3-0.7 8.7-1.6 12-0.9 3.3-2.8 8.3-4.4 11-1.6 2.7-5 7.2-7.7 9.9-2.6 2.7-6.6 5.9-8.8 7.2-2.2 1.3-6.7 3.2-10 4.4-4 1.4-8.5 2-13.5 2-4.5 0-9.7-0.8-13-1.9-3-1-7.5-3-10-4.4-2.5-1.4-6.7-4.7-9.3-7.4-2.7-2.6-6-6.8-7.4-9.3-1.5-2.5-3.5-7.2-4.5-10.5-1-3.3-1.8-8.7-1.8-12 0-3.3 0.7-8.7 1.6-12 0.8-3.3 2.7-8.2 4.2-10.9 1.5-2.6 5-7 7.7-9.7 2.8-2.7 6.6-5.9 8.5-7.1 1.9-1.2 6.2-3.2 9.5-4.4 4.2-1.5 8.4-2.2 14-2.3zm-11.5 57.6c1.1 1.8 3.6 4 5.5 4.8 1.9 0.8 4.9 1.5 6.5 1.5 1.6 0 4.6-0.7 6.5-1.5 1.9-0.8 4.4-3 5.5-4.8 1.7-2.8 2-5 2-16.4 0-12.6-0.1-13.3-2-13.3-1.9 0-2 0.7-2 11.8 0 9.1-0.4 12.5-1.8 15.2-1.1 2.2-2.8 3.8-4.7 4.4-1.8 0.5-4.4 0.5-6.5 0-2.5-0.7-4-1.9-5.2-4.4-1.4-2.7-1.8-6.1-1.8-15.3 0-11-0.1-11.7-2-11.7-1.9 0-2 0.7-2 13.3 0 11.4 0.3 13.6 2 16.4z"/>
                                </svg>
                              </div>
                              <span className='block text-sm text-black no-underline display-menu-title'>
                                {session.user.name}
                              </span>
                              </div>
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                      {userMenu.map((menu) => (
                        <Menu.Item key={menu.title}> 
                          {({ active }) => (
                          <Link key={menu.title} href={menu.href} >
                            <>
                            <div className='hover:bg-white-smoke no-underline px-3.5 flex items-center margin-top-bottom' onClick={() => window.location.href = menu.href}>

                              <>
                              <div>
                              <div className='pr-2 text-black display-menu'>
                                {menu.svg}
                              </div>
                              <span className='block text-sm text-black no-underline display-menu-title'>
                                {menu.title}
                              </span>
                              </div>
                              </>
                            
                            </div>
                            </>
                            </Link>
                          )}
                        </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <div onClick={signOut} className={classNames(
                              active ? 'bg-white-smoke text-gray-900' : 'text-gray-700',
                              'flex items-center no-underline margin-top-bottom')}>
                              <div >
                              <div className='pr-2 text-black no-underline display-menu'>
                                <BoxArrowInRight/>
                              </div>
                              <span className='block text-sm text-black no-underline  display-menu-title'
                              >
                                Log out
                              </span>
                              </div>
                            </div>
                          )}
                        </Menu.Item>
                    </Menu.Items>
                  </Transition>
                  </>
                    )}
                </Menu>
              </li>
                </>}
            </ul>
          </div>
      </div>
    </nav>
    
    // <div className={styles.headerContainer}>
    //     <Container className={styles.MainRowNav}>
    //     <Row>
    //     <Col>
    //     <img className={styles.MainImage} src='/imaginated_logo.png'/>
    //         </Col>

    //         <Col className={styles.directoryNameEach}>
    //             About
    //         </Col>
    //         <Col className={styles.directoryNameEach}>
    //             Directory
    //         </Col>
    //         <Col className={styles.directoryNameEach}>
    //             Market
    //         </Col>
    //         <Col className={styles.directoryNameEach}>
    //             Claim Listing
    //         </Col>
    //         <Col>
    //         {!data ? (<div className={styles.directoryNameEach}>
    //         <button onClick={() => location.href = "/login"}>Login</button>
    //         </div>
    //         ): (<div className={styles.directoryNameEach}>
    //         {/* <span>{data.user.email}</span> */}

    //         {data.user.image && (
    //           <img
    //             src={data.user.image}
    //             style={{ width: "25px", borderRadius: "50%" }}
    //           />
    //         )}
    //         <span>{data.user.name}</span>
    //         {/* <button onClick={() => location.href = "/login"}>Login</button> */}
    //         {/* <button onClick={signOut}>Sign Out</button> */}
    //         </div>)}
    //         </Col>
    //     </Row>
    //     </Container>
    // </div>
  )
}




