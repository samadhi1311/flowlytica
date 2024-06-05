from flask import jsonify
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

    userdata = {}


    if text:
        # Getting user data
        total_pins = soup.find(attrs={"data-test-id": "pin-count"}).get_text().removesuffix(' Pins')

        userinfo = soup.find(attrs={"data-test-id": "board-header"})
        board_name = userinfo.find('h1').get_text()
        userinfo = userinfo.find('img')
        username = userinfo.get("alt")
        user_avatar = userinfo.get("src")

        print("Avatar: " + user_avatar)
        print("Username: " + username)
        print("Board: " + board_name)
        print("Pins " + total_pins)

        userdata = {
            "avatar": user_avatar,
            "username": username,
            "board": board_name,
            "pins": total_pins
        }

    # Getting images

    if images:
        # Getting images
        grid_centered_div = soup.find('div', {'class': 'gridCentered'})
        all_pins = grid_centered_div.find_all('img')
        captions = []

        for index, pin in enumerate(all_pins, start=1):
            if index <= count:
                img_url = pin.get('src').replace('236x', '736x')
                caption = captionize(img_url)
                captions.append({"caption": caption})

        userdata["captions"] = captions

    return jsonify(userdata)