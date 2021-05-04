/*	Card containing an image, name, bio, and stats for a developer (or summary) displayed on the about page*/
import { Card, Container, Row, Col } from 'react-bootstrap'
import { LinkedinOutlined } from '@ant-design/icons';

function PersonCard(props: any) {

	// Hides linkedin icon if not present
	let iconVisibility = 'inline-flex'
	if(props.person.linkedin == null){
		iconVisibility = 'none'
	}

	return(
		<Card bg="white" style={{}}>
			<Card.Img variant="top" src={props.person.photo}></Card.Img>
			<Card.Body>
				{/* Needed to center the title and linkedin link vertically and horizontally */}
				<Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
					<Card.Title style={{fontWeight: 'bold'}}>{props.person.name} <a href={props.person.linkedin}><LinkedinOutlined style={{display:iconVisibility}}/></a></Card.Title>
				</Row>
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