// import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Predict from './pages/Predict';
import React from 'react';
import Head from './components/Head';
import Menu from './components/Menu';
import Footer from './components/Footer';

class App extends React.Component {

  render(){
    return(
        <Router>
            <Switch>
                <Route path="/">
                    <Predict />
                </Route>
            </Switch>
        </Router>
    )
  }

}

export default App;
