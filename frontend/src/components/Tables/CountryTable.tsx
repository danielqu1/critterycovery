import React from 'react'; 
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from 'react-router-dom';
import { Image } from 'react-bootstrap'

function CountryTable(props : any){
    const columns = [{
      dataField: 'flag',
      text: 'Image',
      formatter: imageFormatter,
      style: { width: '10%'},
    }, {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'total_pop',
      text: 'Population'
    }, {
      dataField: 'capital',
      text: 'Capital'
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
        },
    };
    
    function imageFormatter(cell : any, row : any, rowIndex: number) {
      return (
        <Image src={row.flag} rounded fluid style={{width:'100%'}}/>
      );
    }

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