import {useState} from "react";
import {Disclosure} from '@headlessui/react'
import { Linkedin, Facebook, Twitter, Instagram } from 'react-bootstrap-icons';
import Link from 'next/link';
import Imaginated_logo from '../../public/Imaginated_logo.png';
import Image from 'next/image';

export default function Footer() {

    const menu = [
        {
            title: "Directory",
            border: "border-t",
            links: [
                {
                    name: 'Directory',
                    href: '/directory'
                },
                {
                    name: 'Market',
                    href: '/shop'
                }
            ]
        },
        {
            title: "Content",
            border: "border-y",
            links: [
                {
                    name: 'Business',
                    href: '/blog/category/business'
                },
                {
                    name: 'Art',
                    href: '/blog/category/art'
                },
                { 
                    name: 'Mind', 
                    href: '/blog/category/mind'
                },
                {
                    name: 'All Resources',
                    href: '/blog'
                }
            ]
        },
        {
            title: "Company",
            border: "border-b",
            links: [
                {
                    name: 'Home',
                    href: '/directory'
                },
                {
                    name: 'About',
                    href: '/about'
                },
                // { 
                //     name: 'Contact', 
                //     href: '/contact'
                // },
            ]
        },
    ]

  return (
    
    <div className="px-4 mx-auto mt-4 max-w-7xl">
        <div className="pt-12 mx-auto pb-9">
            <div className="flex flex-col-reverse md:flex-row">
                <div className="pt-8 md:pt-2 md:w-2/5 md:mr-auto">
                    <div className="flex items-center mb-6 xl:mb-0 sm:mb-0">
                        <Image src={Imaginated_logo.src} className="" alt="Imaginated Logo" width={120} height={50} />
                    </div>
                    <div className="pt-3 mx-auto mb-6 md:pt-20 md:mt-0 md:mx-0 md:mb-0">
                        <div className="flex justify-center pr-2 space-x-6 md:justify-start xl:pr-0 sm:pr-0">
                            <div>
                                <Link href="https://www.linkedin.com/company/72624145/">
                                    <Linkedin color="#636363" size={15} />
                                </Link>
                            </div>
                            <div>
                                <Link href="https://www.facebook.com/iiimaginated">
                                    <Facebook color="#636363" size={15} />
                                </Link>
                            </div>
                            {/* <div>
                                <Link href="#">
                                    <Twitter color="#636363" size={15} />
                                </Link>
                            </div> */}
                            <div>
                                <Link href="https://www.instagram.com/iiimaginated/">
                                    <Instagram color="#636363" size={15} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:block">
                        <div className="flex flex-wrap justify-center -mb-4 md:mb-0 md:block">
                            <div className="md:mt-32 sm:mx-0 sm:mb-0">
                                <ul className="flex justify-start pl-0 mb-0">
                                    <li className="pr-2 text-xs border-r sm:text-base text-dim-grey hover:text-gray-900 sm:mb-0">
                                        <Link className= "no-underline truncate text-dim-grey" href="/privacy-policy"><a>Privacy Policy</a></Link>
                                    </li>
                                    <li className="px-2 text-xs border-r sm:text-base md:border-r-0 text-dim-grey hover:text-gray-900 sm:mb-0">
                                        <Link className= "no-underline truncate text-dim-grey" href="/terms-of-service"><a>Terms of Service</a></Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:mb-6 sm:mx-0 sm:mb-0">
                                <ul className="flex justify-start pl-0 mb-0">
                                    <li className="pl-2 pr-2 mb-4 text-xs border-r sm:text-base md:pl-0 text-dim-grey hover:text-gray-900 sm:mb-0">
                                        <Link className= "no-underline truncate text-dim-grey" href="/disclaimer">Site/Affiliate Disclaimer</Link>
                                    </li>
                                    <li className="pl-2 mb-4 text-xs sm:text-base text-dim-grey hover:text-gray-900 sm:mb-0">
                                        <Link className= "no-underline truncate text-dim-grey" href="#">Sitemap</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex mx-auto md:block">
                            <div className="md:mt-2.5 xl:mx-0 xl:mb-0">
                                <p className="mb-0 text-xs truncate sm:text-base text-dim-grey">© 2021 Imaginated.com</p>
                            </div>
                        </div>
                    </div>    
                </div>
                <div className="hidden md:justify-end md:flex">
                    {menu.map((item) => (
                    <div key={item.title + 'name_title'} className="flex w-full pt-2 pl-3 mx-auto sm:mx-0 sm:pl-0">
                        <ul>
                            <li className="mb-6 text-2xl text-dark-blue">{item.title}</li>
                            {item.links.map((items) => (
                                <li className="mb-3" key={items.name + 'name'}>
                                    <Link className= "no-underline text-dim-grey" href={`${items.href}`} key={items.name} >{items.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    ))}
                </div>
                <div className="flex flex-col md:hidden">
                    {menu.map((item) => (
                    <Disclosure as="div" key={item.title + 'name_title'} className={`${item.border} border-very-light-grey`}>
                        {({ open }) => (
                            <>
                            <h3 className="flow-root -my-3">
                                <Disclosure.Button className="flex flex-wrap items-center justify-between w-full py-4 mx-auto text-sm text-gray-400 hover:text-gray-500">
                                    <div className="flex flex-wrap items-center justify-between">
                                        <li className="flex pl-2 text-xl font-semibold no-underline whitespace-nowrap text-dark-blue">{item.title}</li>
                                    </div>
                                    <div className="flex-shrink-0 order-2">
                                        <div className="flex items-center flex-1">
                                            <span className="flex items-center ">
                                            {open ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5 fill-very-light-grey" viewBox="0 0 20 20" fill="currentColor" stroke="#CECECE" strokeWidth="1">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5 fill-very-light-grey" viewBox="0 0 20 20" fill="currentColor" stroke="#CECECE" strokeWidth="1">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            </span>
                                            
                                        </div>
                                    </div>
                                </Disclosure.Button>
                            </h3> 
                            <Disclosure.Panel>
                                <div key={item.title} className="flex justify-start w-full pt-1.5 pl-3 mx-auto sm:mx-0 sm:pl-0">
                                    <ul className="pl-2">   
                                        {item.links.map((items) => (
                                            <li className="mb-3" key={items.name + 'name_link'}>
                                                <div className= "no-underline text-dim-grey"><Link href={`${items.href}-${item.title}`} key={items.name} >{items.name}</Link></div>
                                            </li>
                                        ))}
                                    </ul> 
                                </div>
                            </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                    ))}
                </div>
            </div>
        </div>
    </div>
    
  )
}