import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# followed example at https://selenium-python.readthedocs.io/getting-started.html
# api at https://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.chrome.webdriver

DRIVER_PATH = "./chromedriver_chrome89_win32.exe"
# right now, don't use the linux one; does not seem to work'

class GuiTests(unittest.TestCase):
	
	def setUp(self):
		# part of unittest library; called before every test 
		print("SETUP")
		self.driver = webdriver.Chrome(executable_path=DRIVER_PATH)

	def test_dummy(self):
		print("start dummy")
	
		driver = self.driver
		driver.get("http://www.python.org")
		self.assertIn("Python", driver.title)
		print("end dummy")

	def tearDown(self):
		# part of unittest library; called after every test
		self.driver.close()		# from example 
		
if __name__ == '__main__':
	unittest.main()			# run all methods that begin with "test"