import { gql } from "@apollo/client";

const LOAD_INDIVIDUAL_SETTINGS = gql`
query
getIndividualSetting(
      $token: String 
      )
      {
        getIndividualSetting(
            token: $token 
          )
        {
          
          individual
        }
      }
  `;
export {LOAD_INDIVIDUAL_SETTINGS};