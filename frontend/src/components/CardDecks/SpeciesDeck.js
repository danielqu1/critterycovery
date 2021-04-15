import React, { useState } from 'react';
import { useTableSearch } from '../../hooks/useTableSearch';
import { Container, Row, Col, CardColumns } from 'react-bootstrap';
import SpeciesCard from '../Cards/SpeciesCard';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import 'antd/dist/antd.css';
import PaginationMain from '../../components/Pagination/Pagination';

function SpeciesDeck(props)  { 
	const offset = 3;
	const [startingCard, setStart] = React.useState(0)
	const [maxCardsShown, setCardsShown] = React.useState(10)
	const [sortState, setSortState] = useState('Name(Asc)')
	const [sortedData, setSortedData] = useState(new Array())

	function giveData(){
		return props.species
	};
	const { Search } = Input;
	const { Option } = Select;
	const [searchVal, setSearchVal] = React.useState('');
	const { filteredData, loading } = useTableSearch({
		searchVal,
		retrieve: giveData,
	});

	React.useEffect(() => {
        return () => {
			sort(sortState)
        };
    }, [filteredData, sortState])

	const speciesCards = [];
	for (let i = startingCard; i < Math.min(startingCard + maxCardsShown, sortedData.length); i++) {
		speciesCards.push(<Col className='container-fluid mt-4'>
			<a style={{ cursor: 'pointer' }} onClick={() => props.update(sortedData[i])}>
			<SpeciesCard 
				animal={sortedData[i]} 
				photo={sortedData[i].image_link}
				searchVal={searchVal}
			></SpeciesCard></a></Col>);
	}

	function sort(value){
		switch(value) {
			case 'Name(Asc)':
				setSortedData(filteredData.sort((a, b) => (((a.common_name ? a.common_name : a.scientific_name).localeCompare(b.common_name ? b.common_name : b.scientific_name)))))
				break;
			case 'Name(Desc)':
				setSortedData(filteredData.sort((a, b) => (((b.common_name ? b.common_name : b.scientific_name).localeCompare(a.common_name ? a.common_name : a.scientific_name)))))
				break;
			case 'Family(Asc)':
				setSortedData(filteredData.sort((a, b) => (a.family.localeCompare(b.family))))
				break;
			case 'Family(Desc)':
				setSortedData(filteredData.sort((a, b) => (b.family.localeCompare(a.family))))
				break;
			default:
			  // code block
		  } 
		
	}
	return(
		<Container fluid className='justify-content-md-center'>
				<Row>
					<h1>{sortedData.length} Species. {maxCardsShown} per page</h1>
				</Row>
				<Row>
					<Search
						onChange={(e) => setSearchVal(e.target.value)}
						placeholder='Search'
						enterButton
						style={{
							position: 'sticky',
							top: '0',
							left: '0',
							width: '200px',
							marginTop: '2vh'
						}}
					/>
				</Row>
				<Row>
				<Select defaultValue={sortState} style={{ width: '20%' }} onChange={setSortState}>
					<Option value='Name(Asc)'>Name(asc)</Option>
					<Option value='Name(Desc)'>Name(Desc)</Option>
					<Option value='Family(Asc)'>Family(Asc)</Option>
					<Option value='Family(Desc)'>Family(Desc)</Option>
				</Select>
				</Row>
				<Row xs={1} sm={2} md={3} lg={4} xl={5}>
					{speciesCards}
				</Row>
				<PaginationMain 
					instancesPerPage= {maxCardsShown}
					totalInstances= {sortedData.length}
					startingInstance= {startingCard}
					offsetPagesShownFromCurrent= {offset}
					setStartingInstance= {setStart}
					setInstancesPerPage= {setCardsShown}
				></PaginationMain>
			</Container>
	)

}

export default SpeciesDeck;