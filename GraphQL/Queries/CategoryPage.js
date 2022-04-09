import { gql } from "@apollo/client";

const CATEOGORIES_PAGE = gql`
query
    getCategoryPage(
      $categoryName: String 
      $subcategory: String
      )
      {
        getCategoryPage(
          categoryName: $categoryName 
          subcategory: $subcategory)
        {
          rows{
            categoryname
            subcategory
            first_name
            last_name
            aka
            imagelink
            avg
            count
          }
        }
      }
  `;
export {CATEOGORIES_PAGE};