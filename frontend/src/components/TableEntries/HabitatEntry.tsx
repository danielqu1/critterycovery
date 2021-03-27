import { Card, Nav } from 'react-bootstrap';

function HabitatEntry(props: any) {
    return(
        <tr>
            <td>{props.habitat.name}</td>
            <td>{props.habitat.designation_name}</td>
            <td>{props.habitat.reported_terrestrial_area}</td>
            <td>{props.habitat.reported_marine_area}</td>
            <td>{props.habitat.countries}</td>
        </tr>
    );
} 

export default HabitatEntry;