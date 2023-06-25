import { gql } from "@apollo/client";

const SEARCH_QUERY = gql`
  query getSearchMainBar($keyword: String, $category: String) {
    getSearchMainBar(keyword: $keyword, category: $category) {
      youtubeChannels {
        id
        channelId
        individualid
        first_name
        last_name
        linkname
        aka
        category
        subcategory
        imagelink
        count
        avg
        match_rate
        index
      }
      youtubeKeywords {
        id
        channelId
        videoid
        title
        thumbnail
        score
        relevance
        engagement
      }
      youtubeSubs {
        id
        sub_bucket
        channelId
        row_num
        count
        sum_channel_videos
      }
      premiumOfferings {
        id
        individual
        name
        description
        subheader
        subcategory
        imagelink
        link
        type
        rank
        price
        productid
      }
    }
  }
`;
// individual:  { type: GraphQLInt }, query: {type: GraphQLString}, query_param: {type: GraphQLBoolean}, videoid: {type: GraphQLString}
const SEARCH_INDIVIDUAL_QUERY = gql`
query queryIndividualSearch($individual: Int, $query: String, $query_param: Boolean, $videoid: String) {
    queryIndividualSearch(individual: $individual, query: $query, query_param: $query_param, videoid: $videoid) {
        individualVal {
            id
            channelId
            parent
            sub_bucket
            videoid
            title
            thumbnail
            score
            relevance
            engagement
        }
    }
}
`;

export { SEARCH_QUERY, SEARCH_INDIVIDUAL_QUERY };
