import { Card, Button} from 'react-bootstrap'
import Models from './Home'

function ModelCard(props: any) {
    return(
        <Button href={props.models.href} variant='light'>
            <Card bg="white" style={{width: '20rem'}}>
                <Card.Img variant="top" src={props.models.image}></Card.Img>
                <Card.Body>
                    <Card.Title>{props.models.title}</Card.Title>
                    <Card.Text>{props.models.text}</Card.Text>
                </Card.Body>
            </Card>
        </Button>
    );
}

export default ModelCard;