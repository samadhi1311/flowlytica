from flask import jsonify
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException, WebDriverException
import json
import time
from bs4 import BeautifulSoup

def youtube(url):      
    # Setup Chrome options
    options = Options()
    # Disable headless mode to observe the browser
    # options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument("--no-sandbox")

    # Use a clean profile
    options.add_argument("--user-data-dir=/tmp/chrome_profile")

    # Initialize a web driver instance to control a Chrome window
    try:
        driver = webdriver.Chrome(
            service=ChromeService(ChromeDriverManager().install()),
            options=options
        )
        # chrome_version = driver.capabilities['browserVersion']
        # driver_version = driver.capabilities['chrome']['chromedriverVersion'].split(' ')[0]
        # print(f"Chrome version: {chrome_version}")
        # print(f"ChromeDriver version: {driver_version}")
    except WebDriverException as e:
        print(f"Error initializing WebDriver: {e}")
        exit(1)

    # The URL of the target page
    url = 'https://www.youtube.com/watch?v=Rb8EDXAlJ6k'

    retry_attempts = 3
    for attempt in range(retry_attempts):
        try:
            # Visit the target page in the controlled browser
            driver.get(url)
            print("Navigation successful at attempt", attempt + 1, "!")
            break
        except WebDriverException as e:
            print(f"Error navigating to {url}: {e}")
            if attempt < retry_attempts - 1:
                print("Retrying...")
                time.sleep(5)  # Wait before retrying
            else:
                print("Max retries reached. Exiting.")
                driver.quit()
                exit(1)

    # try:
    #     # Wait up to 15 seconds for the consent dialog to show up
    #     consent_overlay = WebDriverWait(driver, 15).until(
    #         EC.presence_of_element_located((By.ID, 'dialog'))
    #     )

    #     # Select the consent option buttons
    #     consent_buttons = consent_overlay.find_elements(By.CSS_SELECTOR, '.eom-buttons button.yt-spec-button-shape-next')
    #     if len(consent_buttons) > 1:
    #         # Retrieve and click the 'Accept all' button
    #         accept_all_button = consent_buttons[1]
    #         accept_all_button.click()
    # except TimeoutException:
    #    print('Cookie modal missing')

    # Wait for YouTube to load the page data
    WebDriverWait(driver, 15).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, 'h1.ytd-watch-metadata'))
    )

    # Get the page source and parse it with BeautifulSoup
    soup = BeautifulSoup(driver.page_source, 'lxml')

    

    # Initialize the dictionary that will contain the data scraped from the YouTube page
    video = {}

    # Scraping logic
    title = soup.select_one('h1.ytd-watch-metadata').text.strip()

    # Dictionary where to store the channel info
    channel = {}

    # Scrape the channel info attributes
    channel_element = soup.select_one('#owner')

    channel_url = channel_element.select_one('a.yt-simple-endpoint')['href']
    channel_name = channel_element.select_one('#channel-name').text.strip()
    channel_image = channel_element.select_one('#img')['src']
    channel_subs = channel_element.select_one('#owner-sub-count').text.replace(' subscribers', '').strip()

    channel['url'] = channel_url
    channel['name'] = channel_name
    channel['image'] = channel_image
    channel['subs'] = channel_subs

    # Click the description section to expand it
    driver.find_element(By.ID, 'description-inline-expander').click()

    # Parse the updated page source after expanding the description
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    info_container_elements = soup.select('#info-container span')
    views = info_container_elements[0].text.replace(' views', '').strip()
    publication_date = info_container_elements[2].text.strip()

    description = soup.select_one('#description-inline-expander .ytd-text-inline-expander span').text.strip()

    # Safely handle the potential absence of the likes button
    likes_element = soup.select_one('.YtLikeButtonViewModelHost .yt-spec-button-shape-next__button-text-content')
    likes = likes_element.text.strip() if likes_element else "N/A"

    video['url'] = url
    video['title'] = title
    video['channel'] = channel
    video['views'] = views
    video['publication_date'] = publication_date
    video['description'] = description
    video['likes'] = likes

    # Print the scraped data
    print(video)

    # Close the browser and free up the resources
    driver.quit()

    # Export the scraped data to a JSON file
    return jsonify(video)
