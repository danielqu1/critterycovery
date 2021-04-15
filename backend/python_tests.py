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
        self.assertEqual(len(r["habitats"]), 500)

    def test_get_all_species(self):
        r = requests.get(URL + "/api/species").json()
        self.assertEqual(len(r["species"]), 498)

    def test_get_one_country(self):
        r = requests.get(URL + "/api/countries/name=Afghanistan").json()
        self.assertEqual(len(r["alpha2_code"]), "AF")
        self.assertEqual(len(r["region"]), "Asia")

    def test_get_one_habitat(self):

    def test_get_one_species(self):


if __name__ == "__main__":
    unittest.main()
