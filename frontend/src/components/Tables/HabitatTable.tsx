import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

function HabitatTable(props : any){
    const columns = [{
        dataField: 'image_link',
        text: 'Image',
        formatter: imageFormatter,
        style: { width: '10%'},
      }, {
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
        },
    };

    function imageFormatter(cell : any, row : any, rowIndex: number) {
      return (
        <Image src={row.image_link} rounded fluid style={{width:'100%'}}/>
      );
    }
    
    return(
        <BootstrapTable striped
            keyField='name' 
            data={ props.habitats.slice(props.startingCard, props.startingCard+props.maxCardsShown) } 
            columns={ columns } 
            rowEvents={ rowEvents } 
            hover/>
    )
}

export default HabitatTable;