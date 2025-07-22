// lib/apollo.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://your-graphql-api.com/graphql',
    cache: new InMemoryCache(),
});
