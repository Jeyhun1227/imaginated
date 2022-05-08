import { gql } from "@apollo/client";

const LOAD_CATEGORIES = gql`
query{
    getAllCategory {
        rows{
            id
            category
            parent
            ranking
      }
    }
  }`;

  const LOAD_SUBCATEGORIES = gql`
  query{
    getAllSubCategory {
          rows{
              id
              subcategory
              categoryname
        }
      }
    }`;

    const LOAD_INDIVIDUAL = gql`
    query{
        getAllIndividual {
            rows{
              id
              first_name 
              last_name 
              aka 
              description 
              feature 
              company 
              location 
              founder 
              link 
              category 
              subcategory 
              verified
              imagelink
          }
        }
      }`;
    const LOAD_INDIVIDUALFREEOFFER = gql`
    query{
      getAllIndividualFreeOffer {
            rows{
              id
              individual
              youtube
              facebook
              twitter
              tiktok
              instagram
              linkedin
              slack
              discord
          }
        }
      }`;
  const LOAD_INDIVIDUALPREMIUMOFFER = gql`
    query{
      getAllIndividualPremiumOffer {
            rows{
              id
              individual
              name
              description
              subheader
              link
              subcategory
              imagelink
              type
              rank
          }
        }
      }`;
    const LOAD_REVIEW = gql`
    query{
      getAllReview{
            rows{
              id
              individual
              user
              premium_offer
              description
              like
              dislike
              benefit
              review
              title 
              type
              validation
          }
        }
      }`;
    const LOAD_USER = gql`
    query{
      getAllUser{
            rows{
              id
              individual
              imagelink
              name
              description
              password
              verified
              email

          }
        }
      }`;
    const LOAD_FAVORITES = gql`
    query{
      getAllFavorites{
            rows{
              id
              individual
              name
              description
              link
              imagelink
              validation
              category
          }
        }
      }`;
export {LOAD_CATEGORIES, LOAD_SUBCATEGORIES, LOAD_INDIVIDUAL, LOAD_INDIVIDUALFREEOFFER, LOAD_INDIVIDUALPREMIUMOFFER, LOAD_REVIEW, LOAD_FAVORITES, LOAD_USER}