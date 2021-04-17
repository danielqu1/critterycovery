import React from 'react';
import { Image } from 'react-bootstrap'
import { Table, Input, Button, Space, Select, Row, Col } from 'antd'
import 'antd/dist/antd.css'
import Highlighter from 'react-highlight-words';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { useTableSearch } from "../../hooks/useTableSearch";

const { Option } = Select;

function HabitatTable(props) {
	const [searchText, setSearchText] = React.useState('');
	const [searchedColumn, setSearchedColumn] = React.useState('');
	const [searchedInput, setSearchedInput] = React.useState(null);
	const [searchedInput2, setSearchedInput2] = React.useState(null);
	const { filteredData, loading } = useTableSearch({
		searchVal: props.searchVal,
		data: props.habitats,
	});
	
	let getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
			<Input
				ref={node => {setSearchedInput(node);}}
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
					setSearchText(selectedKeys[0]);
					setSearchedColumn(dataIndex);
				}}
				>
				</Button>
			</Space>
			</div>
		),
		filterIcon: (filtered) => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) =>
			record[dataIndex]
			? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
			: '',
		onFilterDropdownVisibleChange: (visible) => {
			if (visible && searchedInput) {
				setTimeout(() => searchedInput.select(), 100);
			}
		},
		render: (text) =>
			props.searchVal ? (
			<Highlighter
				highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
				searchWords={props.searchVal.split(' ')}
				autoEscape
				textToHighlight={text ? text.toString() : ''}
			/>
			) : (
			text
			),
	});

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
						style={{ width: 188, marginBottom: 8, display: 'block' }}
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
						setSearchText(selectedKeys[0]);
						setSearchedColumn(dataIndex);
					}}
					>
				</Button>
			</Space>
			</div>
		),
		filterIcon: (filtered) => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) => {
			switch(searchedInput2){
				case '>':
					return Number(record[dataIndex]) > Number(value)
				case '<':
					return Number(record[dataIndex]) < Number(value)
				case '!':
					return Number(record[dataIndex]) != Number(value)
				default:
					return Number(record[dataIndex]) == Number(value)
			}
		},
		onFilterDropdownVisibleChange: (visible) => {
			if (visible && searchedInput) {
				setTimeout(() => searchedInput.select(), 100);
			}
		},
		render: (text) =>
			props.searchVal ? (
			<Highlighter
				highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
				searchWords={props.searchVal.split(' ')}
				autoEscape
				textToHighlight={text ? text.toString() : ''}
			/>
			) : (
			text
			),
	});

	function handleSearch(selectedKeys, confirm, dataIndex) {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	}

	function handleReset(clearFilters){
		clearFilters();
		setSearchText('');
	}

	const columns = [
		{
			title: 'Image',
			dataIndex: 'image_link',
			key: 'image',
			render: (image) => <Image src={image} rounded fluid style={{ width: '40%' }} />,
		}, {
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name),
			...getColumnSearchProps('name'),
		}, {
			title: 'Designation',
			dataIndex: 'designation_name',
			key: 'designation_name',
			sorter: (a, b) => a.designation_name.localeCompare(b.designation_name),
			...getColumnSearchProps('designation_name'),
		}, {
			title: 'Land Area (km^2)',
			dataIndex: 'reported_terrestrial_area',
			key: 'reported_terrestrial_area',
			sorter: (a, b) => a.reported_terrestrial_area - b.reported_terrestrial_area,
			...getNumberFilterProps('reported_terrestrial_area'),
		}, {
			title: 'Water Area (km^2)',
			dataIndex: 'reported_marine_area',
			key: 'reported_marine_area',
			sorter: (a, b) => a.reported_marine_area - b.reported_marine_area,
			...getNumberFilterProps('reported_marine_area'),
		}, {
			title: 'IUCN Category',
			dataIndex: 'iucn_category',
			key: 'iucn_category',
			sorter: (a, b) => a.iucn_category - b.iucn_category,
			...getNumberFilterProps('iucn_category'),
		}
	];
	
	return (<>
				<Table 	
					dataSource={filteredData} 
					columns={columns} 
					loading={loading}
					onRow={(record, rowIndex) => {
						return {
						onClick: event => {props.update(record);}, // click row
						};
					}}
					pagination={{ 	showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} habitats`,
									pageSizeOptions: [10, 20, 50],
								}}
					rowKey='name'
				/>
			</>			
	);

}

export default HabitatTable;