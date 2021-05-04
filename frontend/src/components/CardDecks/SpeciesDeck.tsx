/* 	Species deck handles most of the functionality on the species page
	It creates a deck of species cards that narrow down based on
	pagination, search, and filtering (all of which are integrated here).
	Order of the deck is also based on the sorting value which is handled here
*/
import { useState, useEffect } from 'react';

import { Input, Select,  } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import PaginationMain from '../Pagination/Pagination';
import { useTableSearch } from '../../hooks/useTableSearch';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import ModelCard from '../Cards/ModelCard';
import speciesProperties from '../Cards/Properties/Species';
import speciesInterface from '../../interfaces/species';

const { Option } = Select;
const { Search } = Input


function SpeciesDeck(props: any)  { 
	// Pagination variables
	const offset = 3;
	const [startingCard, setStart] = useState(0)
	const [maxCardsShown, setCardsShown] = useState(10)

	// Sorting value (string) controls how the cards are reordered
	const [sortState, setSortState] = useState('Name(Asc)') 
	// Search value (string initialized by query) restricts which cards are shown
	const [searchVal, setSearchVal] = useState(props.query) 
	// Filter values (contains current string for each filter)
	const [nameFilter, setNameFilter] = useState('')
	const [classFilter, setClassFilter] = useState('')
	const [orderFilter, setOrderFilter] = useState('')
	const [familyFilter, setFamilyFilter] = useState('')

	// Arrays created for processing data into its final form so that a deck can be made
	const [sortedData, setSortedData] = useState(props.species)
	const [finalData, setFinalData] = useState(props.species)

	// React Hook that searches the data and returns an array of matching items
	// Search is inclusive of every attribute of each data item and supports multiple terms (additive)
	const { filteredData, } = useTableSearch({
		searchVal: searchVal,
		data: props.species,
	});

	// The effects update the arrays/cards upon any change to data in brackets. 
	// eslint-disable-next-line
	useEffect(()=>sort(), [filteredData, sortState])
	// eslint-disable-next-line
	useEffect(()=>filter(), [sortedData, nameFilter, classFilter, orderFilter, familyFilter])


	// Actual creation of the cards
	const speciesCards = [];
	for (let i = startingCard; i < Math.min(startingCard + maxCardsShown, finalData.length); i++) {
		// Notice the large number of params. ModelCard is a generic so that it 
		// can be reused for the other models on the search page
		speciesCards.push(<Col className='container-fluid mt-4'>
			<ModelCard 
				image={finalData[i].image_link}
				image_alt={"Picture of "+finalData[i].scientific_name}
				title={finalData[i].common_name ? finalData[i].common_name : finalData[i].scientific_name}
				searchVal={searchVal?searchVal:''}
				onClick={() => props.update(finalData[i])}
				cardProperties={speciesProperties(finalData[i])}
				imageRatio='100%'
			/></Col>);
	}

	// Creates a temporary array from filteredData which contains the species that match the search terms,
	// sorts the new array using the current sortState, and updates the sortedData array with the sorted tempArray.
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
		  }
	}

	// Filters the sortedData using each of the filter variables. Non matching data is removed and the remaining data goes into the finalData array
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