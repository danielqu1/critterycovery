import { useState } from 'react';
import { Image } from 'antd'
import { Table, Input, Button, Space, Select, Row, Col } from 'antd'
import Highlighter from 'react-highlight-words';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { useTableSearch } from "../../hooks/useTableSearch";

import loadGIF from '../../images/loading.gif'

const { Option } = Select;

function HabitatTable(props) {
	const [searchedInput, setSearchedInput] = useState(null);
	const [searchedInput2, setSearchedInput2] = useState(null);
	const { filteredData, loading } = useTableSearch({
		searchVal: props.searchVal,
		data: props.habitats,
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
			title: 'Image',
			dataIndex: 'image_link',
			key: 'image',
			render: (image) => <Image 
					width='100%'
					height='100%'
					style={{objectFit:'cover'}}
					alt={"Picture of a habitat"}
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
					fallback="data:image/png;base64,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"
				/>,
			width: '20%'
		}, {
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name),
			...getColumnProps('name'),
			...getFilterProps('name'),
		}, {
			title: 'Designation',
			dataIndex: 'designation_name',
			key: 'designation_name',
			sorter: (a, b) => a.designation_name.localeCompare(b.designation_name),
			...getColumnProps('designation_name'),
			...getFilterProps('designation_name'),
		}, {
			title: 'Land Area (km^2)',
			dataIndex: 'reported_terrestrial_area',
			key: 'reported_terrestrial_area',
			sorter: (a, b) => a.reported_terrestrial_area - b.reported_terrestrial_area,
			...getColumnProps('reported_terrestrial_area'),
			...getNumberFilterProps('reported_terrestrial_area'),
		}, {
			title: 'Water Area (km^2)',
			dataIndex: 'reported_marine_area',
			key: 'reported_marine_area',
			sorter: (a, b) => a.reported_marine_area - b.reported_marine_area,
			...getColumnProps('reported_marine_area'),
			...getNumberFilterProps('reported_marine_area'),
		}, {
			title: 'IUCN Category',
			dataIndex: 'iucn_category',
			key: 'iucn_category',
			sorter: (a, b) => a.iucn_category - b.iucn_category,
			...getColumnProps('iucn_category'),
			...getNumberFilterProps('iucn_category'),
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
					pagination={{ 	showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} habitats`,
									pageSizeOptions: [10, 20, 50],
								}}
					rowKey='name'
				/>
			</>			
	);

}

export default HabitatTable;