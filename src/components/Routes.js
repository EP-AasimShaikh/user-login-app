import React, { Component } from "react";
import { BrowserRouter, Routes as Router , Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Homepage from "./HomePage";

export default class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <BrowserRouter>
        <Router>
          <Route path="/" element={<Login />}>    
          </Route>
          <Route path="/login" element={<Login/>}>    
          </Route>
          <Route path="/register" element={<Register/>}>    
          </Route>
          <Route path="/homepage" element={<Homepage/>}>    
          </Route>
        </Router>
      </BrowserRouter>
    );
  }
}
