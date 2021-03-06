import React from 'react';
import { Table, Nav } from 'react-bootstrap';

function Species() {
    return(
        <div>
            <h1>Species</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Species Name</th>
                    <th>Body Mass</th>
                    <th>Length</th>
                    <th>Height</th>
                    <th>Number</th>
                    <th>Taxonomy</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><Nav.Link href="/species/Antelope">Antelope</Nav.Link></td>
                    <td>430 lbs</td>
                    <td>9.7 ft</td>
                    <td>4.6 ft</td>
                    <td>71,000</td>
                    <td>Antilocapra americana</td>
                    </tr>
                    <tr>
                    <td><Nav.Link href="/species/Zebra">Zebra</Nav.Link></td>
                    <td>800 lbs</td>
                    <td>5.8 ft</td>
                    <td>4.8 ft</td>
                    <td>9,000</td>
                    <td>Equus zebra Linnaeus</td>
                    </tr>
                    <tr>
                    <td><Nav.Link href="/species/Jaguar">Jaguar</Nav.Link></td>
                    <td>180 lbs</td>
                    <td>5.2 ft</td>
                    <td>2.3 ft</td>
                    <td>64,000</td>
                    <td>Panthera onca</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default Species;


// import React from 'react'; 
  
// const Species = () => { 
//   return ( 
//     <div 
//       style={{ 
//         display: 'flex', 
//         justifyContent: 'Right', 
//         alignItems: 'Right', 
//         height: '100vh'
//       }} 
//     > 
//       <h1>RETURN TO MONKE</h1> 
//     </div> 
//   ); 
// }; 
  
// export default Species;