import React, { useEffect, useState } from "react";
import Link from 'next/link';
import {Disclosure} from '@headlessui/react'

export default function CategoryList(props) {
    const getCategorySub = () => {
        let temp_cat_sub_val = {}
        props.category.map((e) => {
            temp_cat_sub_val[e.category] = props.subcategory.filter((sub) => sub.categoryname == e.category)
        })
        return temp_cat_sub_val
    }
    // console.log('props: ', props)
    const [category, setcategory] = useState(props.category);
    // const [subcategory, setsubcategory] = useState(props.subcategory);
    const [categorySubValues, setcategorySubValues] = useState(getCategorySub());
    const [DisclosureOpen, setDisclosureOpen] = useState(true);
    useEffect(() => {
        setcategory(props.category)
      }, [props]);
    // const [showSubCategory, setshowSubCategory] = useState([]);
    // let ShowSubCategoryFunc = (subCat) => {
    //     let temp_showSubCategory = showSubCategory;
    //     // console.log(temp_showSubCategory, temp_showSubCategory.includes(subCat), subCat)
    //     if(temp_showSubCategory.includes(subCat)){
    //         setshowSubCategory(temp_showSubCategory.filter((e) => e != subCat))
    //     }else{
    //         showSubCategory.push(subCat)
    //         setshowSubCategory([...showSubCategory])
    //     }
    // }

    return (
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
        <div>
            <div className="mx-auto py-9 max-w-7xl">
                <div className="relative flex items-baseline justify-between pb-1 border-b border-very-light-grey">
                    <h2 className="text-4xl font-medium tracking-tight text-dark-blue">{props.parent}</h2>
                </div>
                {category.map((e) =>
                <Disclosure defaultOpen={DisclosureOpen} as="div" key={'category_'+e.id} className="py-6 border-b border-very-light-grey">
                    {({ open }) => (
                    <>
                        <div className="flow-root -my-3 font-twofour">
                        <div className="flex flex-wrap items-center justify-between w-full py-3 mx-auto text-small text-gray-400 bg-white hover:text-gray-500">
                            <div className="flex flex-wrap items-center justify-between">
                            {//(categorySubValues[e.category] && categorySubValues[e.category].length > 0)?
                            <div className="flex items-center flex-1 w-0">
                                <Disclosure.Button className="flex items-center">
                                {open ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" stroke="#187BC0" strokeWidth="1">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" stroke="#187BC0" strokeWidth="1">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                                </Disclosure.Button>
                                <div className="flex pl-2 text-large no-underline text-denim whitespace-nowrap cursor-point"><Link href={'directory/' + e.category} legacyBehavior>{e.category}</Link></div>
                                </div>}
                            </div>
                            <div className="flex-shrink-0 order-2">
                                <span className="pl-2 text-large text-dark-blue">{props.parent}</span>
                            </div>
                        </div>
                        
                        </div>
                        <Disclosure.Panel className="pt-2.5">
                        <div className="space-y-4">
                            {categorySubValues[e.category] ? categorySubValues[e.category].map((sub) =>
                            <div key={sub.id} className="flex items-center justify-between">
                                <div className="pl-4 ml-3 text-small no-underline text-denim"><Link
                                    href={'directory/' + e.category + '/Learn-' + sub.subcategory.replace(' ', '-')}
                                    legacyBehavior>
                                    {sub.subcategory}
                                </Link></div>
                                <label className="pl-10 ml-3 text-small text-dim-grey">
                                {e.category}
                                </label>
                            </div>): null}
                        </div>
                        </Disclosure.Panel>
                    </>
                    )}
                </Disclosure>
                )}
            </div>
        </div>
    );
}