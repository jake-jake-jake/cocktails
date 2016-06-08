#!/usr/bin/env python3

from selenium import webdriver
import unittest


class AdminPageTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def test_visit_admin_page(self):
        # Visit admin page
        self.browser.get('http://localhost:8000/admin')
        # Check page title
        self.assertIn('Django site admin', self.browser.title)


class API_fetch_tests(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_fetch_Ingredient_JSON(self):
        pass

    def test_fetch_Drink_JSON(self):
        pass


class ReactAppTests(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_fetch_index(self):
        self.browser.get('http://localhost:8000/index')
        self.assertIn('Cocktails', self.browser.title)

if __name__ == '__main__':
    print('test')
    unittest.main()
