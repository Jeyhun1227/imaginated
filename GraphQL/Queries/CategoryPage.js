import { gql } from "@apollo/client";

const CATEOGORIES_PAGE = gql`
query
    getCategoryPage(
      $categoryName: String 
      $subcategory: String
      $offset: Int
      )
      {
        getCategoryPage(
          categoryName: $categoryName 
          subcategory: $subcategory
          offset: $offset
          )
        {
          rows{
            id
            categoryname
            subcategory
            first_name
            last_name
            aka
            description
            linkname
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