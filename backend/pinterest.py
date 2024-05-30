from selenium import webdriver
from bs4 import BeautifulSoup
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
    # if images:
    #     all_pins = grid_centered_div.find_all('img')

    #     for index, pin in enumerate(all_pins, start=1):
    #         if index <= count:
    #             url = pin.get('src').replace('236x', '736x')
    #             captionize(url)

    # Getting metrics
    if text:
        total_pins = soup.find(attrs={"data-test-id": "pin-count"}).get_text().removesuffix(' Pins')
        print("Pins " + total_pins)

        userdata = soup.find(attrs={"data-test-id": "board-header"})
        userdata = userdata.find('img')
        username = userdata.get("alt")
        user_avatar = userdata.get("src")

        print("Username: " + username)
        print("Avatar: " + user_avatar)


pinterest("https://www.pinterest.com/sithruby/handicraft/", 1, True, False)