import React, { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';
import Header from '../../../components/NavBars/headers';
import {Container, Row, Col} from 'react-bootstrap';
import {CATEOGORIES_PAGE} from '../../../GraphQL/Queries/CategoryPage';
import client from '../../../components/GraphQL';
import SubCategoryPageSub from '../../../components/SubCategoryPage/SubCategoryPage';
import {Select, MenuItem} from '@mui/material';

export default function SubCategoryPageMain(props) {
    // const router = useRouter();

    const routerID = props.routerID;
    let subcategory = [];
    props.Subcategory_values.map((e) => {
        if(!subcategory.includes(e.subcategory)){
            subcategory.push(e.subcategory)
        }
    })
    const [searchedValue, setsearchedValue] = useState("");
    const [IndividualEach, setIndividualEach] = useState(props.Subcategory_values);
    const [filterSelect, setfilterSelect] = useState("Most Reviews");
    // const [filterSelect] = ["Sponsored", "Highest Rated", "Most Reviews", "Alphabetical"]
    let searchedValueFunction = (searched) => {
      let temp = searched.target.value
      let temp_individual = props.Subcategory_values.filter((e) => e.first_name.toLowerCase().includes(temp) || e.last_name.toLowerCase().includes(temp))
      setIndividualEach(temp_individual)
      setsearchedValue(temp)
    }
    let filterChange = (filter) => {
      let filterValue = filter.target.value;
      let IndividualEachTemp = props.Subcategory_values.sort((a,b) => {
        if(filterValue === 'Most Reviews'){
          if(a.count > b.count) return -1
          if(a.count < b.count) return 1
          return 0
        }
        if(filterValue === 'Sponsored'){
          if(a.id > b.id) return -1
          if(a.id < b.id) return 1
          return 0
        }
        if(filterValue === 'Highest Rated'){
          if(a.avg > b.avg) return -1
          if(a.avg < b.avg) return 1
          return 0
        }
        if(filterValue === 'Alphabetical'){
          if(a.first_name > b.first_name) return -1
          if(a.first_name < b.first_name) return 1
          return 0
        }
      })
      setsearchedValue("")
      setIndividualEach(IndividualEachTemp)
      setfilterSelect(filterValue)
    }

    return <div className={styles.container}>
        <div className={styles.HeaderLocation}>
        <Container className={styles.MainRowNav}>
        <Row>
        <h1  className={styles.MainHeaderName}>{props.subcategoryName}</h1>
        </Row>
        <Row>
            <div className={styles.MainSubHeaderName}>Discover the best {props.subcategoryName} to learn from. Compare reviews and explore their offerings.</div>
        </Row>
        </Container>
        </div>
        <Container>
        <Row>
        <Col className={styles.CategoryLeftCol}>
        <div className={styles.MainHeaderSubcategory}>Looking for someone specific?</div>
        <div><input placeholder="Search for an individual" className={styles.SubcategoryInput} value={searchedValue} onChange={(e) => searchedValueFunction(e)}/></div>
        <div>
          <div>
              {IndividualEach.map((e) => <SubCategoryPageSub key={e.id} values={e}/>)}
          </div>
        </div>
        </Col>
        <Col>
          <div>
            <div>
            <Select 
            labelId="filter-subcategory-labelid"
            id="filter-subcategory"
            value={filterSelect}
            label="Most Reviews"
            onChange={filterChange}>
              <MenuItem value={"Sponsored"}>Sponsored</MenuItem>
              <MenuItem value={"Highest Rated"}>Highest Rated</MenuItem>
              <MenuItem value={"Most Reviews"}>Most Reviews</MenuItem>
              <MenuItem value={"Alphabetical"}>Alphabetical</MenuItem>
            </Select>
            </div>
            <h4>Looking for a category but can’t find it? Let us know!</h4>
            <button className={styles.CategoryPageButton}>Request a Category</button>
            <div>It takes less than 30 seconds</div>
            <h4>{routerID} Categories</h4>
            {(props.subcategory.length > 0)? props.subcategory.slice(0, 4).map((e) => <div key={e.id}>{e.subcategory}</div>):null}
          </div>
        </Col>
        </Row>
        </Container>
      </div>

}

export async function getServerSideProps({query}){
    const routerID = query.id
    const subcategory = query.subcategory
    const Subcategory_values = await client.query({query:CATEOGORIES_PAGE, variables: { categoryName: routerID, subcategory}})
    // console.log('category_values.error:', category_values.error)

    // let category_values = {}

    return {
      props: {
        Subcategory_values: Subcategory_values.data.getCategoryPage.rows,
        subcategory: Subcategory_values.data.getCategoryPage.subcategory,
        subcategoryName: subcategory,
        routerID
      }
    }
}