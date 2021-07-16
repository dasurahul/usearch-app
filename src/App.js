import React from "react";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";

const App = () => {
  return (
    <div>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/search/:q">
        <Search />
      </Route>
    </div>
  );
};

export default App;
