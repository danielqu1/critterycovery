import React from 'react';
import { Col } from 'react-bootstrap';
import ToolCard from '../Cards/ToolCard'

// must be consisten with props.tool in ToolCard
type Tool = {
	name: string;
	text: string;
	img: string;
	link: string;
}

 // list of currently used tools
function ToolDeck(props : any) {
	const cards = [];
	for (let i = 0; i < props.tools.length; i++) {
		cards.push(<Col style={{paddingLeft:0, paddingRight:0}}><ToolCard tool={props.tools[i]} style={{}}></ToolCard></Col>);
	}

	return (
		<>
			{cards}
		</>
	); 
}

export default ToolDeck;