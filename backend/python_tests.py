import unittest
import requests

class TestBackend(unittest.TestCase):
	
	#def test_get_one_country00(self):
	#	r = requests.get('https://critterycovery.me/api/countries?name=Spain')

	def test_get_all_countries(self):
		# r = requests.get('https://critterycovery.me/api/countries').json()
		r = requests.get('http://0.0.0.0/api/countries').json() # this is weird but it works lol
		self.assertEqual(len(r["countries"]), 250)

	def test_get_all_habitats(self):
		# r = requests.get('https://critterycovery.me/api/habitats').json()
		r = requests.get('http://0.0.0.0/api/habitats').json() # this is weird but it works lol
		self.assertEqual(len(r["habitats"]), 500)

	def test_get_all_species(self):
		# r = requests.get('https://critterycovery.me/api/species').json()
		r = requests.get('http://0.0.0.0/api/species').json() # this is weird but it works lol
		self.assertEqual(len(r["species"]), 498)




if __name__ == '__main__':
    unittest.main()