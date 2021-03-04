import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/// https://www.geeksforgeeks.org/reactjs-importing-exporting/
class Home extends Component<{}, { color: string }> {
	
	constructor(props: any) {
		super(props);
		this.state = { color : '#4cb96b'};
	}

	getClick() {
		if(this.state.color === '#4cb96b')
			this.setState({ color : '#aaa'});
		else 
			this.setState({ color : '#4cb96b'});
	}

	render() {
		return <h1 style={ this.state}
					onClick = {this.getClick.bind(this)}>
				You are looking at Home page!
				<Link to="/about">Should be link to About</Link>
				</h1>
	}
}
export default Home;
