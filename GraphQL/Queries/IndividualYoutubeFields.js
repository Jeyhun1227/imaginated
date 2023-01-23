import { gql } from "@apollo/client";

const LOAD_YOUTUBE_FIELDS = gql`
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
          YoutubeFieldsObject{
            id
            individualId
            keyword
            rating
            match_rate
            videoid
            title
            thumbnail
            score
            view
          }
        }
      }
  `;
export {LOAD_YOUTUBE_FIELDS};