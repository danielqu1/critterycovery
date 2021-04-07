import { Card } from 'react-bootstrap'
import { Col } from 'react-bootstrap';

function ToolCard(props: any) {
	return (
		<Col className="container-fluid mt-4">
		<a href={props.tool.link}>
                <Card bg="white" style={{ width: '20rem', height: '30rem'}}>
				<Card.Img variant="top" src={props.tool.img} width="20%"></Card.Img>
				<Card.Body>
					<Card.Title>{props.tool.name}</Card.Title>
					<Card.Text>{props.tool.text}</Card.Text>
				</Card.Body>
			</Card>
		</a></Col>
	);
}

export default ToolCard;