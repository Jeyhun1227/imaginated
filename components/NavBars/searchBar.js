import ImageWithFallback from '../Image/Image'
import { Search } from 'react-bootstrap-icons';
import { Menu, Transition, Combobox  } from '@headlessui/react';
// import {Menu, MenuItem} from '@mui/material';
import React, {useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import GetSearchResults from './headerSearch/HeaderSearch';
import Select from "react-dropdown-select";
import Link from 'next/link';



export default function SearchBar({BannerText}) {
    let placeholder = 'Learn from 500+ photographers'
    const [ShowResults, setShowResults] = useState(true);
    const [searchResult, setSearchResult] = useState({Individual: [], Subcategory: [], Offering: [], Keywords: []});
    const [selectedOptions, setSelectedOptions] = useState([{ value: 'photography', label: 'Photography'}]);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const {query} = router.query;
  
    useEffect( () => {
      if(query) setSearchTerm(query)
    }, [query]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
          if(!searchTerm) return;
          let returnedSearch = await GetSearchResults(searchTerm);
    
          let returnedSearchClean = {Individual: [], Subcategory: [], Offering: [], Keywords: [], searchTerm: null}
          if(searchTerm.length > 3) returnedSearchClean.searchTerm = searchTerm
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

      const onMouseEnter = closed => {
        clearTimeout(timeout)
        closed && openMenu()
      }
      const onMouseLeave = open => {
        open && (timeout = setTimeout(() => closeMenu(), timeoutDuration))
      }
    

      const useHover = true;
    
    
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
    
        window.location.href = `/search/?query=${searchTerm}`
      }

    return (

        <Combobox as="li" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setShowResults(true);}} className="relative list-none">
            <div className="items-start justify-start  sm:flex sm:order-1">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full center-items inline-block-650">
                    <div className='width-137px inline-block border text-sm margin-bottom10-phone width-100-350-phone'><Select options={categroyOptions} values={selectedOptions}  placeholder={'All Categories'} className="border-none bg-light-grey"/></div>
                    <div className="border inline-block relative width-100-phone width-30rem margin-bottom10-phone">
                        <Combobox.Input type="text" onKeyUp={onKeyboardHandler} id="simple-search" data-dropdown-toggle="dropdown" className="inline-block text-sm text-ellipsis sm:pr-10 focus:outline-none margin-left-10px height-30px width-90" placeholder={placeholder} required onChange={(e) => setSearchTerm(e.target.value)}/>
                        <div className="absolute flex inset-y-0 right-0 items-center margin-right-12 cursor-pointer" onClick={() => onClickSeach()}>
                            <Search />
                        </div>

                        <Combobox.Options className="absolute z-10 py-1 mt-1 overflow-x-hidden overflow-y-auto text-base bg-white shadow-lg width-100 top-10 max-h-56 focus:outline-none sm:text-sm padding-none">

                            <div className={(ShowResults) ?'' : 'display-none'} >
                            {(ShowResults)? < >
                                {searchResult.searchTerm ? <Link href={`/search/?query=${searchResult.searchTerm}`} ><div onClick={()=> setShowResults(false)} className='each-results-cat-menu cursor-point' >
                                        <div className="each-results-fullname">{searchResult.searchTerm} - Keyword</div>
                                </div></Link>:null
                                }
                                {searchResult.Subcategory.length > 0 ?<div>
                                        <div className="each-result-name">Top Categories</div>
                                </div>:null}
                                {searchResult.Subcategory.map( (result) =>  <div key={result.id} >
                                        <Link href={`/directory/${result.linkname}`}  ><div className='each-results-cat-menu cursor-point' onClick={()=> setShowResults(false)} >
                                        <div className="each-results-fullname">{result.fullname}</div>
                                        </div></Link>
                                    
                                </div>
                                )}
                                {searchResult.Keywords.length > 0 ?<div>
                                    <div className="each-result-name">Top Search Results</div>
                                </div>:null}
                                {searchResult.Keywords ? searchResult.Keywords.map( (result) =>  <div key={result.id} onClick={() => window.location.href=`${window.location.origin}/search/${result.linkname}`}>
                                        <div className='each-results-cat-menu cursor-point' >
                                        <div className="each-results-fullname">{result.fullname}</div>
                                        </div>
                                    
                                </div>
                                ):null}

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

                    </div>
                </div>
            </div>

        </Combobox>
        );
    }