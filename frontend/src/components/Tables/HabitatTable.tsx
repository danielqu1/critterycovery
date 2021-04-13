import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';   // pagination
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search, TableSearchProps} from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import { Image, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const { SearchBar } = Search;
// from https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination&selectedStory=Custom%20Pagination&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
// for pagination
const customTotal = (from: number, to: number, size: number) => (
	<span className="react-bootstrap-table-pagination-total">
		Showing { from} to { to} of { size} results
	</span>
);
let terr_filter_props = {}
let mar_filter_props = {}
function HabitatTable(props: any) {
	const columns = [
		{
			dataField: 'image_link',
			text: 'Image',
			formatter: imageFormatter,
			style: { width: '10%' },
      searchable: false
		}, {
			dataField: 'name',
			text: 'Name',
			sort: true,
      filter: textFilter()
		}, {
			dataField: 'designation_name',
			text: 'Designation',
			sort: true,
      filter: textFilter()
		}, {
			dataField: 'reported_terrestrial_area',
			text: 'Land Area',
			sort: true,
      filter: numberFilter(terr_filter_props)
		}, {
			dataField: 'reported_marine_area',
			text: 'Water Area',
			sort: true,
      filter: numberFilter(mar_filter_props)
		}, {
			dataField: 'is_marine',
			text: 'Marine',
			sort: true,
      filter: textFilter()
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
			props.update(props.habitats[rowIndex]);
		},
	};

	function imageFormatter(cell: any, row: any, rowIndex: number) {
		return (
			<Image src={row.image_link} rounded fluid style={{ width: '100%' }} />
		);
	}
  
  let habitats = props.habitats;
	return (
  <ToolkitProvider
    keyField="name"
    data={ props.habitats }
    columns={ columns }
    search
  >
    { props => (
      <Container>
        <Keywords
          text={TEXT}
          maxKeywords={8}
          color="mistyrose"
        />
        <Container id='TEXT'>
          <h3>Input something at below input field:</h3>
          <SearchBar
            { ...props.searchProps }
            className="custome-search-field"
            style={ { color: 'white' } }
            delay={ 100 }
            placeholder="Search Something!!!"
          />
          <hr />
          <BootstrapTable striped
            {...props.baseProps}
            keyField='name'
            data={habitats}
            columns={columns}
            rowEvents={rowEvents}
            pagination={paginationFactory(options)}
            filter={ filterFactory() }
            hover
          />
        </Container>
      </Container>
    )}
    </ToolkitProvider>
	);
}

export default HabitatTable;