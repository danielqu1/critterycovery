import { Card, ResponsiveEmbed } from 'react-bootstrap';
import Highlighter from 'react-highlight-words';

function CountryCard(props: any) {
    return(
        <Card bg="white" style={{width: '100%'}}>
            {/*  */}
            <ResponsiveEmbed aspectRatio="1by1">
                <Card.Img variant="top" src={props.flag}/>
            </ResponsiveEmbed>
            <Card.Body>
                <Card.Title><Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.country.name}
                            /></Card.Title>
                <Card.Text>
                    Population: <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.country.population ? props.country.population.toString() : ''}
                            /><br/>
                    Capital: <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.country.capital ? props.country.capital.toString() : ''}
                            /><br/>
                    Region: <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.country.region ? props.country.region.toString() : ''}
                            /><br/>
                    Land Area: <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={props.searchVal.split(' ')}
                                autoEscape
                                textToHighlight={props.country.area ? props.country.area.toString() : ''}
                            /><br/>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CountryCard;