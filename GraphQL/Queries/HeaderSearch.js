import { gql } from "@apollo/client";

const LOAD_HEADER_SEARCH = gql`
query
getHeaderSearch(
      $searchTerm: String 
      )
      {
        getHeaderSearch(
            searchTerm: $searchTerm 
          )
        {
          rows{
            fullname
            subcategory
            searching
            imagelink
          }
        }
      }
  `;
export {LOAD_HEADER_SEARCH};