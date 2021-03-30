import unittest  # library to make many tests
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import (
    Keys,
)  # webdriver to actually connect to Chrome / website
from selenium.webdriver.chrome.options import (
    Options,
)  # configure options when accessing chrome, like --headless
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


# followed example at https://selenium-python.readthedocs.io/getting-started.html
# api at https://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.chrome.webdriver

# make sure to pip3 install -r requirements.txt  to install selenium
# then python3 guitest.py to run the tests

DRIVER_PATH = "./chromedriver_linux_gitlab"
# right now, don't use the linux one; does not seem to work'

DEV = False  # if True, make sure you have frontend started with "yarn start"

URL = "https://critterycovery.me"

if DEV:
    URL = "http://127.0.0.1:3000"  # debug ONLY; NEEDS http://, not https ; i don't think can have "localhost"


class GuiTests(unittest.TestCase):
    def setUp(self):  # part of unittest library; called before every test
        # example at https://stackoverflow.com/questions/12698843/how-do-i-pass-options-to-the-selenium-chrome-driver-using-python
        # arguments found here: https://peter.sh/experiments/chromium-command-line-switches/#no-sandbox

        chrome_options = Options()
        chrome_options.add_argument(
            "--headless"
        )  # no GUI / browser to show up when testing
        chrome_options.add_experimental_option(
            "excludeSwitches", ["enable-logging"]
        )  # get rid of console message "DevTools listening on ws://127.0.0.1:53975/devtools/browser..."
        # chrome_options.add_argument("--no-sandbox")	# don't think we need this

        self.driver = webdriver.Chrome(
            executable_path=DRIVER_PATH, options=chrome_options
        )

    # reference https://selenium-python.readthedocs.io/locating-elements.html#locating-elements  to write tests

    def test_main_page_0(self):
        driver = self.driver
        driver.get(URL)

        result = driver.find_elements_by_class_name("card")  # there are three cards

        self.assertEqual(len(result), 3)

    def test_main_page_1(self):
        driver = self.driver
        driver.get(URL)  # simulate going to this website

        # print("title = " + driver.title)		# critterycovery

        # just follow the HTML tags. If multiple, use [ ] brackes (1-indexed tho)
        xpath = "/html/body/div/div/body/div[2]/div/a[1]/div/div/div"  # change last div[1] to div[2] or div[3] to get "Habitats" / "Countries"

        if DEV:
            xpath = "/html/body/div/div/body/div[2]/div/a[1]/div/div/div"

        result = driver.find_elements_by_xpath(xpath)[
            0
        ]  # traverse path in HTML, get first cuz "find_elements"

        self.assertEqual(result.text, "Species")

    def test_main_page_2(self):
        driver = self.driver
        driver.get(URL)  # simulate going to this website

        # print("title = " + driver.title)		# critterycovery

        # just follow the HTML tags. If multiple, use [ ] brackes (1-indexed tho)
        xpath = "/html/body/div/div/body/div[2]/div/a[1]/div/div/div"  # change last div[1] to div[2] or div[3] to get "Habitats" / "Countries"

        if DEV:
            xpath = "/html/body/div/div/body/div[2]/div/a[1]/div/div/div"

        driver.find_elements_by_xpath(xpath)[0].click()  # click on Species

        self.assertEqual(driver.current_url, URL + "/species")

    def test_navbar_0(self):
        driver = self.driver
        driver.get(URL)

        xpath = "/html/body/div/div/nav/a"

        if DEV:
            xpath = "/html/body/div/div/nav/a"

        driver.find_elements_by_xpath(xpath)[0].click()

        self.assertEqual(driver.current_url, URL + "/")

    def test_navbar_1(self):
        driver = self.driver
        driver.get(URL + "/countries")

        xpath = "/html/body/div/div/nav/a"

        if DEV:
            xpath = "/html/body/div/div/nav/a"

        driver.find_elements_by_xpath(xpath)[0].click()

        self.assertEqual(driver.current_url, URL + "/")

    def test_loading(self):
        driver = self.driver

        driver.get(URL + "/species")

        # print("title =" + driver.title) # critterycovery

        xpath = "/html/body/div/div/div[2]"

        if DEV:
            xpath = "/html/body/div/div/div[2]"

        result = driver.find_elements_by_xpath(xpath)[0]  # get first ([0]) because

        self.assertEqual(result.text, "Loading...")

    def test_about_page_0(self):
        driver = self.driver

        driver.get(URL + "/about")

        # print("title =" + driver.title) # critterycovery

        xpath = "/html/body/div/div/body/div[1]/div[1]/h1"

        if DEV:
            xpath = "/html/body/div/div/body/div[1]/div[1]/h1"

        result = driver.find_elements_by_xpath(xpath)[0]  # get first ([0]) because

        self.assertEqual(result.text, "General Description:")

    def test_about_page_1(self):
        driver = self.driver
        driver.get(URL + "/about")
        xpath = "/html/body/div/div/body/div[2]/a[1]"
        if DEV:
            xpath = "/html/body/div/div/body/div[2]/a[1]"

        driver.find_elements_by_xpath(xpath)[0].click()

        self.assertEqual(
            driver.current_url, "https://gitlab.com/cs373-group16/critterycovery"
        )

    # def test_species_0(self):
    #     driver = self.driver
    #     driver.get(URL + "/species")

    #     xpath = "/html/body/div/div/div[2]/div/div[2]/div[6]/a/div/div[2]/div"

    #     if DEV:
    #         xpath = "/html/body/div/div/div[2]/div/div[2]/div[6]/a/div/div/div"

    #     element = WebDriverWait(driver, 10).until(
    #         EC.presence_of_element_located((By.XPATH, xpath))
    #     )

    #     self.assertEqual(element.text, "Asiatic Cheetah")

    # def test_species_1(self):
    #     driver = self.driver
    #     driver.get(URL + "/species")

    #     xpath = "/html/body/div/div/div[2]/div/div[2]/div[10]/a/div/div[2]/p"
    #     if DEV:
    #         xpath = "/html/body/div/div/div[2]/div/div[2]/div[10]/a/div/div/p"
    #     element = WebDriverWait(driver, 10).until(
    #         EC.presence_of_element_located((By.XPATH, xpath))
    #     )

    #     self.assertEqual(
    #         element.text,
    #         "Kingdom: ANIMALIA\nPhylum: CNIDARIA\nClass: ANTHOZOA\nOrder: SCLERACTINIA\nFamily: ACROPORIDAE",
    #     )

    def test_habitats_0(self):
        driver = self.driver
        driver.get(URL + "/habitats")

        xpath = "/html/body/div/div/div[2]/div/div[2]/div/table/tbody/tr[4]/td[2]"
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )

        self.assertEqual(element.text, "Pike")

    def test_habitats_1(self):
        driver = self.driver
        driver.get(URL + "/habitats")

        xpath = "/html/body/div/div/div[2]/div/div[2]/div/table/tbody/tr[9]/td[4]"
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )

        self.assertEqual(element.text, "1.2108")

    def test_pagination_habitat(self):
        driver = self.driver
        driver.get(URL + "/habitats")

        xpath_paginate = "/html/body/div/div/div[2]/div/div[3]/div/ul/li[5]/a"
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath_paginate))
        )  # page 3 of habitats
        driver.find_elements_by_xpath(xpath_paginate)[0].click()

        xpath = "/html/body/div/div/div[2]/div/div[2]/div/table/tbody/tr[3]/td[2]"
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        self.assertEqual(element.text, "Big Draft")

    def tearDown(self):  # part of unittest library; called after every test
        self.driver.close()  # from example
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()  # run all methods that begin with "test"

    # Use below for IPython or Jupyter; source: https://selenium-python.readthedocs.io/getting-started.html
    # unittest.main(argv=['first-arg-is-ignored'], exit=False)
