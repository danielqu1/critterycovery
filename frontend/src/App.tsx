import React, { useState } from 'react';
import './App.css'; 
import Navbar from './components/Navbar'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import axios from 'axios';
import Home from './pages/Home';
import About from './pages/About';
import Species from './pages/Species';
import Habitats from './pages/Habitats';
import Countries from './pages/Countries';

function App() {

  const [name, setName] = useState("new");

  axios.get("/api/name").then((response) => {
    setName(response.data.name);
  });

  return (
    <div className="App">
      <Router> 
        <Navbar /> 
        <Switch> 
          <Route path='/' exact component={Home} /> 
          <Route path='/about' exact component={About} /> 
          <Route path='/species' exact component={Species} /> 
          <Route path='/habitats' exact component={Habitats} /> 
          <Route path='/countries' exact component={Countries} /> 
        </Switch> 
      </Router>
      <p>
        { name }
      </p>
    </div>
  );
}

export default App;
