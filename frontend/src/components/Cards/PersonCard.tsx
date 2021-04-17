import { Card, Container, Row, Col } from 'react-bootstrap'


function PersonCard(props: any) {
	return(
		<Card bg="white" style={{}}>
			<Card.Img variant="top" src={props.person.photo}></Card.Img>
			<Card.Body>
				<Card.Title style={{fontWeight: 'bold'}}>{props.person.name}</Card.Title>
				<Card.Footer>{props.person.role}</Card.Footer>
				<Card.Text style={{color: 'grey', paddingTop:'5%'}}>{props.person.aboutInfo}</Card.Text>
				<Card.Footer style={{padding:0}}>
					<Container fluid>
						<Row xs={3} style={{padding:0, textAlign:'center'}}>
							<Col style={{padding:0, margin:0}}>
								Commits <br />{props.person.stats.commits} 
							</Col>
							<Col style={{padding:0, margin:0, borderLeft: '.1rem solid lightgrey', borderRight: '.1rem solid lightgrey'}}>
								Issues <br />{props.person.stats.issues} 
							</Col>
							<Col style={{padding:0, margin:0}}>
								Unit Tests <br />{props.person.stats.unittests}
							</Col>
						</Row>
					</Container>
				</Card.Footer>
			</Card.Body>
		</Card>
	);
}

export default PersonCard;