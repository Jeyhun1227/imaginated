import styles from '../../styles/Home.module.css';
// import {Container, Row, Col} from 'react-bootstrap';
// import mainLogo from '../../public/imaginated_logo.png'
import { signIn, signOut, useSession } from "next-auth/react";
import React, {useState } from "react";

export default function Header({placeholder = 'Search for a creator or category'}) {
  const {data} = useSession()


  return (
    <nav class="bg-white border-gray-200 px-2 h-16 sm:px-4 py-2.5">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" class="flex items-center">
              <img src="/imaginated_logo.png" class="mr-3 mt-1 h-6 sm:h-9" alt="Imaginated Logo" />
          </a>
          <div class="hidden justify-between mt-2 items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-3">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="simple-search" data-dropdown-toggle="dropdown" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 py-2 pr-20 pl-11" placeholder={placeholder} required/>
                <div id="dropdown" class="hidden z-10 w-96 bg-white rounded divide-y divide-gray-100 shadow" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{position: "absolute", inset: "auto auto 0px 0px", margin: "0px", transform: "translate3d(0px, 175px, 0px)"}}>
                  <ul class="py-1 text-sm text-gray-700" aria-labelledby="dropdown-button">
                    <li>
                      <button type="button" class="inline-flex py-2 px-4 w-full hover:bg-gray-100">Mockups</button>
                    </li>
                    <li>
                      <button type="button" class="inline-flex py-2 px-4 w-full hover:bg-gray-100">Templates</button>
                    </li>
                    <li>
                      <button type="button" class="inline-flex py-2 px-4 w-full hover:bg-gray-100">Design</button>
                    </li>
                    <li>
                      <button type="button" class="inline-flex py-2 px-4 w-full hover:bg-gray-100">Logos</button>
                    </li>
                  </ul>
                  <ul>
                    <li class="flex items-center space-x-4">
                      <img class="w-10 h-10 rounded-full" src="public\user.png" alt=""/>
                      <div class="space-y-1 font-medium dark:text-white">
                        <button type="button" class="inline-flex py-2 px-4 w-full hover:bg-gray-100">Mockups</button>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Website Developer</div>
                      </div>
                    </li>
                    <li class="flex items-center space-x-4">
                      <img class="w-10 h-10 rounded-full" src="public\user.png" alt=""/>
                      <div class="space-y-1 font-medium dark:text-white">
                        <button type="button" class="inline-flex py-2 px-4 w-full hover:bg-gray-100">Mockups</button>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Website Developer</div>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
          <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
            <ul class="flex flex-col mb-0 mt-2 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a href="/about" class="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 text-dim-grey no-underline" aria-current="page">About</a>
              </li>
              <li>
                <a href="#" class="block py-2 pr-4 pl-3 border-b border-gray-100 md:border-0 md:hover:text-dim-grey md:p-0 text-dim-grey no-underline">Directory</a>
              </li>
              <li>
                <a href="#" class="block py-2 pr-4 pl-3 border-b border-gray-100 md:border-0 md:hover:text-dim-grey md:p-0 text-dim-grey no-underline">Market</a>
              </li>
              <li>
                <a href="#" class="block py-2 pr-4 pl-3 border-b border-gray-100 mr-15 md:border-0 md:hover:text-dim-grey md:p-0 text-dim-grey no-underline">Claim Listing</a>
              </li>
              <li>
              <button type="button" class="bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 px-3 py-2 text-center mr-3 md:mr-0 text-white">Log In/Sign Up</button>
              <button data-collapse-toggle="mobile-menu-4" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-4" aria-expanded="false"></button>
              </li>
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