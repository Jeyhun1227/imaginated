import { gql } from "@apollo/client";

const LOAD_INDIVIDUAL_PAGE = gql`
query
getEachIndividual(
      $linkname: String 
      $session: String
      )
      {
        getEachIndividual(
            linkname: $linkname 
            session: $session
          )
        {
          rows{
            id
            first_name
            last_name
            linkname
            aka
            subcategory
            description
            feature
            imagelink
            company
            founder
            link
            location
            category
            avg
            count
          }
          free_offers{
            youtube
            facebook
            twitter
            tiktok
            instagram
            linkedin
            slack
            discord
          }
          premium_offers{
            id
            name
            description
            subheader
            imagelink
            link
            type
            rank
            avg
            count
          }
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
            validation
          }
          favorites{
            id
            individual
            category
            name
            description
            imagelink
            link
            validation
          }
        }
      }
  `;
export {LOAD_INDIVIDUAL_PAGE};