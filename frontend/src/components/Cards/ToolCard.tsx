import { Card, Col, Container, ResponsiveEmbed } from 'react-bootstrap'

function ToolCard(props: any) {
	return (
		<Col className="container-fluid mt-4">
			<a className='unformat' href={props.tool.link} >
				<Card bg="white" className='cardShadow' style={{ width: '14rem', height: '20rem'}}>
					<ResponsiveEmbed aspectRatio="1by1">
						<Container style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
							<Card.Img src={props.tool.img} style={{display: 'table-cell', width: '90%', margin: 'auto'}}></Card.Img>
						</Container>
					</ResponsiveEmbed>
					
					<Card.Body>
						<Card.Title style={{textAlign: 'center', fontWeight: 'bold'}}>{props.tool.name}</Card.Title>
						<Card.Text style={{textAlign: 'center'}}>{props.tool.text}</Card.Text>
					</Card.Body>
				</Card>
			</a>
		</Col>
	);
}

export default ToolCard;