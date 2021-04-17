import unittest
import requests

DEV = False

URL = "https://critterycovery.me"
if DEV:
    URL = "http://0.0.0.0"


class TestBackend(unittest.TestCase):

    # def test_get_one_country00(self):
    # 	r = requests.get('https://critterycovery.me/api/countries?name=Spain')

    # 1
    def test_get_all_countries(self):
        r = requests.get(
            URL + "/api/countries"
        ).json()  # this is weird but it works lol
        self.assertEqual(len(r["countries"]), 250)

    # 2
    def test_get_all_habitats(self):
        r = requests.get(URL + "/api/habitats").json()
        self.assertEqual(len(r["habitats"]), 457)

    # 3
    def test_get_all_species(self):
        r = requests.get(URL + "/api/species").json()
        self.assertEqual(len(r["species"]), 498)

    # 4
    def test_get_one_country(self):
        r = requests.get(URL + "/api/countries/name=Afghanistan").json()
        self.assertEqual(r["country"]["alpha2_code"], "AF")
        self.assertEqual(r["country"]["region"], "Asia")

    # 5
    def test_get_one_habitat(self):
        r = requests.get(URL + "/api/habitats/name=Sommerrain").json()
        self.assertEqual(r["habitat"]["id"], 165595)
        self.assertEqual(r["habitat"]["countries"], "DEU")

    # 6
    def test_get_one_species(self):
        r = requests.get(URL + "/api/species/name=Spondylurus culebrae").json()
        self.assertEqual(r["species"]["common_name"], "Culebra Skink")
        self.assertEqual(r["species"]["phylum"], "CHORDATA")

    # 7
    def country_by_aplha2(self):
        r = requests.get(URL + "/api/countries/alpha2_code=BZ").json()
        self.assertEqual(r["country"]["region"], "Americas")
        self.assertEqual(r["country"]["total_pop"], 370300)

    # 8
    def country_by_aplha3(self):
        r = requests.get(URL + "/api/countries/alpha3_code=KHM").json()
        self.assertEqual(r["country"]["alpha2_code"], "KH")
        self.assertEqual(r["country"]["name"], "Cambodia")

    # 9
    def another_indiv_habitat(self):
        r = requests.get(URL + "/api/habitats/name=Townclose Hills").json()
        self.assertEqual(r["habitat"]["iucn_category"], 5)
        self.assertEqual(r["country"]["id"], 140421)

    # 10
    def another_indiv_species(self):
        r = requests.get(URL + "/api/species/name=Acipenser schrenckii").json()
        self.assertEqual(r["species"]["_order"], "ACIPENSERIFORMES")
        self.assertEqual(r["species"]["genus"], "Acipenser")


if __name__ == "__main__":
    unittest.main()
