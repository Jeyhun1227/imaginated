import { gql } from "@apollo/client";

const LOAD_STATIC_DIRECTORY = gql`
query
getEachStaticPathDirectory(
      $types: String 
      )
      {
        getEachStaticPathDirectory(
            types: $types 
          )
        {
          category
          individual
          subcategory{
            categoryname
            subcategory
          }
        }
      }
  `;
export {LOAD_STATIC_DIRECTORY};