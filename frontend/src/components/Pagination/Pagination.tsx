// Adds pagination to an array of elements
import { Pagination, Button, ButtonGroup, Row, Col } from 'react-bootstrap';

function PaginationMain(props: any) {

	const pageButtons = []; // array of buttons that the user can use to switch pages
	const totalPages = Math.ceil(props.totalInstances / props.instancesPerPage); // number of array items
	const activePage = Math.floor(props.startingInstance/props.instancesPerPage + 1); //current page that is loaded

	// Creates buttons based on current page, items per page, and whether the page is near the beginning or end.
	if (activePage - props.offsetPagesShownFromCurrent > 0){
		pageButtons.push(<Pagination.Item onClick={() => props.setStartingInstance(0)}>{1}</Pagination.Item>)
		if (activePage - props.offsetPagesShownFromCurrent - 1 > 0){
			pageButtons.push(<Pagination.Ellipsis/>)
		}
	}
	for (let i = activePage - props.offsetPagesShownFromCurrent + 1; i <= props.startingInstance/props.instancesPerPage + props.offsetPagesShownFromCurrent; i++) {
		if(i > 0 && i < totalPages + 1){
			if(i === activePage){
				pageButtons.push(<Pagination.Item active>{i}</Pagination.Item>)
			}
			else{
				pageButtons.push(<Pagination.Item onClick={() => props.setStartingInstance((i-1) * props.instancesPerPage)}>{i}</Pagination.Item>)
			}
		}
	}
	if (activePage + props.offsetPagesShownFromCurrent < totalPages){
		if (activePage + props.offsetPagesShownFromCurrent - 1 < totalPages){
			pageButtons.push(<Pagination.Ellipsis/>)
		}
		pageButtons.push(<Pagination.Item onClick={() => props.setStartingInstance((totalPages - 1) * props.instancesPerPage)}>{totalPages}</Pagination.Item>)
		
	}

	return ( 
		<Row className="justify-content-md-center" style={{padding: '1% 0', margin: '2% 0', borderTop: '.25rem dotted grey'}}>
			<Col xs lg="2">
				{/* displays the item numbers being shown and total number of items */}
				{props.startingInstance}-{props.startingInstance+props.instancesPerPage} of {props.totalInstances} species
			</Col>
			<Col md="auto">
				{/* react bootstrap pagination already gives us onclick functionality and allows us to add buttons */}
				<Pagination>
					<Pagination.First onClick={() => props.setStartingInstance(0)}/>
					<Pagination.Prev onClick={() => props.setStartingInstance(Math.max(0, props.startingInstance - props.instancesPerPage))}/>
					{pageButtons}
					<Pagination.Next onClick={() => props.setStartingInstance(Math.min(((totalPages - 1) * props.instancesPerPage), props.startingInstance + props.instancesPerPage))}/>
					<Pagination.Last onClick={() => props.setStartingInstance((totalPages - 1) * props.instancesPerPage)}/>
				</Pagination>
			</Col>
			<Col xs lg="2">
				{/* buttons for changing the number of items per page */}
				<ButtonGroup>
					<Button variant="outline-primary" onClick={() => props.setInstancesPerPage(10)}>10</Button> 
					<Button variant="outline-primary" onClick={() => props.setInstancesPerPage(20)}>20</Button> 
					<Button variant="outline-primary" onClick={() => props.setInstancesPerPage(50)}>50</Button>
				</ButtonGroup>
			</Col>
		</Row>
	);
};

export default PaginationMain;