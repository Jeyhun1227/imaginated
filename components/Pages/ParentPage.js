import React, { useEffect, useState } from "react";
import CategoryList from "../CategoryComponents/CategoryList"
import VerticalCallToAction from '../CallToAction/VerticalCallToAction'
import QASingle from "../CallToAction/QASingle";
import HeroNoBtn from "../Hero/HeroNoBtn";
import PopularCategories from "../CategoryComponents/PopularCategories";


export default function MainParent(props) {
    const getCategory = () => {
      let temp_object_category = {};
      let subcategory = props.subcategory.getAllSubCategory.rows;

      if (props.category){
        props.category.getAllCategory.rows.map((e) => {
          // FILTERING SUBCATEGORY TO MATCH PARENT AND CATEGORY
          let current_sub = subcategory.filter((s) => e.category === s.categoryname)
          current_sub = current_sub.map((s) => s.subcategory.toLowerCase())
          if(temp_object_category[e.parent]){
            temp_object_category[e.parent].push({...e, subcategory: current_sub})
          }
          else{
            temp_object_category[e.parent] = [{...e, subcategory: current_sub}]
          }
        })
      }
      return temp_object_category;
    }

    const getSubCategory = () => {
      let subcategory = props.subcategory.getAllSubCategory.rows;
      let temp_category = props.category.getAllCategory.rows.map((e) => ({parent : e.parent, category: e.category}))
      let temp_object_subcategory = {}
      if(props.subcategory){
        subcategory.map((e) =>{
          let temp_category_filtered = temp_category.filter((f) => f.category === e.categoryname)
          temp_category_filtered.map((tm) => {
            if(temp_object_subcategory[tm.parent])
              temp_object_subcategory[tm.parent].push(e)
            else
              temp_object_subcategory[tm.parent] = [e]
          })
        })
      }
      return temp_object_subcategory;
      // setSubCategoryValues(temp_object_subcategory)
    }

    const categoryRank = () => {
      let getAllCategory = [...props.category.getAllCategory.rows]
      let CategoryRank = getAllCategory.sort((a,b) =>  a.category - b.category ).slice(0, 5);
      return CategoryRank;
      // setCategoryRank(CategoryRank);
    }
    // const { error, loading, data } = useQuery(LOAD_CATEGORIES);
    const [CategoryValues, setCategoryValues] = useState(getCategory());
    const [SubCategoryValues, setSubCategoryValues] = useState(getSubCategory());
    const [CategoryValuesFilterable, setCategoryValuesFilterable] = useState(getCategory());
    const [CategoryRank, setCategoryRank] = useState(categoryRank());
    // const load_subCategories = useQuery(LOAD_SUBCATEGORIES);


    let ChangedCategory = (value) => {
      let value_lower = value.toLowerCase();
      let temp_category_filtered = {}
      Object.keys(CategoryValues).map((f) => {
        let temp_CategoryFiltered = CategoryValues[f].filter((e) => {
          if(e.category.toLowerCase().includes(value_lower)) return true
          return e.subcategory.find((s) => s.includes(value_lower))
        })

        if(temp_CategoryFiltered.length > 0) temp_category_filtered[f] = temp_CategoryFiltered
      })
      setCategoryValuesFilterable(temp_category_filtered)
    }


return (
    <div>
      <div className="bg-white xl:px-0">
        <HeroNoBtn/>
        <div className="px-4 sm:px-0">
          <div className="py-12 mx-auto max-w-7xl">
            <div className="sm:grid sm:grid-rows-3 sm:grid-cols-9 sm:gap-4">
              <div className="items-center sm:row-span-3 sm:col-span-5 xl:mr-28 sm:mr-16">
                <label htmlFor="search" className="block mb-2 text-xl text-dark-blue">What did you want to learn today?</label>
                <input onChange={(e)=> ChangedCategory(e.target.value)} type="text" name="categoryName" id="search" className="shadow-sm bg-white border border-whisper text-dark-blue text-sm block w-full p-2.5 focus:outline-none" placeholder="Search for a creator category"/>
              </div>
              <div className="items-center sm:row-span-3 sm:col-span-5 xl:mr-28 sm:mr-16">
                {Object.keys(CategoryValuesFilterable).map((e) => <CategoryList key={'cat'+e} parent={e} category={CategoryValuesFilterable[e]} subcategory={SubCategoryValues[e]}/>)}
              </div>
              <div className="items-center sm:col-span-4 xl:ml-28 sm:ml-16">
                <VerticalCallToAction/>
              </div>
              <div className="items-center sm:col-span-4 xl:ml-28 sm:ml-16">
                {Object.keys(CategoryValues).slice(0, 1).map((e) => <PopularCategories key={'cat'+e} parent={e} category={CategoryValues[e]}/>)}
              </div>
              <div className="items-center mt-5 mb-auto sm:row-span-3 sm:col-span-4 xl:ml-28 sm:ml-16">
                <QASingle/>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <Container>
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
              <Link href='/about'>Learn more</Link>
            </div>
            </div>
          </div>
        </Col>
        </Row>
        </Container> */}
    </div>
  )

}


