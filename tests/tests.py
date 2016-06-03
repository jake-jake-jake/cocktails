#!/usr/bin/env python3

from selenium import webdriver
import unittest


class AdminPageTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def visit_admin_page(self):
        # Visit admin page
        self.browser.get('http://localhost:8000/admin')
        # Check page title
        self.assertIn('Django site admin', self.browser.title)

class API_fetch_tests(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def fetch_Ingredient_JSON(self):
        pass

    def fetch_Drink_JSON(self):
        pass


if __name__ == '__main__':
    unittest.main(warnings='ignore')
