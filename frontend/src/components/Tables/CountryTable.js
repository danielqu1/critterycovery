import { useState } from 'react';
import { Image, Table, Input, Button, Space, Select, Row, Col } from 'antd'
import Highlighter from 'react-highlight-words';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { useTableSearch } from "../../hooks/useTableSearch";

import loadGIF from '../../images/loading.gif'
import DefaultImage from '../../data/DefaultImage';

const { Option } = Select;

function CountryTable(props) {
	const [searchedInput, setSearchedInput] = useState(null);
	const [searchedInput2, setSearchedInput2] = useState(null);
	const { filteredData, loading } = useTableSearch({
		searchVal: props.searchVal,
		data: props.countries,
	});
	
	let getColumnProps = (dataIndex) => ({
		width: '15%',
		padding: '4% 0',
		margin: 0,
		fontSize: '2pt',
		textWrap: 'word-break',
		whiteSpace: 'no-wrap',
		filterIcon: (filtered) => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilterDropdownVisibleChange: (visible) => {
			if (visible && searchedInput) {
				setTimeout(() => searchedInput.select(), 100);
			}
		},
		render: (text) =>
			props.searchVal ? (
			<Highlighter style={{width: '100%'}}
				highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
				searchWords={props.searchVal.split(' ')}
				autoEscape
				textToHighlight={text ? text.toString() : ''}
			/>
			) : (
			text
			),
	});
	let getFilterProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
			<Input
				ref={node => {
				setSearchedInput(node);
				}}
				placeholder={`${dataIndex}`}
				value={selectedKeys[0]}
				onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
				onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
				style={{ width: 188, marginBottom: 8, display: 'block' }}
			/>
			<Space>
				<Button
					type="primary"
					onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
					icon={<SearchOutlined />}
					size="small"
					style={{ width: 90 }}>
					Filter
				</Button>
				<Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
				</Button>
				<Button
					type="link"
					size="small"
					onClick={() => {
						confirm({ closeDropdown: false });
					}}>
				</Button>
			</Space>
			</div>
		),
		onFilter: (value, record) =>
			record[dataIndex]
			? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
			: '',
	})
	let getNumberFilterProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
			<Row>
				<Col style={{width:'20%'}}>
					<Select defaultValue={'='} onChange={setSearchedInput2}>
						<Option value='>'>{'>'}</Option>
						<Option value='<'>{'<'}</Option>
						<Option value='='>{'='}</Option>
						<Option value='!'>{'!'}</Option>
					</Select>
				</Col>
				<Col flex>
					<Input
						ref={node => {setSearchedInput(node);}}
						placeholder={`${dataIndex}`}
						value={selectedKeys[0]}
						onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
						onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
						style={{ width: '100%', marginBottom: 8, display: 'block' }}
					/>
				</Col>
			</Row>
			
			
			<Space>
				<Button
					type="primary"
					onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
					icon={<SearchOutlined />}
					size="small"
					style={{ width: 90 }}
					>
					Filter
				</Button>
				<Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
				</Button>
				<Button
					type="link"
					size="small"
					onClick={() => {
						confirm({ closeDropdown: false });
					}}
					>
				</Button>
			</Space>
			</div>
		),
		onFilter: (value, record) => {
			switch(searchedInput2){
				case '>':
					return Number(record[dataIndex]) > Number(value)
				case '<':
					return Number(record[dataIndex]) < Number(value)
				case '!':
					return Number(record[dataIndex]) !== Number(value)
				default:
					return Number(record[dataIndex]) === Number(value)
			}
		},
	});

	function handleSearch(selectedKeys, confirm, dataIndex) {
		confirm();
	}

	function handleReset(clearFilters){
		clearFilters();
	}

	const columns = [
		{
			title: 'Flag',
			dataIndex: 'flag',
			key: 'flag',
			width: '25%',
			padding: 0,
			margin: 0,
			render: (image) => <Image 
					width='100%'
					height='100%'
					style={{objectFit:'cover'}}
					alt={"Flag of a country"}
					src={image}
					preview={false}
					placeholder={
						<Image
						preview={false}
						src={loadGIF}
						width='100%'
						height='100%'
						style={{objectFit:'cover'}}
						alt="loading gif"
						/>
					}
					fallback={DefaultImage()}
				/>,
		}, {
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name),
			...getColumnProps('name'),
			...getFilterProps('name'),
		}, {
			title: 'Population',
			dataIndex: 'total_pop',
			key: 'total_pop',
			sorter: (a, b) => a.total_pop - b.total_pop,
			...getColumnProps('total_pop'),
			...getNumberFilterProps('total_pop'),
		}, {
			title: 'Capital',
			dataIndex: 'capital',
			key: 'capital',
			defaultValue: 'information not available',
			sorter: (a, b) => a.capital.localeCompare(b.capital),
			...getColumnProps('capital'),
			...getFilterProps('capital'),
		}, {
			title: 'Region',
			dataIndex: 'region',
			key: 'region',
			sorter: (a, b) => a.region.localeCompare(b.region),
			...getColumnProps('region'),
			...getFilterProps('region'),
		}, {
			title: 'Land Area (km^2)',
			dataIndex: 'area',
			key: 'area',
			sorter: (a, b) => a.area - b.area,
			...getColumnProps('area'),
			...getNumberFilterProps('area'),
		}
	];

	return (<>
				<Table 	
					dataSource={filteredData} 
					columns={columns} 
					loading={loading}
					width='100%'
					sticky={{offsetHeader: '6.5%'}}
					onRow={(record, rowIndex) => {
						return {
						onClick: event => {props.update(record);}, // click row
						};
					}}
					pagination={{ 	showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} countries`,
									pageSizeOptions: [10, 20, 50],
								}}
					rowKey='name'
				/>
			</>			
	);

}

export default CountryTable;