import React from 'react'; 

// pwd : critterycovery/frontend/src/pages/Countries.tsx

// need all four to build a table
import type {ColumnDefinitionType} from "../components/Table/ColumnDefinitionType";
import Table from "../components/Table/Table";

// what the data looks like; types of all key-value pair
interface Country {
  name: string;
  topLevelDomain: Array<string>;
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: Array<string>;
  capital: string;
  altSpellings: Array<string>;
  region: string;
  subregion: string;
  population: number;
  latlng: Array<number>;
  demonym: string;
  area: number;
  gini: number;
  timezones: Array<string>;
  borders: Array<string>;
  nativeName: string;
  numericCode: string;
  currencies: Array<object>;
  languages: Array<object>;
  translations: object;
  flag: string;
  regionalBlocs: Array<object>;
  cioc: string;
}

// actual data 
const data: Country[] = [
  {
	"name": "Argentina",
    "topLevelDomain": [
        ".ar"
    ],
    "alpha2Code": "AR",
    "alpha3Code": "ARG",
    "callingCodes": [
        "54"
    ],
    "capital": "Buenos Aires",
    "altSpellings": [
        "AR",
        "Argentine Republic",
        "República Argentina"
    ],
    "region": "Americas",
    "subregion": "South America",
    "population": 43590400,
    "latlng": [
        -34,
        -64
    ],
    "demonym": "Argentinean",
    "area": 2780400,
    "gini": 44.5,
    "timezones": [
        "UTC-03:00"
    ],
    "borders": [
        "BOL",
        "BRA",
        "CHL",
        "PRY",
        "URY"
    ],
    "nativeName": "Argentina",
    "numericCode": "032",
    "currencies": [
        {
            "code": "ARS",
            "name": "Argentine peso",
            "symbol": "$"
        }
    ],
    "languages": [
        {
            "iso639_1": "es",
            "iso639_2": "spa",
            "name": "Spanish",
            "nativeName": "Español"
        },
        {
            "iso639_1": "gn",
            "iso639_2": "grn",
            "name": "Guaraní",
            "nativeName": "Avañe'ẽ"
        }
    ],
    "translations": {
        "de": "Argentinien",
        "es": "Argentina",
        "fr": "Argentine",
        "ja": "アルゼンチン",
        "it": "Argentina",
        "br": "Argentina",
        "pt": "Argentina",
        "nl": "Argentinië",
        "hr": "Argentina",
        "fa": "آرژانتین"
    },
    "flag": "https://restcountries.eu/data/arg.svg",
    "regionalBlocs": [
        {
            "acronym": "USAN",
            "name": "Union of South American Nations",
            "otherAcronyms": [
                "UNASUR",
                "UNASUL",
                "UZAN"
            ],
            "otherNames": [
                "Unión de Naciones Suramericanas",
                "União de Nações Sul-Americanas",
                "Unie van Zuid-Amerikaanse Naties",
                "South American Union"
            ]
        }
    ],
    "cioc": "ARG"
  },
  {
    "name": "Australia",
    "topLevelDomain": [
        ".au"
    ],
    "alpha2Code": "AU",
    "alpha3Code": "AUS",
    "callingCodes": [
        "61"
    ],
    "capital": "Canberra",
    "altSpellings": [
        "AU"
    ],
    "region": "Oceania",
    "subregion": "Australia and New Zealand",
    "population": 24117360,
    "latlng": [
        -27,
        133
    ],
    "demonym": "Australian",
    "area": 7692024,
    "gini": 30.5,
    "timezones": [
        "UTC+05:00",
        "UTC+06:30",
        "UTC+07:00",
        "UTC+08:00",
        "UTC+09:30",
        "UTC+10:00",
        "UTC+10:30",
        "UTC+11:30"
    ],
    "borders": [],
    "nativeName": "Australia",
    "numericCode": "036",
    "currencies": [
        {
            "code": "AUD",
            "name": "Australian dollar",
            "symbol": "$"
        }
    ],
    "languages": [
        {
            "iso639_1": "en",
            "iso639_2": "eng",
            "name": "English",
            "nativeName": "English"
        }
    ],
    "translations": {
        "de": "Australien",
        "es": "Australia",
        "fr": "Australie",
        "ja": "オーストラリア",
        "it": "Australia",
        "br": "Austrália",
        "pt": "Austrália",
        "nl": "Australië",
        "hr": "Australija",
        "fa": "استرالیا"
    },
    "flag": "https://restcountries.eu/data/aus.svg",
    "regionalBlocs": [],
    "cioc": "AUS"
  },
  {
    "name": "Germany",
    "topLevelDomain": [
        ".de"
    ],
    "alpha2Code": "DE",
    "alpha3Code": "DEU",
    "callingCodes": [
        "49"
    ],
    "capital": "Berlin",
    "altSpellings": [
        "DE",
        "Federal Republic of Germany",
        "Bundesrepublik Deutschland"
    ],
    "region": "Europe",
    "subregion": "Western Europe",
    "population": 81770900,
    "latlng": [
        51,
        9
    ],
    "demonym": "German",
    "area": 357114,
    "gini": 28.3,
    "timezones": [
        "UTC+01:00"
    ],
    "borders": [
        "AUT",
        "BEL",
        "CZE",
        "DNK",
        "FRA",
        "LUX",
        "NLD",
        "POL",
        "CHE"
    ],
    "nativeName": "Deutschland",
    "numericCode": "276",
    "currencies": [
        {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        }
    ],
    "languages": [
        {
            "iso639_1": "de",
            "iso639_2": "deu",
            "name": "German",
            "nativeName": "Deutsch"
        }
    ],
    "translations": {
        "de": "Deutschland",
        "es": "Alemania",
        "fr": "Allemagne",
        "ja": "ドイツ",
        "it": "Germania",
        "br": "Alemanha",
        "pt": "Alemanha",
        "nl": "Duitsland",
        "hr": "Njemačka",
        "fa": "آلمان"
    },
    "flag": "https://restcountries.eu/data/deu.svg",
    "regionalBlocs": [
        {
            "acronym": "EU",
            "name": "European Union",
            "otherAcronyms": [],
            "otherNames": []
        }
    ],
    "cioc": "GER"
  },
  {
    "name": "Luxembourg",
    "topLevelDomain": [
        ".lu"
    ],
    "alpha2Code": "LU",
    "alpha3Code": "LUX",
    "callingCodes": [
        "352"
    ],
    "capital": "Luxembourg",
    "altSpellings": [
        "LU",
        "Grand Duchy of Luxembourg",
        "Grand-Duché de Luxembourg",
        "Großherzogtum Luxemburg",
        "Groussherzogtum Lëtzebuerg"
    ],
    "region": "Europe",
    "subregion": "Western Europe",
    "population": 576200,
    "latlng": [
        49.75,
        6.16666666
    ],
    "demonym": "Luxembourger",
    "area": 2586,
    "gini": 30.8,
    "timezones": [
        "UTC+01:00"
    ],
    "borders": [
        "BEL",
        "FRA",
        "DEU"
    ],
    "nativeName": "Luxembourg",
    "numericCode": "442",
    "currencies": [
        {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        }
    ],
    "languages": [
        {
            "iso639_1": "fr",
            "iso639_2": "fra",
            "name": "French",
            "nativeName": "français"
        },
        {
            "iso639_1": "de",
            "iso639_2": "deu",
            "name": "German",
            "nativeName": "Deutsch"
        },
        {
            "iso639_1": "lb",
            "iso639_2": "ltz",
            "name": "Luxembourgish",
            "nativeName": "Lëtzebuergesch"
        }
    ],
    "translations": {
        "de": "Luxemburg",
        "es": "Luxemburgo",
        "fr": "Luxembourg",
        "ja": "ルクセンブルク",
        "it": "Lussemburgo",
        "br": "Luxemburgo",
        "pt": "Luxemburgo",
        "nl": "Luxemburg",
        "hr": "Luksemburg",
        "fa": "لوکزامبورگ"
    },
    "flag": "https://restcountries.eu/data/lux.svg",
    "regionalBlocs": [
        {
            "acronym": "EU",
            "name": "European Union",
            "otherAcronyms": [],
            "otherNames": []
        }
    ],
    "cioc": "LUX"
  },
  {
    "name": "United States of America",
    "topLevelDomain": [
        ".us"
    ],
    "alpha2Code": "US",
    "alpha3Code": "USA",
    "callingCodes": [
        "1"
    ],
    "capital": "Washington, D.C.",
    "altSpellings": [
        "US",
        "USA",
        "United States of America"
    ],
    "region": "Americas",
    "subregion": "Northern America",
    "population": 323947000,
    "latlng": [
        38,
        -97
    ],
    "demonym": "American",
    "area": 9629091,
    "gini": 48,
    "timezones": [
        "UTC-12:00",
        "UTC-11:00",
        "UTC-10:00",
        "UTC-09:00",
        "UTC-08:00",
        "UTC-07:00",
        "UTC-06:00",
        "UTC-05:00",
        "UTC-04:00",
        "UTC+10:00",
        "UTC+12:00"
    ],
    "borders": [
        "CAN",
        "MEX"
    ],
    "nativeName": "United States",
    "numericCode": "840",
    "currencies": [
        {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        }
    ],
    "languages": [
        {
            "iso639_1": "en",
            "iso639_2": "eng",
            "name": "English",
            "nativeName": "English"
        }
    ],
    "translations": {
        "de": "Vereinigte Staaten von Amerika",
        "es": "Estados Unidos",
        "fr": "États-Unis",
        "ja": "アメリカ合衆国",
        "it": "Stati Uniti D'America",
        "br": "Estados Unidos",
        "pt": "Estados Unidos",
        "nl": "Verenigde Staten",
        "hr": "Sjedinjene Američke Države",
        "fa": "ایالات متحده آمریکا"
    },
    "flag": "https://restcountries.eu/data/usa.svg",
    "regionalBlocs": [
        {
            "acronym": "NAFTA",
            "name": "North American Free Trade Agreement",
            "otherAcronyms": [],
            "otherNames": [
                "Tratado de Libre Comercio de América del Norte",
                "Accord de Libre-échange Nord-Américain"
            ]
        }
    ],
    "cioc": "USA"
  },
]

// what columns go into the Table
// key = key in <key : value> in data ^
// header = what you see at the top of the column in the table
const columns: ColumnDefinitionType<Country, keyof Country>[] = [
  {
    key: 'name',
    header: 'Name',
    width: 150
  },
  {
  	  key: 'capital',
	  header: 'Capital'
  },
  {
  	  key: 'region',
	  header: 'Location'
  },
  {
  	  key: 'population',
	  header: 'Population'
  }
]

const Countries = () => { 
  return ( 
    <div 
      style={{ 
		display: 'flex', 
        justifyContent: 'Right', 
        alignItems: 'Right', 
        height: '100vh',
      }} 
    > 
      <h1>Countries Model Pages</h1>

	  <div>
		<h2>Summary of Country Statistics</h2>
	  
		<Table data={data} columns={columns} />
	  </div>

    </div> 
  ); 
}; 
  
export default Countries;