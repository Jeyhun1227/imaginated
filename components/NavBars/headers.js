// import {Container, Row, Col} from 'react-bootstrap';
// import mainLogo from '../../public/imaginated_logo.png'
import { signOut, useSession } from "next-auth/react";
import { Menu, Transition, Combobox  } from '@headlessui/react';
// import {Menu, MenuItem} from '@mui/material';
import React, {useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Star, Gear, BoxArrowInRight, Search } from 'react-bootstrap-icons';
import GetSearchResults from './headerSearch/HeaderSearch';
import Link from 'next/link';
import ImageWithFallback from '../Image/Image'
import Imaginated_logo from '../../public/Imaginated_logo.png';
import Image from 'next/image'
import Cookies from 'universal-cookie';
import HeadBar from './headBar';
import Select from "react-dropdown-select";
import { useRouter } from 'next/router';

export default function Header({main_blog_value}) {
  let placeholder = 'Search a photography term to learn more about'
  const blog_header = 'Learn [Category] for free - See the top educators'
  const {data: session} = useSession()
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState({Individual: [], Subcategory: [], Offering: [], Keywords: []});
  const [ShowResults, setShowResults] = useState(true);
  const [SubMenuHover, setSubMenuHover] = useState('');
  const [showHeadbar, setShowHeadbar] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([{ value: 'photography', label: 'Photography'}]);
  const router = useRouter();
  const {query} = router.query;

  useEffect( () => {
    if(query) setSearchTerm(query)


  }, [query]);
  var location_href = '';
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if(!searchTerm) return;
      let returnedSearch = await GetSearchResults(searchTerm);

      let returnedSearchClean = {Individual: [], Subcategory: [], Offering: [], Keywords: []}
      returnedSearch.map((e) => {
        if(e.type_value === 'Individual') return returnedSearchClean.Individual.push(e)
        if(e.type_value === 'Subcategory') return returnedSearchClean.Subcategory.push(e)
        if(e.type_value === 'Offering') return returnedSearchClean.Offering.push(e)
        if(e.type_value === 'Keyword') return returnedSearchClean.Keywords.push(e)
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

  useEffect(() => {
    if(session === null) setShowHeadbar(true)
  }, [session])

  const userMenu = [
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

  const buttonRef = useRef(null)
  const buttonRefMarket = useRef(null)

  const dropdownRef = useRef(null)
  const dropdownRefMarket = useRef(null)

  const timeoutDuration = 200
  let timeout

  const openMenu = () => buttonRef.current.click();
  const openMenuMarket = () => buttonRefMarket.current.click();
  const closeMenu = () =>
    {
      if(dropdownRef.current)
        dropdownRef.current.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'Escape',
            bubbles: true,
            cancelable: true,
          })
        )
    }

    const closeMenuMarket = () =>
    {
      if(dropdownRefMarket.current)
        dropdownRefMarket.current.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'Escape',
            bubbles: true,
            cancelable: true,
          })
        )
    }

  const onMouseEnter = closed => {
    clearTimeout(timeout)
    closed && openMenu()
  }
  const onMouseLeave = open => {
    open && (timeout = setTimeout(() => closeMenu(), timeoutDuration))
  }

  const onMouseEnterMarket = closed => {
    clearTimeout(timeout)
    closed && openMenuMarket()
  }
  const onMouseLeaveMarket = open => {
    open && (timeout = setTimeout(() => closeMenuMarket(), timeoutDuration))
  }
  const useHover = true;

  const signOutFunc = () => {
    const cookies = new Cookies();
    cookies.remove('user_id', { path: '/' });
    signOut()
  }

  const categroyOptions = [
   { value: 'photography', label: 'Photography'},
  //  { value: 'painting', label: 'Painting'},
  
  ]

  const onKeyboardHandler = (event) => {
    if (event.keyCode === 13) {
      window.location.href = `/search/?query=${searchTerm}`
    }
  }

  const onClickSeach = () => {
    console.log('search: ', `/search/?query=${searchTerm}`)

    window.location.href = `/search/?query=${searchTerm}`
  }

  return (
    <div>
            {showHeadbar? <HeadBar main_blog_value={main_blog_value}/>:null}
      <nav className="hidden md:block max-w-7xl mt-1 mx-auto md:border-b md:border-very-light-grey px-2 h-16 sm:px-4 py-2.5">
        {/* <div>
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PZPQDSJ"
          height="0" width="0" style={{"display":"none", "visibility":"hidden"}}></iframe></noscript>
        </div> */}
        <div className="flex items-center justify-between mx-auto flex-nowrap">
            <div className="flex items-center mr-3"><div className="xl:h-10 sm:h-5 md:h-7 cursor-point"><Link href="/">
                <Image src={Imaginated_logo.src}  alt="Imaginated Logo" className="xl:h-10 sm:h-5 md:h-7" width={160} height={40}/>
            </Link></div></div>
            <Combobox as="li" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setShowResults(true);}} className="relative list-none">
              <div className="items-start justify-start hidden xl:w-4/12 lg:w-3/12 sm:flex sm:order-1">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="border width-rem-38">
                      <div className="inline-block"><Select options={categroyOptions} values={selectedOptions}  placeholder={'All Categories'} className="border-none bg-light-grey"/></div>
                      <Combobox.Input type="text" onKeyUp={onKeyboardHandler} id="simple-search" data-dropdown-toggle="dropdown" className="inline-block text-sm text-ellipsis sm:pr-10 w-96 focus:outline-none margin-left-10px" placeholder={placeholder} required onChange={(e) => setSearchTerm(e.target.value)}/>
                    </div>
                </div>
                <div className="absolute flex inset-y-0 right-0 items-center margin-right-12 cursor-pointer z-index-five" onClick={() => onClickSeach()}>
                        <Search />
                        {/* <svg className="w-5 h-5  cursor-pointer z-index-five" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg> */}
                </div>
              </div>
              <Combobox.Options className="absolute z-10 py-1 mt-1 overflow-x-hidden overflow-y-auto text-base bg-white shadow-lg width-rem-38 top-10 max-h-56 focus:outline-none sm:text-sm padding-none">


                <div className={(ShowResults) ?'' : 'display-none'} >
                {(ShowResults)? < >
                {searchResult.Keywords ? searchResult.Keywords.map( (result) =>  <div key={result.id} onClick={() => window.location.href=`${window.location.origin}/search/${result.linkname}`}>
                          <div className='each-results-cat-menu cursor-point' >
                            <div className="each-results-fullname">{result.fullname}</div>
                          </div>
                      
                    </div>
                    ):null}
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
                  </>:null}
                </div>
              </Combobox.Options>
            </Combobox>
            <div className="items-center justify-between hidden w-full sm:flex sm:w-auto sm:order-1" id="mobile-menu-4">
              <ul className="flex flex-col mb-0 sm:flex-row xl:space-x-8 sm:space-x-4 sm:mt-0 sm:text-sm sm:font-medium">
                {/* <li>
                  <div className="block py-2 pl-3 pr-4 no-underline sm:bg-transparent sm:p-0 text-dim-grey sm:hover:text-dim-grey" ><Link href="/about" aria-current="page">About</Link></div>
                </li> */}
                <li>
                  <div className="block py-2 pl-3 pr-4 no-underline border-b border-gray-100 sm:border-0 sm:hover:text-dim-grey sm:p-0 text-dim-grey"><Link href="/directory" >Directory</Link></div>
                </li>


                {session?
                <li>
                  <div className="block py-2 pl-3 pr-4 no-underline truncate border-b border-gray-100 mr-15 sm:border-0 sm:hover:text-dim-grey sm:p-0 text-dim-grey"><Link href="/claim-listing" >Claim Listing</Link></div>
                </li>:null}
                {!(session) ? <>
                <li>
                  <button type="button" onClick={(e) => {e.preventDefault();window.location.href='/directory/login?return_url=' + location_href;}} className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:mr-0">{(windowDimensions.width > 800)?"Log In/Sign Up": "Log In"}</button>
                </li>
                </> : <> 
                <li className='flex items-center'>
                  <Menu as="div" className="relative inline-block">
                  {({ open }) => (
                    <>
                    <div>
                      <Menu.Button className="inline-flex items-center content-center justify-center pt-1">
                      {(!session.user.image) ? <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>:<div><Image src={session.user.image} unoptimized={true} width={25} height={25} className='header-main-image'/></div> }
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
                            <Link key={menu.title} href={menu.href} legacyBehavior>
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
                              <div onClick={signOutFunc} className={classNames(
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
      </div>
  );
}
