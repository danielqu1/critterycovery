import { Card, ResponsiveEmbed } from 'react-bootstrap';

function SpeciesCard(props: any) {
    return(
        <Card bg="white" style={{width: '100%'}}>
            {/*  */}
            <ResponsiveEmbed aspectRatio="1by1">
                <Card.Img variant="top" src={props.photo}/>
            </ResponsiveEmbed>
            <Card.Body>
                <Card.Title>{props.animal.common_name ? props.animal.common_name : props.animal.scientific_name}</Card.Title>
                <Card.Text>
                    Kingdom: {props.animal.kingdom}<br/>
                    Phylum: {props.animal.phylum}<br/>
                    Class: {props.animal._class}<br/>
                    Order: {props.animal._order}<br/>
                    Family: {props.animal.family}<br/>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SpeciesCard;