import React from "react";
import Head from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
import ListTransforms from "./ListTransforms";

function App() {
  return (
    <div className="App">
      <Router>
        <Head />
        <ListTransforms />
      </Router>
    </div>
  );
}

export default App;
