import React from "react";
import Head from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListTransforms from "./ListTransforms";
import ShowTransform from "./ShowTransform";

function App() {
  return (
    <div className="App">
      <Router>
        <Head />
        <Switch>
          <Route path="/transforms/:transformId">
            <ShowTransform />
          </Route>
          <Route path="/" exact={true}>
            <ListTransforms />
          </Route>
          <Route path="/">Four Oh Four</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
