import React, { useState } from 'react';
import './App.css'; 
import Navbar_main from './components/Navbar/Navbar'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
//import axios from 'axios';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Species from './pages/Species';
import Habitats from './pages/Habitats';
import Countries from './pages/Countries';
import Argentina from './pages/instancepages/Argentina';
import Australia from './pages/instancepages/Australia';
import Germany from './pages/instancepages/Germany';
import Desert from './pages/instancepages/Desert';
import Grassland from './pages/instancepages/Grassland';
import Forest from './pages/instancepages/Forest';
import Antelope from './pages/instancepages/Antelope';
import Zebra from './pages/instancepages/Zebra';
import Jaguar from './pages/instancepages/Jaguar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTopBtn from "./hooks/ScrollToTop";

function App() {

  // const [name, setName] = useState("new");

  // axios.get("/api/name").then((response) => {
  //   setName(response.data.name);
  // });

  return (
    <div className="App">
      <Router> 
        <Navbar_main /> 
        <ScrollToTopBtn />
        <Switch> 
          <Route path='/' exact component={Home} /> 
          <Route path='/about' exact component={About} /> 
          <Route path='/species' exact component={Species} /> 
          <Route path='/habitats' exact component={Habitats} /> 
          <Route path='/countries' exact component={Countries} /> 
          <Route path='/countries/Argentina' exact component={Argentina} /> 
          <Route path='/countries/Australia' exact component={Australia} /> 
          <Route path='/countries/Germany' exact component={Germany} /> 
          <Route path='/habitats/Desert' exact component={Desert} /> 
          <Route path='/habitats/Grassland' exact component={Grassland} /> 
          <Route path='/habitats/Forest' exact component={Forest} /> 
          <Route path='/species/Antelope' exact component={Antelope} /> 
          <Route path='/species/Zebra' exact component={Zebra} /> 
          <Route path='/species/Jaguar' exact component={Jaguar} /> 
        </Switch> 
      </Router>
    </div>
  );
}

export default App;
