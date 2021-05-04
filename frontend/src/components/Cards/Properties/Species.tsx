// Attributes for Species
import species from '../../../interfaces/species'
interface properties{
	text: string;
	highlightData: string | null;
}

function cardProperties(data:species){
	const cardProperties:Array<properties> = [
		{
			text: 'Kingdom: ',
			highlightData: data.kingdom ? data.kingdom.toLocaleLowerCase() : null,
		},
		{
			text: 'Phylum: ',
			highlightData: data.phylum ? data.phylum.toLocaleLowerCase() : null,
		},
		{
			text: 'Class: ',
			highlightData: data._class ? data._class.toLocaleLowerCase() : null,
		},
		{
			text: 'Order: ',
			highlightData: data._order ? data._order.toLocaleLowerCase() : null,
		},
		{
			text: 'Family: ',
			highlightData: data.family ? data.family.toLocaleLowerCase() : null,
		}
	]
	return cardProperties
}

export default cardProperties