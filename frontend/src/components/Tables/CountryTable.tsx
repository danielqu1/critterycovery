import React from 'react'; 
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from 'react-router-dom';

function CountryTable(props : any){
    const columns = [{
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'total_pop',
        text: 'Population'
      }, {
        dataField: 'capital',
        text: 'capital'
      }, {
        dataField: 'region',
        text: 'Region'
      }, {
        dataField: 'area',
        text: 'Land Area'
      }];

    let history = useHistory();
    const rowEvents = {
        onClick: (e: any, row: any, rowIndex: number) => {
            props.update(props.countries[rowIndex + props.startingCard]);
            history.push(`/countries/${props.countries[rowIndex + props.startingCard].name}`)
        },
    };
    
    return(
        <BootstrapTable 
            keyField='name' 
            data={ props.countries.slice(props.startingCard, props.startingCard+props.maxCardsShown) } 
            columns={ columns } 
            rowEvents={ rowEvents } 
            hover/>
    )
}

export default CountryTable;