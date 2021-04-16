import React, { useState, useEffect } from 'react';
import { useTableSearch } from '../../hooks/useTableSearch';
import { Container, Row, Col, CardColumns } from 'react-bootstrap';
import SpeciesCard from '../Cards/SpeciesCard';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Input, Select,  } from 'antd';
import 'antd/dist/antd.css';
import PaginationMain from '../../components/Pagination/Pagination';
const { Search } = Input;
const { Option } = Select;

function SpeciesDeck(props)  { 
	const offset = 3;
	const [startingCard, setStart] = useState(0)
	const [maxCardsShown, setCardsShown] = useState(10)
	const [sortState, setSortState] = useState('Name(Asc)')
	const [sortedData, setSortedData] = useState(props.species)
	const [searchVal, setSearchVal] = useState('')

	const [nameFilter, setNameFilter] = useState('')
	const [classFilter, setClassFilter] = useState('')
	const [orderFilter, setOrderFilter] = useState('')
	const [familyFilter, setFamilyFilter] = useState('')

	const [finalData, setFinalData] = useState(props.species)
	const { filteredData, loading } = useTableSearch({
		searchVal,
		data: props.species,
	});
	

	useEffect(() => {
		setSortedData(filteredData, sort)
    }, [filteredData])
	useEffect(() => {
		filter()
    }, [nameFilter, classFilter, orderFilter, familyFilter])

	const speciesCards = [];
	for (let i = startingCard; i < Math.min(startingCard + maxCardsShown, finalData.length); i++) {
		speciesCards.push(<Col className='container-fluid mt-4'>
			<a style={{ cursor: 'pointer' }} onClick={() => props.update(finalData[i])}>
			<SpeciesCard 
				animal={finalData[i]} 
				photo={finalData[i].image_link}
				searchVal={searchVal}
			></SpeciesCard></a></Col>);
	}

	function sort(value=sortState){
		if(value!=sortState){
			setSortState(value)
		}
		switch(value) {
			case 'Name(Asc)':
				setSortedData(sortedData.sort((a, b) => (((a.common_name ? a.common_name : a.scientific_name).localeCompare(b.common_name ? b.common_name : b.scientific_name)))))
				break;
			case 'Name(Desc)':
				setSortedData(sortedData.sort((a, b) => (((b.common_name ? b.common_name : b.scientific_name).localeCompare(a.common_name ? a.common_name : a.scientific_name)))))
				break;
			case 'Class(Asc)':
				setSortedData(sortedData.sort((a, b) => (a._class.localeCompare(b._class))))
				break;
			case 'Class(Desc)':
				setSortedData(sortedData.sort((a, b) => (b._class.localeCompare(a._class))))
				break;
			case 'Order(Asc)':
				setSortedData(sortedData.sort((a, b) => (a._order.localeCompare(b._order))))
				break;
			case 'Order(Desc)':
				setSortedData(sortedData.sort((a, b) => (b._order.localeCompare(a._order))))
				break;
			case 'Family(Asc)':
				setSortedData(sortedData.sort((a, b) => (a.family.localeCompare(b.family))))
				break;
			case 'Family(Desc)':
				setSortedData(sortedData.sort((a, b) => (b.family.localeCompare(a.family))))
				break;
			default:
			  // code block
		  }
		  filter()
	}

	function filter(){
		const filters = [{attribute:'_class', value: classFilter.toLowerCase()}, {attribute:'_order', value: orderFilter.toLowerCase()}, {attribute:'family', value: familyFilter.toLowerCase()}]
		const nameFilteredData = sortedData.filter(data => (data.common_name ? data.common_name : data.scientific_name).toLowerCase().includes((nameFilter ? nameFilter : '').toLowerCase()))
		setFinalData(nameFilteredData.filter(data => filters.every(filter => (data[filter.attribute] ? data[filter.attribute].toLowerCase() : '').includes(filter.value ? filter.value : ''))))
	}
	return(
		<Container fluid className='justify-content-md-center'>
				<Row>
					<h1>{finalData.length} Species. {maxCardsShown} per page {nameFilter}</h1>
				</Row>
				<Row>
					<Search
						onChange={(e) => setSearchVal(e.target.value)}
						placeholder='Search'
						style={{
							position: 'sticky',
							width: '100%',
							padding: '0 5%'
						}}
					/>
				</Row>
				<Row>
					<Col>
						Name Filter:<br/>
						<Input
						onChange={(e) => setNameFilter(e.target.value)}
						placeholder='enter name'/>
					</Col>
					<Col>
						Class Filter:<br/>
						<Input
						onChange={(e) => setClassFilter(e.target.value)}
						placeholder='enter class'/>
					</Col>
					<Col>
						Order Filter:<br/>
						<Input
						onChange={(e) => setOrderFilter(e.target.value)}
						placeholder='enter order'/>
					</Col>
					<Col>
						Family Filter:<br/>
						<Input
						onChange={(e) => setFamilyFilter(e.target.value)}
						placeholder='enter family'/>
					</Col>
					<Col>
						Sort:<br/>
						<Select defaultValue={sortState} style={{ width: '100%' }} onChange={sort}>
							<Option value='Name(Asc)'>Name(<ArrowUpOutlined />)</Option>
							<Option value='Name(Desc)'>Name(<ArrowDownOutlined />)</Option>
							<Option value='Class(Asc)'>Class(<ArrowUpOutlined />)</Option>
							<Option value='Class(Desc)'>Class(<ArrowDownOutlined />)</Option>
							<Option value='Order(Asc)'>Order(<ArrowUpOutlined />)</Option>
							<Option value='Order(Desc)'>Order(<ArrowDownOutlined />)</Option>
							<Option value='Family(Asc)'>Family(<ArrowUpOutlined />)</Option>
							<Option value='Family(Desc)'>Family(<ArrowDownOutlined />)</Option>

						</Select>
					</Col>
				
				</Row>
				<Row xs={1} sm={2} md={3} lg={4} xl={5}>
					{speciesCards}
				</Row>
				<PaginationMain 
					instancesPerPage= {maxCardsShown}
					totalInstances= {finalData.length}
					startingInstance= {startingCard}
					offsetPagesShownFromCurrent= {offset}
					setStartingInstance= {setStart}
					setInstancesPerPage= {setCardsShown}
				></PaginationMain>
			</Container>
	)

}

export default SpeciesDeck;