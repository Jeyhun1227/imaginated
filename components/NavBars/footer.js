import {useState} from "react";
import { Linkedin, Facebook, Twitter, Instagram } from 'react-bootstrap-icons';

export default function Footer() {
    const varLargeTextTop = "Browse Personal Brands " 
    const varLargeTextBottom = "by Category" 
    const varSmallText = "Find, research, or discover a creator to learn from."
    const [largeTextTop, setLargeTextTop] = useState(varLargeTextTop);
    const [largeTextBottom, setLargeTextBottom] = useState(varLargeTextBottom);
    const [smallText, setSmallText] = useState(varSmallText);

  return (
    
    <div className="px-4 mx-auto mt-4 max-w-7xl">
        <div className="pt-12 mx-auto pb-9">
            <div className="flex">
                <div className="mr-auto sm:w-2/5 sm:ml-0">
                    <div className="flex items-center mb-6 xl:mb-0 sm:mb-0">
                        <img src="/imaginated_logo.png" class="mr-3 mt-1 h-6 sm:h-9" alt="Imaginated Logo" />
                    </div>
                    <div className="pt-2 mx-auto mb-6 sm:pt-4 sm:mt-0 sm:mx-0 xl:mx-0 sm:mb-0 xl:mb-0 xl:mt-0">
                        <div className="flex justify-start pr-2 space-x-6 sm:justify-start xl:justify-start xl:pr-0 sm:pr-0">
                            <div>
                                <a href="javascript:void(0)">
                                    <Linkedin color="#636363" size={15} />
                                </a>
                            </div>
                            <div>
                                <a href="javascript:void(0)">
                                    <Facebook color="#636363" size={15} />
                                </a>
                            </div>
                            <div>
                                <a href="javascript:void(0)">
                                    <Twitter color="#636363" size={15} />
                                </a>
                            </div>
                            <div>
                                <a href="javascript:void(0)">
                                    <Instagram color="#636363" size={15} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mt-8 sm:mt-28 sm:mx-0 xl:mx-0 sm:mb-0 xl:mb-0">
                            <ul className="flex justify-start pl-0">
                                <li className="pr-2 text-base border-r text-dim-grey hover:text-gray-900 sm:mb-0">
                                    <a className= "no-underline text-dim-grey" href="javascript:void(0)">Privacy Policy</a>
                                </li>
                                <li className="px-2 text-base text-dim-grey hover:text-gray-900 sm:mb-0">
                                    <a className= "no-underline text-dim-grey" href="javascript:void(0)">Terms of Service</a>
                                </li>
                            </ul>
                        </div>
                        <div className="mb-6 sm:mx-0 xl:mx-0 sm:mb-0 xl:mb-0">
                            <ul className="flex justify-start pl-0">
                                <li className="pr-2 mb-4 text-base border-r text-dim-grey hover:text-gray-900 sm:mb-0">
                                    <a className= "no-underline text-dim-grey" href="javascript:void(0)">Site/Affiliate Disclaimer</a>
                                </li>
                                <li className="pl-2 mb-4 text-base text-dim-grey hover:text-gray-900 sm:mb-0">
                                    <a className= "no-underline text-dim-grey" href="javascript:void(0)">Sitemap</a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-2.5 xl:mx-0 xl:mb-0">
                            <p className="mb-0 text-base text-dim-grey">© 2021 Imaginated.com</p>
                        </div>
                    </div>    
                </div>
                <div className="hidden md:flex">
                    <div className="flex justify-end w-1/6 pt-2 pl-3 mx-auto sm:mx-0 sm:pl-0">
                        <ul>
                            <li className="mb-6 text-2xl text-dark-blue">Content</li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="javascript:void(0)">Photography</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="javascript:void(0)">Post-Production</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="javascript:void(0)">Marketing</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="javascript:void(0)">Case Studies</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="javascript:void(0)">Mind</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="javascript:void(0)">Social Media</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="javascript:void(0)">Reviews</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-end w-1/6 pt-2 pl-3 mx-auto sm:mx-0 sm:pl-0">
                        <ul>
                            <li className="mb-6 text-2xl text-dark-blue">Glossary</li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="javascript:void(0)">Art</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="javascript:void(0)">Design</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="javascript:void(0)">Photography</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="javascript:void(0)">Writing</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-end w-1/6 pt-2 pl-3 mx-auto sm:mx-0 sm:pl-0">
                        <ul>
                            <li className="mb-6 text-2xl text-dark-blue">Company</li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="/">Home</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="/about">About</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="/contact">Contact</a>
                            </li>
                            <li className="mb-3">
                                <a className= "no-underline text-dim-grey" href="/resources">Resources</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}