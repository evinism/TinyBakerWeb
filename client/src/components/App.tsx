import React from "react";
import Head from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListTransforms from "./transform/ListTransforms";
import ShowTransform from "./transform/ShowTransform";
import FileStore from "./filestore/FileStore";

function App() {
  return (
    <div className="App">
      <Router>
        <Head />
        <Switch>
          <Route path="/filestore">
            <FileStore />
          </Route>
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
