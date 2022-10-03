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
            id
            linkname
            type_value
            fullname
            subcategory
            searching
            imagelink
          }
        }
      }
  `;
export {LOAD_HEADER_SEARCH};