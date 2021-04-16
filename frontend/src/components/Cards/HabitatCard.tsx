import { Card, ResponsiveEmbed } from 'react-bootstrap';
import Highlighter from 'react-highlight-words';

function HabitatCard(props: any) {
    return(
        <Card bg="white" style={{width: '100%'}}>
            {/*  */}
            <ResponsiveEmbed aspectRatio="1by1">
                <Card.Img variant="top" src={props.image_link}/>
            </ResponsiveEmbed>
            <Card.Body>
                <Card.Title><Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.habitat.name}
                            /></Card.Title>
                <Card.Text>
                    Designation: <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.habitat.designation_name}
                            /><br/>
                    Land Area (Km^2): <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.habitat.reported_terrestrial_area ? props.habitat.reported_terrestrial_area.toString() : ''}
                            /><br/>
                    Water Area (Km^2): <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.habitat.reported_marine_area ? props.habitat.reported_marine_area.toString() : ''}
                            /><br/>
                    IUCN Category: <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.habitat.iucn_category ? props.habitat.iucn_category.toString() : ''}
                            /><br/>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default HabitatCard;