
import { ApolloClient, InMemoryCache} from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
    uri: `ws://localhost:4000/`,
    options: {
      reconnect: true,
    },
});

export const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000/', //connect to server
  cache: new InMemoryCache(),
});

