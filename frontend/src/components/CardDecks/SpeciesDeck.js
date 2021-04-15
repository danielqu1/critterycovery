import React, { useState } from 'react';
import { useTableSearch } from "../../hooks/useTableSearch";
import { Container, Row, Col, CardColumns } from 'react-bootstrap';
import SpeciesCard from '../Cards/SpeciesCard';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import PaginationMain from '../../components/Pagination/Pagination';

function SpeciesDeck(props)  { 
	const offset = 3;
	const [startingCard, setStart] = React.useState(0)
	const [maxCardsShown, setCardsShown] = React.useState(10)

	function giveData(){
		return props.species
	};
	const { Search } = Input;
	const [searchVal, setSearchVal] = React.useState("");
	const { filteredData, loading } = useTableSearch({
		searchVal,
		retrieve: giveData,
	});

	const speciesCards = [];
	for (let i = startingCard; i < Math.min(startingCard + maxCardsShown, filteredData.length); i++) {
		speciesCards.push(<Col className="container-fluid mt-4">
			<a style={{ cursor: 'pointer' }} onClick={() => props.update(filteredData[i])}>
			<SpeciesCard 
				animal={filteredData[i]} 
				photo={filteredData[i].image_link}
				searchVal={searchVal}
			></SpeciesCard></a></Col>);
	}
	return(
		<Container fluid className="justify-content-md-center">
				<Row>
					<h1>{filteredData.length} Species. {maxCardsShown} per page</h1>
				</Row>
				<Row>
					<Search
						onChange={(e) => setSearchVal(e.target.value)}
						placeholder="Search"
						enterButton
						style={{
							position: "sticky",
							top: "0",
							left: "0",
							width: "200px",
							marginTop: "2vh"
						}}
					/>
				</Row>
				<Row xs={1} sm={2} md={3} lg={4} xl={5}>
					{speciesCards}
				</Row>
				<PaginationMain 
					instancesPerPage= {maxCardsShown}
					totalInstances= {filteredData.length}
					startingInstance= {startingCard}
					offsetPagesShownFromCurrent= {offset}
					setStartingInstance= {setStart}
					setInstancesPerPage= {setCardsShown}
				></PaginationMain>
			</Container>
	)

}

export default SpeciesDeck;