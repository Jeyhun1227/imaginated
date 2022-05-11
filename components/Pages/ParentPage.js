import React, { useEffect, useState } from "react";
import CategoryList from "../CategoryComponents/CategoryList"
import Header from '../NavBars/headers.js';
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
    <div className={styles.container}>
      <Header/>
      <div className={styles.HeaderLocation}>
      <Container className={styles.MainRowNav}>
        <Row>
        <h1  className={styles.MainHeaderName}>Browse Personal Brands by Category</h1>
        </Row>
        <Row>
          <div className={styles.MainSubHeaderName}>Find, research, or discover a creator to learn from.</div>
        </Row>
        </Container>
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


