import unittest
import requests

# CAN'T EVEN TEST THE UNITTESTS BECAUSE SO FAR CAN'T ACCESS BACKEND

class TestBackend(unittest.TestCase):
	
	#def test_get_one_country00(self):
	#	r = requests.get('https://critterycovery.me/api/countries?name=Spain')	
		

	def test_get_all_countries(self):
		# r = requests.get('https://critterycovery.me/api/countries').json()
		r = requests.get('http://0.0.0.0/api/countries').json() # this is weird but it works lol
		self.assertEqual(len(r["countries"]), 250)



if __name__ == '__main__':
    unittest.main()