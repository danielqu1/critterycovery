import { useState, useEffect, useCallback } from 'react';
import { useTableSearch } from '../../hooks/useTableSearch';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Input, Select,  } from 'antd';
import PaginationMain from '../Pagination/Pagination';

import SpeciesCard from '../Cards/ModelCard';
import speciesProperties from '../Cards/Properties/Species';
import speciesInterface from '../../interfaces/species';

const { Option } = Select;
const { Search } = Input


function SpeciesDeck(props: any)  { 
	const offset = 3;
	const [startingCard, setStart] = useState(0)
	const [maxCardsShown, setCardsShown] = useState(10)
	const [sortState, setSortState] = useState('Name(Asc)')

	const [searchVal, setSearchVal] = useState(props.query)

	const [nameFilter, setNameFilter] = useState('')
	const [classFilter, setClassFilter] = useState('')
	const [orderFilter, setOrderFilter] = useState('')
	const [familyFilter, setFamilyFilter] = useState('')
	const [sortedData, setSortedData] = useState(props.species)
	const [finalData, setFinalData] = useState(props.species)

	const { filteredData, } = useTableSearch({
		searchVal: searchVal,
		data: props.species,
	});

	useEffect(()=>sort(), [filteredData, sortState])
	useEffect(()=>filter(), [sortedData, nameFilter, classFilter, orderFilter, familyFilter])

	const speciesCards = [];
	for (let i = startingCard; i < Math.min(startingCard + maxCardsShown, finalData.length); i++) {
		speciesCards.push(<Col className='container-fluid mt-4'>
			<SpeciesCard 
				image={finalData[i].image_link}
				image_alt={"Picture of "+finalData[i].scientific_name}
				title={finalData[i].common_name ? finalData[i].common_name : finalData[i].scientific_name}
				searchVal={searchVal?searchVal:''}
				onClick={() => props.update(finalData[i])}
				cardProperties={speciesProperties(finalData[i])}
				imageRatio='100%'
			/></Col>);
	}

	function sort(){
		let tempArray = filteredData.slice()
		switch(sortState) {
			case 'Name(Asc)':
				setSortedData(tempArray.sort((a:speciesInterface, b:speciesInterface) => (((a.common_name ? a.common_name : a.scientific_name).localeCompare(b.common_name ? b.common_name : b.scientific_name)))))
				break;
			case 'Name(Desc)':
				setSortedData(tempArray.sort((a:speciesInterface, b:speciesInterface) => (((b.common_name ? b.common_name : b.scientific_name).localeCompare(a.common_name ? a.common_name : a.scientific_name)))))
				break;
			case 'Class(Asc)':
				setSortedData(tempArray.sort((a:speciesInterface, b:speciesInterface) => (a._class.localeCompare(b._class))))
				break;
			case 'Class(Desc)':
				setSortedData(tempArray.sort((a:speciesInterface, b:speciesInterface) => (b._class.localeCompare(a._class))))
				break;
			case 'Order(Asc)':
				setSortedData(tempArray.sort((a:speciesInterface, b:speciesInterface) => (a._order.localeCompare(b._order))))
				break;
			case 'Order(Desc)':
				setSortedData(tempArray.sort((a:speciesInterface, b:speciesInterface) => (b._order.localeCompare(a._order))))
				break;
			case 'Family(Asc)':
				setSortedData(tempArray.sort((a:speciesInterface, b:speciesInterface) => (a.family.localeCompare(b.family))))
				break;
			case 'Family(Desc)':
				setSortedData(tempArray.sort((a:speciesInterface, b:speciesInterface) => (b.family.localeCompare(a.family))))
				break;
			default:
			  // code block
		  }
	}

	function filter(sorted=sortedData){
		const filters = [{attribute:'_class', value: classFilter.toLowerCase()}, {attribute:'_order', value: orderFilter.toLowerCase()}, {attribute:'family', value: familyFilter.toLowerCase()}]
		const nameFilteredData = sorted.filter((data:any) => (data.common_name ? data.common_name : data.scientific_name).toLowerCase().includes((nameFilter ? nameFilter : '').toLowerCase()))
		setFinalData(nameFilteredData.filter((data:any) => filters.every(filter => (data[filter.attribute] ? data[filter.attribute].toLowerCase() : '').includes(filter.value ? filter.value : ''))))
	}
	return(
		<Container fluid className='justify-content-md-center'>
				<Row className='justify-content-md-center'>
					<Search
						onChange={(e) => setSearchVal(e.target.value)}
						defaultValue={props.query?props.query:''}
						placeholder="Search"
						style={{
							width: '50%',
							height: '100%',
							padding: '1% 0',
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
						<Select defaultValue={sortState} style={{ width: '100%' }} onChange={(e) => setSortState(e)}>
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