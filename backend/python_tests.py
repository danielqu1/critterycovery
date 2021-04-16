import unittest
import requests

DEV = False

URL = "https://critterycovery.me"
if DEV:
    URL = "http://0.0.0.0"


class TestBackend(unittest.TestCase):

    # def test_get_one_country00(self):
    # 	r = requests.get('https://critterycovery.me/api/countries?name=Spain')

    def test_get_all_countries(self):
        r = requests.get(
            URL + "/api/countries"
        ).json()  # this is weird but it works lol
        self.assertEqual(len(r["countries"]), 250)

    def test_get_all_habitats(self):
        r = requests.get(URL + "/api/habitats").json()
        self.assertEqual(len(r["habitats"]), 457)

    def test_get_all_species(self):
        r = requests.get(URL + "/api/species").json()
        self.assertEqual(len(r["species"]), 498)

    def test_get_one_country(self):
        r = requests.get(URL + "/api/countries/name=Afghanistan").json()
        self.assertEqual(r["country"]["alpha2_code"], "AF")
        self.assertEqual(r["country"]["region"], "Asia")

    def test_get_one_habitat(self):
        r = requests.get(URL + "/api/habitats/name=Sommerrain").json()
        self.assertEqual(r["habitat"]["id"], 165595)
        self.assertEqual(r["habitat"]["countries"], "DEU")

    def test_get_one_species(self):
        r = requests.get(URL + "/api/species/name=Spondylurus culebrae").json()
        self.assertEqual(r["species"]["common_name"], "Culebra Skink")
        self.assertEqual(r["species"]["phylum"], "CHORDATA")

    def country_by_aplha2(self):
        r = requests.get(URL + "/api/countries/alpha2_code=BZ").json()
        self.assertEqual(r["country"]["region"], "Americas")
        self.assertEqual(r["country"]["total_pop"], 370300)

    def country_by_aplha3(self):
        r = requests.get(URL + "/api/countries/alpha3_code=KHM").json()
        self.assertEqual(r["country"]["alpha2_code"], "KH")
        self.assertEqual(r["country"]["name"], "Cambodia")


if __name__ == "__main__":
    unittest.main()
