import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if(networkError)  console.log('networkError', networkError.result)
    console.log('Graphqlerror', graphqlErrors)
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        console.log(`Graphql error ${message}`);
      });
    }
  });
  const link = from([
    errorLink,
    new HttpLink({ uri: "https://api.imaginated.com/graphql" }),
  ]);
  // http://localhost:6000/graphql
  // https://api.imaginated.com/graphql
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

export default client