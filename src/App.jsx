import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from "./components/Footer";

import Home from "./components/Home/Home";

import Help from "./components/Help/Help";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path = "/" component = { Home } />
          <Route path = "/help" component = { Help } />
        </Switch>
        {/* <Footer /> */}
      </React.Fragment>
    );
}

export default App;
