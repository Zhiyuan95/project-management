import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Header from "./component/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import Project from "./page/Project";

//link frontend to backend
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/projects/:id" element={<Project />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
};

export default App;
