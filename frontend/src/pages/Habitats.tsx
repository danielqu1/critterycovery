import React from 'react';
import { Table, Nav } from 'react-bootstrap';
import Pagination_main from '../components/Pagination/Pagination'; 
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function Habitats() {
    const {id} = useParams<{ id: string }>();
    const [modalShow, setModalShow] = React.useState(id != null);

    return(
        <div>
            <h1>Habitats</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Habitat type</th>
                    <th>Rain</th>
                    <th>Temperature</th>
                    <th>Sunlight per day</th>
                    <th>Percent of Earth</th>
                    <th>Classification Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><Nav.Link href="/habitats/Desert">Desert</Nav.Link></td>
                    <td>8.03 in</td>
                    <td>117 degrees F</td>
                    <td>8.32 hours</td>
                    <td>33</td>
                    <td>3</td>
                    </tr>
                    <tr>
                    <td><Nav.Link href="/habitats/Grassland">Grassland</Nav.Link></td>
                    <td>30 in</td>
                    <td>60-70 degrees F</td>
                    <td>11.86 hours</td>
                    <td>20-40</td>
                    <td>2.A</td>
                    </tr>
                    <tr>
                    <td><Nav.Link href="/habitats/Forest">Forest</Nav.Link></td>
                    <td>80-100 in</td>
                    <td>50 degrees F</td>
                    <td>12 hours</td>
                    <td>31</td>
                    <td>4.3</td>
                    </tr>
                </tbody>
            </Table>
            <Pagination_main /> 
        </div>
    );
}

export default Habitats;
