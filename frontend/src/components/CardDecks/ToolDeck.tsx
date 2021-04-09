import React from 'react';
import { Col } from 'react-bootstrap';
import ToolCard from '../Cards/ToolCard'

// get all image logos
import AWSLogo from "../../images/tools/AWSLogo.png"
import BlackLogo from "../../images/tools/BlackLogo.png"
import DockerLogo from "../../images/tools/DockerLogo.png"
import FlaskLogo from "../../images/tools/FlaskLogo.jpg"
import GCPLogo from "../../images/tools/GCPLogo.png"
import GitLabLogo from "../../images/tools/GitLabLogo.png"
import JestLogo from "../../images/tools/JestLogo.png"
import MarshmallowLogo from "../../images/tools/MarshmallowLogo.png"
import NamecheapLogo from "../../images/tools/NamecheapLogo.png"
import PostgresLogo from "../../images/tools/PostgresLogo.png"
import PostmanLogo from "../../images/tools/PostmanLogo.png"
import ReactLogo from "../../images/tools/ReactLogo.png"
import SeleniumLogo from "../../images/tools/SeleniumLogo.png"
import SQLAlchemyLogo from "../../images/tools/SQLAlchemyLogo.png"

// must be consisten with props.tool in ToolCard
type Tool = {
	name: string;
	text: string;
	img: string;
	link: string;
}

 // list of currently used tools
function ToolDeck() {
	let tools: Tool[] = [
		{
			name: "Amazon Web Services",
			text: "Server host",
			img: AWSLogo,
			link: "https://aws.amazon.com/"
		},
		{
			name: "Black",
			text: "Python formatter",
			img: BlackLogo,
			link: "https://black.readthedocs.io/en/stable/"
		},
		{
			name: "Docker",
			text: "Unified environment",
			img: DockerLogo,
			link: "https://www.docker.com/"
		},
		{
			name: "Flask",
			text: "Backend",
			img: FlaskLogo,
			link: "https://flask.palletsprojects.com/en/1.1.x/"
		},
		{
			name: "Google Cloud Platform",
			text: "Database host",
			img: GCPLogo,
			link: "https://cloud.google.com/"
		},
		{
			name: "GitLab",
			text: "Version control",
			img: GitLabLogo,
			link: "http://gitlab.com/"
		},
		{
			name: "Jest",
			text: "Javascript Unit Testing",
			img: JestLogo,
			link: "https://jestjs.io/"
		},
		{
			name: "Marshmallow",
			text: "Backend tool",
			img: MarshmallowLogo,
			link: "https://marshmallow.readthedocs.io/en/stable/"
		},
		{
			name: "Namecheap",
			text: "Domain host",
			img: NamecheapLogo,
			link: "https://www.namecheap.com/"
		},
		{
			name: "Postgres",
			text: "Database",
			img: PostgresLogo,
			link: "https://www.postgresql.org/"
		},
		{
			name: "Postman",
			text: "Backend API",
			img: PostmanLogo,
			link: "https://www.postman.com/"
		},
		{
			name: "React",
			text: "Website Frontend",
			img: ReactLogo,
			link: "https://reactjs.org/"

		},
		{
			name: "Selenium",
			text: "Testing GUI",
			img: SeleniumLogo,
			link: "https://www.selenium.dev/selenium-ide/"
		},
		{
			name: "SQL-Alchemy",
			text: "Backend",
			img: SQLAlchemyLogo,
			link: "https://www.sqlalchemy.org/"
		}
	];

	const cards = [];
	for (let i = 0; i < tools.length; i++) {
		cards.push(<Col><ToolCard tool={tools[i]}></ToolCard></Col>);
	}

	return (
		<>
			{cards}
		</>
	); 
}

export default ToolDeck;