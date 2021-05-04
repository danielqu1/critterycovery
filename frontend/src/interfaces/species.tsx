// The data that should be available from the api for each species
interface species{
	common_name: string;
	scientific_name: string;
	kingdom: string;
	phylum: string;
	_class: string;
	_order: string;
	family: string;
	genus: string;
	subspecies: string;
	subpopulations: string;
	population_trend: string;
	marine: boolean;
	freshwater: boolean;
	terrestrial: boolean;
	taxonomic_notes: string;
	rationale: string;
	geographic_range: string;
	population: number;
	text_habitat: string;
	threats: string;
	conservation_measures: string;
	image_link: string;
}

export default species;