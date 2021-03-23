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
import Error from './pages/Error'
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTopBtn from "./hooks/ScrollToTop";

function App() {

  // const [name, setName] = useState("new");

  // axios.get("/api/name").then((response) => {
  //   setName(response.data.name);
  // });

  // let {id} = useParams<{ id: string }>();

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
          <Route path='/species/:id' children={Species} />
          <Route path='/habitats/:id' children={Habitats} />
          <Route path='/countries/:id' children={Countries} />
          <Route component={Error}/>
        </Switch> 
      </Router>
    </div>
  );
}

export default App;
