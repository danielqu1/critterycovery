import { Card } from 'react-bootstrap'


function PersonCard(props: any) {
	return(
		<Card bg="white" style={{width: '95%'}}>
			<Card.Img variant="top" src={props.person.photo}></Card.Img>
			<Card.Body>
				<Card.Title>{props.person.name}</Card.Title>
				<Card.Footer>{props.person.role}</Card.Footer>
				<Card.Text>{props.person.aboutInfo}</Card.Text>
				<Card.Footer>
					Commits: {props.person.stats.commits} <br />
					Issues: {props.person.stats.issues} <br />
					Unit Tests: {props.person.stats.unittests}
				</Card.Footer>
			</Card.Body>
		</Card>
	);
}

export default PersonCard;