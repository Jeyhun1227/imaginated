import React, { useEffect, useState } from "react";
import Header from '../NavBars/headers.js';
import styles from '../../styles/Home.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import Link from 'next/link';
import {Disclosure} from '@headlessui/react'

export default function CategoryList(props) {
    const [category, setcategory] = useState(props.category);
    const [subcategory, setsubcategory] = useState(props.subcategory);
    const [categorySubValues, setcategorySubValues] = useState({});
    useEffect(() => {
        setsubcategory(props.subcategory);
        setcategory(props.category);
        if(props.subcategory){
            let temp_cat_sub_val = {}
            let Sub_category_values = props.category.map((e) => {
                temp_cat_sub_val[e.category] = props.subcategory.filter((sub) => sub.categoryname == e.category)
            })
            setcategorySubValues(temp_cat_sub_val)
        }
    }, [props])
    const [showSubCategory, setshowSubCategory] = useState([]);
    let ShowSubCategoryFunc = (subCat) => {
        let temp_showSubCategory = showSubCategory;
        // console.log(temp_showSubCategory, temp_showSubCategory.includes(subCat), subCat)
        if(temp_showSubCategory.includes(subCat)){
            setshowSubCategory(temp_showSubCategory.filter((e) => e != subCat))
        }else{
            showSubCategory.push(subCat)
            setshowSubCategory([...showSubCategory])
        }
    
    }
    return (
        <div>
            <div className="mx-auto py-9 max-w-7xl">
                <div className="relative z-10 flex items-baseline justify-between pb-1 border-b border-very-light-grey">
                    <h2 className="text-4xl font-medium tracking-tight text-dark-blue">{props.parent}</h2>
                </div>
                {category.map((e) =>
                <Disclosure defaultOpen as="div" key={'category_'+e.id} className="py-6 border-b border-very-light-grey">
                    {({ open }) => (
                    <>
                        <h3 className="flow-root -my-3">
                        <Disclosure.Button className="flex flex-wrap items-center justify-between w-full py-3 mx-auto text-sm text-gray-400 bg-white hover:text-gray-500">
                            <div className="flex flex-wrap items-center justify-between">
                            {(categorySubValues[e.category] && categorySubValues[e.category].length > 0)?
                            <div className="flex items-center flex-1 w-0">
                                <span className="flex items-center ml-6">
                                {open ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" stroke="#187BC0" stroke-width="1">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" stroke="#187BC0" stroke-width="1">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                )}
                                </span>
                                <a href={'category/' + e.category} className="flex pl-2 text-lg no-underline text-denim whitespace-nowrap">{e.category}</a>
                            </div>: null}
                            </div>
                            <div className="flex-shrink-0 order-2">
                            <span className="pl-2 text-lg text-dark-blue">{props.parent}</span>
                            </div>
                        </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-2.5">
                        <div className="space-y-4">
                            {Object.keys(categorySubValues).length > 0 ? categorySubValues[e.category].map((sub) =>
                            <div key={sub.id} className="flex items-center justify-between">
                                <label className="pl-10 ml-3 text-sm text-denim">
                                    {sub.subcategory}
                                </label>
                                <label className="pl-10 ml-3 text-sm text-dim-grey">
                                Photographers
                                </label>
                            </div>):null}
                        </div>
                        </Disclosure.Panel>
                    </>
                    )}
                </Disclosure>
                )}
            </div>
        </div>
        // <div className={styles.CategoryList}>
        //     <h2>{props.parent}</h2>
        //     <div >
        //     {category.map((e) => <div key={'category_'+e.id}>
        //         {(categorySubValues[e.category] && categorySubValues[e.category].length > 0)?<ChevronRight className={(showSubCategory.includes(e.category) && subcategory)? 
        //          styles.CategoryCaretFillOpen: styles.CategoryCaretFill} onClick={(w) => ShowSubCategoryFunc(e.category)}/>: null}
        //         <Link href={'category/' + e.category} className={styles.CategoryMainTitle} >{e.category}</Link>
        //         {(showSubCategory.includes(e.category) && subcategory)? categorySubValues[e.category].map((sub) => <div id={sub.id}>{sub.subcategory}</div>):null}
        //         </div>)}
        //     </div>
        // </div> 
    )
}