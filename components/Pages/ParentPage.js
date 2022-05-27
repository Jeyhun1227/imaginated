import React, { useEffect, useState } from "react";
import CategoryList from "../CategoryComponents/CategoryList"
import Header from '../NavBars/headers.js';
import {Disclosure} from '@headlessui/react'
import styles from '../../styles/Home.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import { LOAD_CATEGORIES, LOAD_SUBCATEGORIES } from "../../GraphQL/Queries/Admin";
import { useQuery, gql } from "@apollo/client";
import { MenuButtonWide } from 'react-bootstrap-icons';


export default function MainParent(props) {
    // const { error, loading, data } = useQuery(LOAD_CATEGORIES);
    const [CategoryValues, setCategoryValues] = useState([]);
    const [SubCategoryValues, setSubCategoryValues] = useState([]);
    const [CategoryValuesFilterable, setCategoryValuesFilterable] = useState([]);
    const [CategoryRank, setCategoryRank] = useState([]);
    // const load_subCategories = useQuery(LOAD_SUBCATEGORIES);
    useEffect(() => {
      let temp_object_category = {};
      let temp_category = []
      if (props.category){
        temp_category = props.category.getAllCategory.rows.map((e) => {
          if(temp_object_category[e.parent])
          temp_object_category[e.parent].push(e)
          else
          temp_object_category[e.parent] = [e]
          return {parent : e.parent, category: e.category}
        })
      }
      setCategoryValues(temp_object_category);
      setCategoryValuesFilterable(temp_object_category);
      if(props.category){
        let getAllCategory = [...props.category.getAllCategory.rows]
        let CategoryRank = getAllCategory.sort((a,b) =>  a.category - b.category ).slice(0, 5);
        setCategoryRank(CategoryRank);
        let temp_object_subcategory = {}
        if(props.subcategory){
          props.subcategory.getAllSubCategory.rows.map((e) =>{
            let temp_category_filtered = temp_category.filter((f) => f.category === e.categoryname)
            temp_category_filtered.map((tm) => {
              if(temp_object_subcategory[tm.parent])
                temp_object_subcategory[tm.parent].push(e)
              else
                temp_object_subcategory[tm.parent] = [e]
            })
          })
        }
        setSubCategoryValues(temp_object_subcategory)
      }
    }, [props.category, props.subcategory]);

    let ChangedCategory = (value) => {
      let temp_category_filtered = {}
      Object.keys(CategoryValues).map((f) => {
      let temp_CategoryFiltered = CategoryValues[f].filter((e) => e.category.toLowerCase().includes(value.toLowerCase()))
      if(temp_CategoryFiltered.length > 0)
        temp_category_filtered[f] = temp_CategoryFiltered
      }
      )
      setCategoryValuesFilterable(temp_category_filtered)
    }


return (
    <div>
      <Header placeholder={"Search for a creator or category"}/>
      <div className="bg-light-grey">
        <div className="py-12 mx-auto max-w-7xl">
          <div className="text-left">
            <h1 className="text-4xl font-bold tracking-tight text-black">
              <span className="block xl:inline">Browse Personal Brands </span>{' '}
              <span className="block text-indigo-600 xl:inline">by Category</span>
            </h1>
            <p className="mt-3 text-base text-dim-gray sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
              Find, research, or discover a creator to learn from.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="py-12 mx-auto max-w-7xl">
          <div class="grid grid-rows-3 grid-cols-9 gap-4">
            <div class="row-span-3 col-span-5 mr-28">
              <div class="mb-6">
                <label for="search" class="block mb-2 text-dark-blue text-xl">What did you want to learn today?</label>
                <input onChange={(e)=> ChangedCategory(e.target.value)} type="text" name="categoryName" id="search" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Search for a creator category"/>
              </div>
            </div>
            <div class="row-span-3 col-span-5 mr-28">
              <div className="mx-auto max-w-7xl">
                <div className="relative z-10 flex items-baseline justify-between pb-1 border-b border-very-light-grey">
                  <h1 className="text-4xl font-medium tracking-tight text-gray-900">Artists</h1>
                </div>
              </div>
            </div>
            <div class="col-span-4 ml-28">
              <div className="px-4">
                <div className="text-center">
                  <div className="text-xl tracking-tight text-dark-blue">
                    <span className="block">Looking for a category but can't</span>{' '}
                    <span className="block">find it? Let us know!</span>
                  </div>
                  <div className="mt-4.5 sm:mt-8 sm:flex sm:justify-center">
                    <div className="w-full shadow bg-dark-blue">
                      <a
                        style = {{textDecoration:'none'}}
                        href="#"
                        className="flex items-center justify-center w-full px-8 py-2 text-base font-medium text-white border border-transparent md:py-4 md:text-lg md:px-10">
                        Request a Listing
                      </a>
                    </div>
                  </div>
                  <p className="pb-5 mt-2 text-base border-b border-very-light-grey text-dim-grey">It takes less than 30 seconds</p>
                </div>
              </div>
            </div>
            <div class="row-span-2 col-span-4 ml-28">03</div>
          </div>
        </div>
      </div>
      <Container>
        <Row>
        <Col className={styles.CategoryLeftCol}>
        <div className={styles.BrandTagLine}>What did you want to learn today?</div>
        <input type="text" name="categoryName" placeholder="Search for a creator category" onChange={(e)=> ChangedCategory(e.target.value)} className={styles.CategorySearch} />
        <div>
          <div>
            {Object.keys(CategoryValuesFilterable).map((e) => <CategoryList key={'cat'+e} parent={e} category={CategoryValuesFilterable[e]} subcategory={SubCategoryValues[e]}/>)}
          </div>
        </div>
        </Col>
        <Col>
          <div>
            <h4>Looking for a category but can’t find it? Let us know!</h4>
            <button className={styles.CategoryPageButton}>Request a Category</button>
            <div>New to Imaginated? Sign Up</div>
            <h4>Popular Categories</h4>
            {CategoryRank.map((e) => <div key={e.ranking + e.id}>{e.category}</div>)}
            <div className={styles.CategoryLearnMore}>
              <div>What is Imaginated?</div>
              <div>Imaginated is a directory of personal brands. Here you can find the top creators in any given category.
              <a href='/about'>Learn more</a>
            </div>
            </div>
          </div>
        </Col>
        </Row>
        </Container>
    </div>
  )

}


