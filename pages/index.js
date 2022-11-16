
import MainParent from "../components/Pages/ParentPage"
import { ApolloProvider } from "@apollo/client";
import client from '../components/GraphQL';
import { LOAD_CATEGORIES, LOAD_SUBCATEGORIES } from "../GraphQL/Queries/Admin";
import Head from 'next/head'


export default function MainParentPage({category, subcategory}) {
  return (
    <div>
      <Head>
        <title>Imaginated: A directory of educational creators</title>
        <meta name="description">Imaginated is a directory of educational creators. Here you can find the top creators in any given category. Explore their offerings and leave reviews.</meta>
        <link rel="canonical" href={`https://www.imaginated.com/`} />
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
      </Head>
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
