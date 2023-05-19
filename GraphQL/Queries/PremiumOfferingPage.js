import { gql } from "@apollo/client";

const LOAD_PREMIUM_OFFERINGS_PAGE = gql`
query
getPremiumOfferingPage(
      $linkname: String 
      )
      {
        getPremiumOfferingPage(
            linkname: $linkname 
          )
        {
            reviews{
                id
                individual
                premium_name
                user
                name
                verified
                premium_offer
                description
                like
                dislike
                benefit
                imagelink
                createdate
                type
                review
                title
                engagement
                validation
            }
            premium{
                id
                name
                individual
                description
                subheader
                imagelink
                link
                type
                rank
                avg
                count
              }
        }
      }
  `;
export {LOAD_PREMIUM_OFFERINGS_PAGE};