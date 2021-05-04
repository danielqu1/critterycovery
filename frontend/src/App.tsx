import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

import NavbarMain from './components/Navbar/Navbar'; 
import Home from './pages/Home';
import About from './pages/About';
import Species from './pages/Species';
import Habitats from './pages/Habitats';
import Countries from './pages/Countries';
import Support from './pages/Support';
import Search from './pages/Search';
import Error from './pages/Error';
import ScrollToTopBtn from "./hooks/ScrollToTop";
import Visualizations from './pages/Visualizations';
import ProviderVisualizations from './pages/ProviderVisualizations';

import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Created in index.tsx. Here, we place a Router and the Navigation Bar 
 * as links to the other pages of the website. 
 */

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
					<Route path='/support' children={<Support />} />
					<Route path='/search' children={<Search />} />
					<Route path='/visualizations' children={<Visualizations />} />
					<Route path='/providerVisualizations' children={<ProviderVisualizations />} />
					<Route component={Error} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
