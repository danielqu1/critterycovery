import { Card } from 'react-bootstrap'

function PersonCard(props: any) {
    return(
        <Card bg="white">
            <Card.Body>
                <Card.Title>{props.person.name}</Card.Title>
                <Card.Text>{props.person.aboutInfo}</Card.Text>
                <Card.Footer>GitlabStats</Card.Footer>
            </Card.Body>
        </Card>
    );
}

export default PersonCard;