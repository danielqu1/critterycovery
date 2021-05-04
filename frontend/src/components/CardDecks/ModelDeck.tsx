/* Displays 3 cards on the home page which each have an icon representing each model */
import { Col } from 'react-bootstrap';
import HomeCard from '../Cards/HomeCard';

import animal from '../../images/models/animal.png';
import habitat from '../../images/models/habitat.png';
import globe from '../../images/models/globe.png';
  
type Models = {
	href: string,
	title: string,
	image: string,
	text: string
}

function ModelDeck()  { 
	//Array of cards, add to this using the same format to add models
	let models: Models[] = [
		{ href: "/species",
		  title: "Species",
		  image: animal,
		  text: "Click here to go to species"
		},
		{ href: "/habitats",
		  title: "Habitats",
		  image: habitat,
		  text: "Click here to go to habitats"
		},
		{ href: "/countries",
		  title: "Countries",
		  image: globe,
		  text: "Click here to go to countries"
		},
	
	  ];
	

	const cards = []
	for(let i = 0; i < models.length; i++){
		cards.push(<Col style={{padding:0}}><HomeCard models={models[i]}/></Col>)
	}
	
  return (
	<>
	{cards}
	</>
  ); 
}; 
  
export default ModelDeck;
