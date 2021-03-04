import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import App from './App';
import Home from './pages/Home';
import About from './pages/About';

const MyRoutes = () => {
	return (
		<section className="MyRoutes">
			<Router>
				<App/>
				<Link to="/">Home</Link>
				<Link to="/about">About us</Link>

				<Route path="/" component={Home}/>
				<Route path="/about" component={About}/>
			</Router>
		</section>
	);
};

export default MyRoutes;