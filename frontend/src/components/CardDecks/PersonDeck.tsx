import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Col } from 'react-bootstrap';
import PersonCard from '../Cards/PersonCard'

import brian from "../../images/ourPhotos/brian.jpg"
import daniel from "../../images/ourPhotos/daniel.jpg"
import sahithi from "../../images/ourPhotos/sahithi.jpg"
import shaharyar from "../../images/ourPhotos/shaharyar.jpg"
import will from "../../images/ourPhotos/will.jpg"
import savetheanimals from "../../images/ourPhotos/savetheanimals.jpg"
  
interface PersonStats {
	name: string;
	commits: number;
	issues: number;
	unittests: number;
  }

interface GitlabData {
stats: PersonStats[]
}

type Person = {
	name: string;
	stats: PersonStats;
	aboutInfo: string;
	role: string;
	photo: string;
  }

function getStats(stats: PersonStats[], shortened: string): PersonStats {
	for (let i = 0; i < stats.length; i++) {
		if (stats[i].name === shortened) {
		return stats[i];
		}
	}
	return {name: shortened, commits: 0, issues: 0, unittests: 0};
}


function PersonDeck()  { 
	const [stats, setStats] = useState(new Array<PersonStats>());
	useEffect(() => {
		axios.get<GitlabData>("/api/gitlabstats").then((response) => {
		  setStats(response.data.stats);
		})
	}, []);
	
	let people: Person[] = [
	{
		name: "Shaharyar Lakhani",
		stats: getStats(stats, "sh"),
		aboutInfo: "Shaharyar Lakhani is a Junior in the CS department" + 
		" here at UT Austin. He has learned a lot about web development through" + 
		" this project, and is excited to use his skills from this class so" +
		" far to potentially create a startup! His hobbies include playing basketball," +
		" going on hikes, singing, and cooking.",
		role: "Backend Lead and Dev",
		photo: shaharyar
	},
	{
		name: "Brian Wang",
		stats: getStats(stats, "br"),
		aboutInfo: "Brian Wang is a junior at UT Austin. He is thrilled to be in" +
		" SWE this semester, and he can't wait to see the website up and running!" +
		" His hobbies include reading and doing jigsaw puzzles.",
		role: "Test Master and Frontend Dev",
		photo: brian
	},
	{
		name: "Daniel Qu",
		stats: getStats(stats, "da"),
		aboutInfo: "Daniel Qu is a sophomore in the CS department at UT Austin. He is" +
		" fairly new to web development, but is very eager to learn. He recently adopted a" +
		" kitten named Kiki! In his free time he enjoys playing chess and Sudoku.",
		role: "Documentation Expert and Dev",
		photo: daniel
	},
	{
		name: "William Crawford",
		stats: getStats(stats, "w"),
		aboutInfo: "William Crawford is a junior CS major at UT Austin. He is new" +
		" to web dev, but likes to do a little bit of everything. He is yet another" + 
		" startup hopeful and wants to learn something new everyday. In his free " +
		"time, he likes to swim and play building or strategy based video games.",
		role: "Frontend Lead and Designer",
		photo: will
	},
	{
		name: "Sahithi Golkonda",
		stats: getStats(stats, "sa"),
		aboutInfo: "Sahithi Golkonda is a junior at UT Austin, where she's double majoring" +
		" in CS and Math. She’s interested in web dev and AI, and is also the Academic" +
		" Officer for the Women in Computer Science organization at UT. In her free " +
		"time, she enjoys running, hiking, and rowing.",
		role: "Data Guru and API Manager",
		photo: sahithi
	},
	{
		name: "Total",
		stats: getStats(stats, "total"),
		aboutInfo: "All",
		role: "All commits, issues, and unittests",
		photo: savetheanimals
	}
	];

	const cards = []
	for(let i = 0; i < people.length; i++){
		cards.push(<Col className="container-fluid mt-4"><PersonCard person={people[i]}></PersonCard></Col>)
	}

	return (
		<>
		{cards}
		</>
	); 
}; 
  
export default PersonDeck;
