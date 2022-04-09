import React, { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';
import Header from '../../../components/NavBars/headers';
import {Container, Row, Col} from 'react-bootstrap';
import {CATEOGORIES_PAGE} from '../../../GraphQL/Queries/CategoryPage';
import client from '../../../components/GraphQL';
import CategoryPageSub from '../../../components/CategoryPage/CategoryPageSub';


export default function SubCategoryPageMain(props) {
    // const router = useRouter();
    const routerID = props.routerID;
    let subcategory = [];
    props.category_values.map((e) => {
        if(!subcategory.includes(e.subcategory)){
            subcategory.push(e.subcategory)
        }
    })

    return <div className={styles.container}>
        <Header/>
        <div className={styles.HeaderLocation}>
        <Container className={styles.MainRowNav}>
        <Row>
        <h1  className={styles.MainHeaderName}>{routerID}</h1>
        </Row>
        <Row>
            <div className={styles.MainSubHeaderName}>Discover the best {routerID} to learn from. Compare reviews and explore their offferings.</div>
        </Row>
        </Container>
        </div>
        <Container>
        <Row>
        <Col className={styles.CategoryLeftCol}>
        <div className={styles.BrandTagLine}>Popular {routerID} Category</div>
        <div>
          <div>
              {subcategory.map((e) => <CategoryPageSub key={e} subcategory={e} values={props.category_values.filter((f) => f.subcategory === e)}/>)}
          </div>
        </div>
        </Col>
        <Col>
          <div>
            <h4>Looking for a category but can’t find it? Let us know!</h4>
            <button className={styles.CategoryPageButton}>Request a Category</button>
            <div>It takes less than 30 seconds</div>
            <h4>{routerID} Categories</h4>
            {subcategory.map((e) => <div key={e}>{e}</div>)}
          </div>
        </Col>
        </Row>
        </Container>
      </div>

}

export async function getServerSideProps({query}){
    const routerID = query.id
    const subcategory = query.subcategory
    const category_values = await client.query({query:CATEOGORIES_PAGE, variables: { categoryName: routerID, subcategory}})
    console.log('query', category_values)

    // console.log('category_values.error:', category_values.error)

    // let category_values = {}

    return {
      props: {
        category_values: category_values.data.getCategoryPage.rows,
        routerID
      }
    }
}