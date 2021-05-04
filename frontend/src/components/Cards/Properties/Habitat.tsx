// Attributes for Habitats
import habitat from '../../../interfaces/habitat'
interface properties{
	text: string;
	highlightData: string | null;
}

function cardProperties(data:habitat){
	const cardProperties:Array<properties> = [
		{
			text: 'Designation: ',
			highlightData: data.designation_name,
		},
		{
			text: 'Land Area (Km^2): ',
			highlightData: data.reported_terrestrial_area ? data.reported_terrestrial_area.toLocaleString(undefined) : null,
		},
		{
			text: 'Water Area (Km^2): ',
			highlightData: data.reported_marine_area ? data.reported_marine_area.toLocaleString(undefined) : null,
		},
		{
			text: 'IUCN Category: ',
			highlightData: data.iucn_category ? data.iucn_category.toLocaleString(undefined) : null,
		}
	]
	return cardProperties
}

export default cardProperties;