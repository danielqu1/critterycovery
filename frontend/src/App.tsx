import React from 'react';
import './App.css'; 
import NavbarMain from './components/Navbar/Navbar'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import About from './pages/About';
import Species from './pages/Species';
import Habitats from './pages/Habitats';
import Countries from './pages/Countries';
import Search from './pages/Search'
import Error from './pages/Error'
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTopBtn from "./hooks/ScrollToTop";

import 'antd/dist/antd.css'

function App() {

  return (
    <div className="App">
      <Router> 
        <NavbarMain /> 
        <ScrollToTopBtn />
        <Switch> 
          <Route path='/' exact component={Home} /> 
          <Route path='/about' exact component={About} /> 
          <Route path='/species/:id?' children={<Species />} />
          <Route path='/habitats/:id?' children={<Habitats />} />
          <Route path='/countries/:id?' children={<Countries />} />
          <Route path='/search' children={<Search />} />
          <Route component={Error}/>
        </Switch> 
      </Router>
    </div>
  );
}

export default App;
