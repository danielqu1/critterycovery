/* 	Generic card for the models shown on both the search and species pages
	Card displays a relevant image at the top followed by an array of properties
	the properties are created from an array of data-description pairs
	if the data is null, it is not displayed.

	Highlighting is also enabled to match any searchVal in the title or properties
*/
import { Card, Image, Typography, } from 'antd';
import Highlighter from 'react-highlight-words';

import loadGIF from '../../images/loading.gif'
import defaultImage from '../../data/DefaultImage'

const { Text, Title } = Typography;

interface cardProps{
	cardProperties: any;
	searchVal: string;
	onClick: () => any;
	image: string;
	image_alt: string;
	title: string;
	imageRatio: string;
}

function SpeciesCard(props: cardProps) {
	let searchArray = props.searchVal.split(' ')

	// Generates an array of elements from the properties so that they can be displayed and highlighted
	let finishedProperties:Array<any> = []
	props.cardProperties.forEach((property:any) => {
		if(property.highlightData){
			finishedProperties.push(
				<>
					<Text> {property.text}
						<Highlighter
							highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
							searchWords={searchArray}
							autoEscape
							textToHighlight={property.highlightData.toString()}
						/>
					</Text><br/>
				</>
			)
		}
	})

	return(
		<Card 
			hoverable 
			onClick={props.onClick}
			style={{height: 'auto', padding: 0}}
			cover={
				<div style={{position: 'relative', width: '100%', height: '100%', paddingTop: props.imageRatio, }}>
					<div style={{position: 'absolute', top: 0, left: 0, bottom:0, right:0}}>
						<Image 
							width='100%'
							height='100%'
							style={{objectFit:'cover'}}
							alt={props.image_alt}
							src={props.image}
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
							preview={false}
							fallback={defaultImage()}
						/>
					</div>
				</div>
				
			}>
			<Title level={5} style={{padding: 0,}}>
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={searchArray}
					autoEscape
					textToHighlight={props.title}
				/>
			</Title>
			{finishedProperties}
		</Card>
	);
}

export default SpeciesCard;
