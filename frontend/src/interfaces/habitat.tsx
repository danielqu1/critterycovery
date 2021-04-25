interface habitat {
	id: number;
	name: string;
	marine: boolean;
	reported_marine_area: number;
	reported_terrestrial_area: number;
	countries: string;
	iucn_category: number;
	designation_name: string;
	designation_id: number;
	link: string;
	image_link: string;
	embedded_map_link: string;
}

export default habitat;