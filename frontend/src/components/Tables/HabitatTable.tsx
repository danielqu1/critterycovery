import React from 'react'; 
import {Modal, Button} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from 'react-router-dom';

function HabitatTable(props : any){
    const columns = [{
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'designation_name',
        text: 'Designation'
      }, {
        dataField: 'reported_terrestrial_area',
        text: 'Land Area'
      }, {
        dataField: 'reported_marine_area',
        text: 'Water Area'
      }, {
        dataField: 'countries',
        text: 'Countries'
      }];

    let history = useHistory();
    const rowEvents = {
        onClick: (e: any, row: any, rowIndex: number) => {
            props.update(props.habitats[rowIndex + props.startingCard]);
            history.push(`/habitats/${props.habitats[rowIndex + props.startingCard].name}`)
        },
    };
    
    return(
        <BootstrapTable 
            keyField='name' 
            data={ props.habitats.slice(props.startingCard, props.startingCard+props.maxCardsShown) } 
            columns={ columns } 
            rowEvents={ rowEvents } 
            hover/>
    )
}

export default HabitatTable;