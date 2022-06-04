import {useEffect, useState} from "react";
import {Disclosure} from '@headlessui/react'

export default function PopularCategories(props) {
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
        <div className="mx-auto mt-4 max-w-7xl">
            <div className="relative z-10 flex items-baseline pb-2 border-b justify-left border-very-light-grey">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#214151" d="M21.92,6.62a1,1,0,0,0-.54-.54A1,1,0,0,0,21,6H16a1,1,0,0,0,0,2h2.59L13,13.59l-3.29-3.3a1,1,0,0,0-1.42,0l-6,6a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L9,12.41l3.29,3.3a1,1,0,0,0,1.42,0L20,9.41V12a1,1,0,0,0,2,0V7A1,1,0,0,0,21.92,6.62Z"/></svg>
                <div className="pl-2.5 text-2xl tracking-tight text-dark-blue">Popular Categories</div>
            </div>
        </div>
        {category.map((e) =>
        <div key={'category_'+e.id} className="py-6 border-b border-very-light-grey">
                <h3 className="flow-root -my-3">
                    <div className="flex flex-wrap items-center justify-between w-full py-2 mx-auto text-sm bg-white">
                        <div className="flex flex-wrap items-center justify-between">
                            <a href={'category/' + e.category} className="flex pl-2 text-lg no-underline text-denim whitespace-nowrap">{e.category}</a>
                        </div>
                        <div className="flex-shrink-0 order-2">
                            <div className="flex items-center flex-1">
                                <span className="flex items-center">
                                    <a href={'category/' + e.category} className="color-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" stroke="#187BC0" stroke-width="1">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </span>   
                            </div>
                        </div>
                    </div>
                </h3>
        </div>
        )}
    </div>
  )
}