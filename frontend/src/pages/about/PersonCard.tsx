import { Card } from 'react-bootstrap'
import Person from './About'

function PersonCard(props: any) {
    return(
        <Card bg="white" style={{width: '30rem'}}>
            <Card.Body>
                <Card.Title>{props.person.name}</Card.Title>
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