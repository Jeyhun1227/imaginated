import styles from '../../styles/Home.module.css';
// import {Container, Row, Col} from 'react-bootstrap';
// import mainLogo from '../../public/imaginated_logo.png'
import { signIn, signOut, useSession } from "next-auth/react";
import React, {useState } from "react";

export default function Header({placeholder = 'Search for a creator or category'}) {
  const {data} = useSession()


  return (
    <nav className="hidden md:block max-w-7xl mt-1 mx-auto md:border-b md:border-very-light-grey px-2 h-16 sm:px-4 py-2.5">
      <div className="flex items-center justify-between mx-auto flex-nowrap">
          <a href="/" className="flex items-center mr-3">
              <img src="/imaginated_logo.png" className="xl:h-10 sm:h-5 md:h-7" alt="Imaginated Logo" />
          </a>
          <div className="items-start justify-start hidden xl:w-4/12 lg:w-3/12 sm:flex sm:order-1">
            <label for="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="simple-search" data-dropdown-toggle="dropdown" className="block py-2 text-sm text-gray-900 border border-gray-300 text-ellipsis xl:pr-20 sm:pr-10 w-96 pl-11 sm:w-full" placeholder={placeholder} required/>
            </div>
          </div>
          <div className="items-center justify-between hidden w-full sm:flex sm:w-auto sm:order-1" id="mobile-menu-4">
            <ul className="flex flex-col mb-0 sm:flex-row xl:space-x-8 sm:space-x-4 sm:mt-0 sm:text-sm sm:font-medium">
              <li>
                <a href="/about" className="block py-2 pl-3 pr-4 no-underline rounded sm:bg-transparent sm:p-0 text-dim-grey" aria-current="page">About</a>
              </li>
              <li>
                <a href="/directory" className="block py-2 pl-3 pr-4 no-underline border-b border-gray-100 sm:border-0 sm:hover:text-dim-grey sm:p-0 text-dim-grey">Directory</a>
              </li>
              <li>
                <a href="/market" className="block py-2 pl-3 pr-4 no-underline border-b border-gray-100 sm:border-0 sm:hover:text-dim-grey sm:p-0 text-dim-grey">Market</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 no-underline truncate border-b border-gray-100 mr-15 sm:border-0 sm:hover:text-dim-grey sm:p-0 text-dim-grey">Claim Listing</a>
              </li>
              <li>
              <button type="button" className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:mr-0">Log In/Sign Up</button>
              <button data-collapse-toggle="mobile-menu-4" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-4" aria-expanded="false"></button>
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