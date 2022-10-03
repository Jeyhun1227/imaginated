import {LOAD_HEADER_SEARCH} from '../../../GraphQL/Queries/HeaderSearch';
import client from '../../../components/GraphQL';


export default async function GetSearchResults(searchTerm) {
    if(!searchTerm) return []
    let found_searchResult = await client.query({query:LOAD_HEADER_SEARCH, variables: { searchTerm: searchTerm.toUpperCase()}})
    if(found_searchResult.data.getHeaderSearch.rows) return found_searchResult.data.getHeaderSearch.rows;
    
    return []

}