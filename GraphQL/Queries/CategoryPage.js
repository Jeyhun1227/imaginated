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
            id
            categoryname
            subcategory
            first_name
            last_name
            aka
            description
            imagelink
            avg
            count
          }
          subcategory{
            id
            subcategory
            categoryname
          }
        }
      }
  `;
export {CATEOGORIES_PAGE};