# Selenium tests

Run `pip3 install -r requirements.txt` to install selenium. Then run `python3 guitest.py` to run the tests. The driver is currently for Windows, on Chrome version 89. I am not sure if it will work on Linux or Mac.

To make a unit test, go to the website and Inspect Element to view the HTML. For `find_elements_by_xpath`, follow the tags down, like `/html/body/div/div[2]/...`. Don't end with a `/`. If there are multiple tags, use the square brackets to index (use 1-indexing though, so there is no div[0]).  