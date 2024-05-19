from selenium import webdriver
from bs4 import BeautifulSoup
import requests
import os

pinterest_board_url = 'https://www.pinterest.com/aksharareddy1801/saree-aesthetic/'

driver = webdriver.Chrome()
driver.get(pinterest_board_url)
driver.implicitly_wait(10)
page_source = driver.page_source
driver.quit()

soup = BeautifulSoup(page_source, 'lxml')

grid_centered_div = soup.find('div', {'class': 'gridCentered'})
all_pins = grid_centered_div.find_all('img')

download_path = 'src/backend/temp/pinterest'

if not os.path.exists(download_path):
        os.makedirs(download_path)
else:
    # Clear the contents of the directory
    for file_name in os.listdir(download_path):
        file_path = os.path.join(download_path, file_name)
        if os.path.isfile(file_path):
            os.unlink(file_path)

print(len(all_pins))

for index, pin in enumerate(all_pins, start=1):
    url = pin.get('src').replace('236x', '736x')
    image = f"image_{index}.jpg"

    image_path = os.path.join(download_path, image)
        
    # Download the image
    with open(image_path, 'wb') as f:
        image_response = requests.get(url)
        f.write(image_response.content)
        print(f"Downloaded {image}")

# https://i.pinimg.com/236x/82/0b/fd/820bfd515b5ca8ccba9b9cd5bb1744c3.jpg
# https://i.pinimg.com/736x/82/0b/fd/820bfd515b5ca8ccba9b9cd5bb1744c3.jpg
