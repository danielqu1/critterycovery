import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';   // pagination
import { Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

// from https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination&selectedStory=Custom%20Pagination&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
// for pagination
const customTotal = (from: number, to: number, size: number) => (
	<span className="react-bootstrap-table-pagination-total">
		Showing { from} to { to} of { size} results
	</span>
);

function HabitatTable(props: any) {
	const columns = [
		{
			dataField: 'image_link',
			text: 'Image',
			formatter: imageFormatter,
			style: { width: '10%' },
		}, {
			dataField: 'name',
			text: 'Name',
			sort: true
		}, {
			dataField: 'designation_name',
			text: 'Designation',
			sort: true
		}, {
			dataField: 'reported_terrestrial_area',
			text: 'Land Area',
			sort: true
		}, {
			dataField: 'reported_marine_area',
			text: 'Water Area',
			sort: true
		}, {
			dataField: 'is_marine',
			text: 'Marine',
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
			text: 'All', value: props.habitats.length
		}] // A numeric array is also available. the purpose of above example is custom the text
	};

	let history = useHistory();
	const rowEvents = {
		onClick: (e: any, row: any, rowIndex: number) => {
			props.update(props.habitats[rowIndex + props.startingCard]);
		},
	};

	function imageFormatter(cell: any, row: any, rowIndex: number) {
		return (
			<Image src={row.image_link} rounded fluid style={{ width: '100%' }} />
		);
	}
	
	return (
		<BootstrapTable striped
			keyField='name'
			data={props.habitats}
			columns={columns}
			rowEvents={rowEvents}
			pagination={paginationFactory(options)}
			hover
		/>
	);
}

export default HabitatTable;