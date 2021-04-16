import { Card, Button, Image, Container} from 'react-bootstrap'

function ModelADCard(props: any) {
    return(
        <Card bg="white" style={{width: '100%'}} >
            <Card.Body>
                <Card.Title>
                    {props.model} has {props.number} more instances. Click here to view them.
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

export default ModelADCard;