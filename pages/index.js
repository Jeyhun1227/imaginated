
import MainParent from "../components/Pages/ParentPage"
import { ApolloProvider } from "@apollo/client";
import client from '../components/GraphQL';
import { LOAD_CATEGORIES, LOAD_SUBCATEGORIES } from "../GraphQL/Queries/Admin";



export default function MainParentPage({category, subcategory}) {
  return (
    <div>
      <title>Imaginated – Creators educating creators.</title>
      <meta name="description">Helping creators grow personally and professionally. Providing in-depth articles, guides, and videos made by credible educational creators.</meta>
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
