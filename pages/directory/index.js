
import MainParent from "../../components/Pages/ParentPage"
import { ApolloProvider } from "@apollo/client";
import client from '../../components/GraphQL';
import { LOAD_CATEGORIES, LOAD_SUBCATEGORIES } from "../../GraphQL/Queries/Admin";



export default function MainParentPage({category, subcategory}) {
  return (
    <div>
      <ApolloProvider client={client}>
        <MainParent category={category} subcategory={subcategory}/>
      </ApolloProvider>
    </div>
  )
}
export async function getServerSideProps(){
  const { data } = await client.query({query:LOAD_CATEGORIES})
  // const { data } = useQuery(LOAD_CATEGORIES);
  // const load_subCategories = useQuery(LOAD_SUBCATEGORIES);
  
  const load_subCategories = await client.query({query: LOAD_SUBCATEGORIES})

  return {
    props: {
      subcategory: load_subCategories.data,
      category: data
    }
  }
}
