import React from 'react'; 
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';   // pagination
import { useHistory } from 'react-router-dom';
import { Image } from 'react-bootstrap';

// from https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination&selectedStory=Custom%20Pagination&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
// for pagination
const customTotal = (from: number, to: number, size: number) => (
    <span className="react-bootstrap-table-pagination-total">
        Showing { from } to { to } of { size } results
    </span>
);

function CountryTable(props : any) {
	const columns = [ {
			dataField: 'flag',
			text: 'Image',
			formatter: imageFormatter,
			style: { width: '10%' },
		}, {
			dataField: 'name',
			text: 'Name',
			sort: true
		}, {
			dataField: 'total_pop',
			text: 'Population',
			sort: true
		}, {
			dataField: 'capital',
			text: 'Capital',
			sort: true
		}, {
			dataField: 'region',
			text: 'Region'
		}, {
			dataField: 'area',
			text: 'Land Area',
			sort: true
		}
    ];

    // pagination
    const options = {
        paginationSize: 4,
        pageStartIndex: 1,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: 'First',
        prePageText: '<',
        nextPageText: '>',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
            text: '10', value: 10
        }, {
            text: '20', value: 20
        }, {
            text: '50', value: 50
        }, {
            text: 'All', value: props.countries.length
        }] // A numeric array is also available. the purpose of above example is custom the text
    };

	let history = useHistory();
	
	function imageFormatter(cell : any, row : any, rowIndex: number) {
		return (
			<Image src={row.flag} rounded fluid style={{ width: '100%' }} />
		);
	}

    return (
        <div>
		    <BootstrapTable striped
			    keyField='name' 
			    data={ props.countries } 
                columns={columns}
                pagination={ paginationFactory(options) }
                hover
            />
        </div>
	)
}

export default CountryTable;