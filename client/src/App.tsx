import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Header from "./component/Header";
import Client from "./component/Client";

//link frontend to backend
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <Client />
      </ApolloProvider>
      App
    </>
  );
};

export default App;
