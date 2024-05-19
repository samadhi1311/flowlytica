from selenium import webdriver
from bs4 import BeautifulSoup
import requests
import os
from captions import captionize

def pinterest(url, count, text, images):
    pinterest_board_url = url

    driver = webdriver.Chrome()
    driver.get(pinterest_board_url)
    driver.implicitly_wait(10)
    page_source = driver.page_source
    driver.quit()

    soup = BeautifulSoup(page_source, 'lxml')

    grid_centered_div = soup.find('div', {'class': 'gridCentered'})

    # Getting images
    if images:
        all_pins = grid_centered_div.find_all('img')

        for index, pin in enumerate(all_pins, start=1):
            if index <= count:
                url = pin.get('src').replace('236x', '736x')
                captionize(url)
