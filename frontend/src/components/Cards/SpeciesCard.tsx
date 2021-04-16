import { Card, ResponsiveEmbed } from 'react-bootstrap';
import Highlighter from 'react-highlight-words';

function SpeciesCard(props: any) {
    return(
        <Card bg="white" style={{width: '100%'}}>
            {/*  */}
            <ResponsiveEmbed aspectRatio="1by1">
                <Card.Img variant="top" src={props.photo}/>
            </ResponsiveEmbed>
            <Card.Body>
                <Card.Title><Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.animal.common_name ? props.animal.common_name : props.animal.scientific_name}
                            /></Card.Title>
                <Card.Text>
                    Kingdom: <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.animal.kingdom ? props.animal.kingdom.toString() : ''}
                            /><br/>
                    Phylum: <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.animal.phylum ? props.animal.phylum.toString() : ''}
                            /><br/>
                    Class: <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.animal._class ? props.animal._class.toString() : ''}
                            /><br/>
                    Order: <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.animal._order ? props.animal._order.toString() : ''}
                            /><br/>
                    Family: <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.animal.family ? props.animal.family.toString() : ''}
                            /><br/>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SpeciesCard;