
import React from "react";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import Nav from "./components/Nav";

import Drop from './components/pages/Drop';
import "./styles/main.scss";


function App() {
  return (
    <Router>
      <Switch>
        
         <Route exact path="/drop" component={Drop} />
         <Route exact path="/nav" component={Nav} />
      </Switch>
    </Router>

  );
}

export default App;
