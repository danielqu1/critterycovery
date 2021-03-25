import unittest
import requests

# CAN'T EVEN TEST THE UNITTESTS BECAUSE SO FAR CAN'T ACCESS BACKEND

class TestBackend(unittest.TestCase):
	
	#def test_get_one_country00(self):
	#	r = requests.get('https://critterycovery.me/api/countries?name=Spain')	
		

	def test_get_all_countries(self):
		r = requests.get('https://critterycovery.me/api/countries')	
		self.assertEqual(len(r.json()["countries"]), 250)



if __name__ == '__main__':
    unittest.main()