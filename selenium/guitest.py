import unittest												# library to make many tests
from selenium import webdriver								# webdriver to actually connect to Chrome / website
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options		# configure options when accessing chrome, like --headless

# followed example at https://selenium-python.readthedocs.io/getting-started.html
# api at https://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.chrome.webdriver

# make sure to pip3 install -r requirements.txt  to install selenium
# then python3 guitest.py to run the tests

DRIVER_PATH = "./chromedriver_chrome89_win32.exe"
# right now, don't use the linux one; does not seem to work'

DEBUG = True

URL = "https://critterycovery.me"

if DEBUG:
	URL = "http://127.0.0.1:3000"						# debug ONLY; NEEDS http://, not https ; i don't think can have "localhost"

class GuiTests(unittest.TestCase):
	
	def setUp(self):						# part of unittest library; called before every test
		# example at https://stackoverflow.com/questions/12698843/how-do-i-pass-options-to-the-selenium-chrome-driver-using-python
		# arguments found here: https://peter.sh/experiments/chromium-command-line-switches/#no-sandbox

		chrome_options = Options()
		#chrome_options.add_argument("--headless")		# no GUI / browser to show up when testing
		#chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])	# get rid of console message "DevTools listening on ws://127.0.0.1:53975/devtools/browser..."
		# chrome_options.add_argument("--no-sandbox")	# don't think we need this


		self.driver = webdriver.Chrome(executable_path=DRIVER_PATH, options=chrome_options)

	# reference https://selenium-python.readthedocs.io/locating-elements.html#locating-elements  to write tests 

	def stest_dummy(self):
		driver = self.driver
		driver.get("http://www.python.org")				# go to this website
		
		self.assertIn("Python", driver.title)

	def test_main_page_0(self):
		driver = self.driver
		driver.get(URL)

		print("title = " + driver.title)		# critterycovery

		# just follow the HTML tags. If multiple, use [ ] brackes (1-indexed tho)
		xpath = "/html/body/div/div/body/div[2]/div[3]/div/div[1]/a/div/div/div"

		if DEBUG:
			xpath = "/html/body/div/div/body/div[2]/div/a[1]/div/div/div"

		result = driver.find_elements_by_xpath(xpath)[0]	# traverse path in HTML, get first cuz "find_elements"
		
		self.assertEqual(result.text, "Species")							# we have 3 cards on main page

	def test_about_page_0(self):
		driver = self.driver

		driver.get(URL + "/about")

		# print("title =" + driver.title) # critterycovery

		result = driver.find_elements_by_xpath("/html/body/div/div/div/div/h1")[0].text

		self.assertEqual(result, "General Description:")


	def tearDown(self):						# part of unittest library; called after every test
		self.driver.close()					# from example 
		
if __name__ == '__main__':
	unittest.main()			# run all methods that begin with "test"

	# Use below for IPython or Jupyter; source: https://selenium-python.readthedocs.io/getting-started.html
	# unittest.main(argv=['first-arg-is-ignored'], exit=False)  