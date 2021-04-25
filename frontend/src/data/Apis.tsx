// get all image logos
import Redlist from "../images/api/RedlistLogo.png"
import ProtectPlanet from "../images/api/ProtectedPlanetLogo.png"
import RestCountries from "../images/api/RestCountriesLogo.png"
import GoogleMaps from "../images/api/GoogleMapsLogo.jpg"

type Tool = {
	name: string;
	text: string;
	img: string;
	link: string;
}

 // list of currently used tools
 function Apis() {
	let apis: Tool[] = [
		{
			name: "ICUN Redlist",
			text: "Species",
			img: Redlist,
			link: "http://apiv3.iucnredlist.org/api/v3/docs"
		},
		{
			name: "Protected Planet",
			text: "Habitats",
			img: ProtectPlanet,
			link: "https://api.protectedplanet.net/documentation"
		},
		{
			name: "Rest Countries",
			text: "Countries",
			img: RestCountries,
			link: "https://restcountries.eu"
		},
		{
			name: "Google Maps",
			text: "Embedded Maps",
			img: GoogleMaps,
			link: "https://developers.google.com/maps/documentation/embed/get-started"
		},
		
	];

	return (
		apis
	); 
}

export default Apis;