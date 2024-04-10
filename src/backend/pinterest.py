import requests
from bs4 import BeautifulSoup
import os
import urllib.request

def scrape_pinterest_board(board_url, num_pins):
    response = requests.get(board_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    pins = soup.find_all('a', {'data-test-pin-link': True})[:num_pins]
    
    for pin in pins:
        pin_url = pin['href']
        download_image(pin_url)

def download_image(pin_url):
    response = requests.get(pin_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    image_element = soup.find('div', {'class': 'GrowthUnauthPinImage'})
    
    if image_element:
        image_url = image_element.find('img')['src']
        save_image(image_url)

def save_image(image_url):
    filename = os.path.basename(image_url)
    urllib.request.urlretrieve(image_url, filename)

if __name__ == "__main__":
    board_url = 'https://www.pinterest.com/sithruby/handicraft/'
    num_pins = 10  # Set the number of pins to download
    scrape_pinterest_board(board_url, num_pins)
