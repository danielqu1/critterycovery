import { Card } from 'react-bootstrap'
import Person from './About'

function PersonCard(props: any) {
    return(
        <Card bg="white">
            <Card.Body>
                <Card.Title>{props.person.name}</Card.Title>
                <Card.Text>{props.person.aboutInfo}</Card.Text>
                <Card.Footer>
                    Commits: {props.person.stats.commits}
                    Issues: {props.person.stats.issues}
                    Unit Tests: {props.person.stats.unittests}
                </Card.Footer>
            </Card.Body>
        </Card>
    );
}

export default PersonCard;