import React from 'react';
import { Table, Nav } from 'react-bootstrap';
import { useParams } from "react-router-dom";

function Countries() {
    const {id} = useParams<{ id: string }>();
    const [modalShow, setModalShow] = React.useState(id != null);

    return(
        <div>
            <h1>Countries {id}</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Country</th>
                    <th>Capital</th>
                    <th>Location</th>
                    <th>Population</th>
                    <th>Size</th>
                    <th>GDP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><Nav.Link href="/countries/Argentina">Argentina</Nav.Link></td>
                    <td>Buenos Aires</td>
                    <td>Americas</td>
                    <td>43590400</td>
                    <td>1.074 million mi^2</td>
                    <td>450 billion</td>
                    </tr>
                    <tr>
                    <td><Nav.Link href="/countries/Australia">Australia</Nav.Link></td>
                    <td>Canberra</td>
                    <td>Oceania</td>
                    <td>24117360</td>
                    <td>2.97 million mi^2</td>
                    <td>1.34 trillion</td>
                    </tr>
                    <tr>
                    <td><Nav.Link href="/countries/Germany">Germany</Nav.Link></td>
                    <td>Berlin</td>
                    <td>Europe</td>
                    <td>81770900</td>
                    <td>140,000 mi^2</td>
                    <td>3.9 trillion</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default Countries;
