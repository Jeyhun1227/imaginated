import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layouts/Layout'
import client from '../components/GraphQL';
import { ApolloProvider } from "@apollo/client";


import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <SessionProvider session={pageProps.session}>  
            <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </ApolloProvider>
     </SessionProvider>
  }

