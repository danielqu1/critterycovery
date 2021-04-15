import React from 'react';
import { Image, Container } from 'react-bootstrap'
import { Table, Input, Button, Space } from 'antd'
import 'antd/dist/antd.css'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useTableSearch } from "../../hooks/useTableSearch";

function HabitatTable(props) {
	const [searchText, setSearchText] = React.useState('');
	const [searchedColumn, setSearchedColumn] = React.useState('');
	const [searchedInput, setSearchedInput] = React.useState(null);
	
	let getColumnSearchProps = (dataIndex) => ({
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
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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
			searchVal ? (
			<Highlighter
				highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
				searchWords={searchVal.split(' ')}
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
			title: 'Land Area',
			dataIndex: 'reported_terrestrial_area',
			key: 'reported_terrestrial_area',
			sorter: (a, b) => a.reported_terrestrial_area - b.reported_terrestrial_area,
			...getColumnSearchProps('reported_terrestrial_area'),
		}, {
			title: 'Water Area',
			dataIndex: 'reported_marine_area',
			key: 'reported_marine_area',
			sorter: (a, b) => a.reported_marine_area - b.reported_marine_area,
			...getColumnSearchProps('reported_marine_area'),
		}, {
			title: 'IUCN Category',
			dataIndex: 'iucn_category',
			key: 'iucn_category',
			sorter: (a, b) => a.iucn_category - b.iucn_category,
			...getColumnSearchProps('iucn_category'),
		}
	];
	function giveData(){
		return props.habitats
	};
	
	const { Search } = Input;
	const [searchVal, setSearchVal] = React.useState("");
	const { filteredData, loading } = useTableSearch({
		searchVal,
		retrieve: giveData,
	});
	return (<>
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
				<Table 	
					dataSource={filteredData} 
					columns={columns} 
					loading={loading}
					onRow={(record, rowIndex) => {
						return {
						onClick: event => {props.update(record);}, // click row
						};
					}}
					rowKey='name'
				/>
			</>			
	);

}

export default HabitatTable;