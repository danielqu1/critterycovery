import { Card, Button} from 'react-bootstrap'

function ToolCard(props: any) {
    return(
        <a href={props.link}>
            <Card bg="white" style={{width: '20rem'}}>
                <Card.Img variant="top" src={props.img}></Card.Img>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>{props.text}</Card.Text>
                </Card.Body>
            </Card>
        </a>
    );
}

export default ToolCard;