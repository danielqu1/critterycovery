import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/// https://www.geeksforgeeks.org/reactjs-importing-exporting/
class About extends Component<{}, { color: string }> {
	
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
				You are looking at About page
				<Link to="/">Should be link to Home</Link>
				</h1>
	}
}

export default About;