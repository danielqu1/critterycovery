import React, { useState } from 'react';
import { useTableSearch } from '../../hooks/useTableSearch';
import { Container, Row, Col, CardColumns } from 'react-bootstrap';
import SpeciesCard from '../Cards/SpeciesCard';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Input, Select,  } from 'antd';
import 'antd/dist/antd.css';
import PaginationMain from '../../components/Pagination/Pagination';

function SpeciesDeck(props)  { 
	const offset = 3;
	const [startingCard, setStart] = React.useState(0)
	const [maxCardsShown, setCardsShown] = React.useState(10)
	const [sortState, setSortState] = useState('Name(Asc)')
	const [sortedData, setSortedData] = useState(props.species)

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
			sort()
        };
    }, [filteredData])
    

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
			case 'Class(Asc)':
				setSortedData(filteredData.sort((a, b) => (a._class.localeCompare(b._class))))
				break;
			case 'Class(Desc)':
				setSortedData(filteredData.sort((a, b) => (b._class.localeCompare(a._class))))
				break;
			case 'Order(Asc)':
				setSortedData(filteredData.sort((a, b) => (a._order.localeCompare(b._order))))
				break;
			case 'Order(Desc)':
				setSortedData(filteredData.sort((a, b) => (b._order.localeCompare(a._order))))
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
				<Select defaultValue={sortState} style={{ width: '20%' }} onChange={sort}>
					<Option value='Name(Asc)'>Name(<ArrowUpOutlined />)</Option>
					<Option value='Name(Desc)'>Name(<ArrowDownOutlined />)</Option>
					<Option value='Class(Asc)'>Class(<ArrowUpOutlined />)</Option>
					<Option value='Class(Desc)'>Class(<ArrowDownOutlined />)</Option>
					<Option value='Order(Asc)'>Order(<ArrowUpOutlined />)</Option>
					<Option value='Order(Desc)'>Order(<ArrowDownOutlined />)</Option>
					<Option value='Family(Asc)'>Family(<ArrowUpOutlined />)</Option>
					<Option value='Family(Desc)'>Family(<ArrowDownOutlined />)</Option>

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