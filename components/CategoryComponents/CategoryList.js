import React, { useEffect, useState } from "react";
import Header from '../NavBars/headers.js';
import styles from '../../styles/Home.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import Link from 'next/link';

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
        <div className={styles.CategoryList}>
            <h2>{props.parent}</h2>
            <div >
            {category.map((e) => <div key={'category_'+e.id}>
                {(categorySubValues[e.category] && categorySubValues[e.category].length > 0)?<ChevronRight className={(showSubCategory.includes(e.category) && subcategory)? styles.CategoryCaretFillOpen: styles.CategoryCaretFill} onClick={(w) => ShowSubCategoryFunc(e.category)}/>: null}
                <Link href={'category/' + e.category} className={styles.CategoryMainTitle} >{e.category}</Link>
                {(showSubCategory.includes(e.category) && subcategory)? categorySubValues[e.category].map((sub) => <div id={sub.id}>{sub.subcategory}</div>):null}
                </div>)}
            </div>
        </div>
    )
}