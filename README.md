<div align="center">

# \_flowlytica

<img src="frontend\assets\20240409_080017_flowlytica-gradient.svg" width="256px" />

'\_flowlytica' is a social media content analyzer to extract insights.

</div>

#### Screens

<div align="center">
    <img src="frontend\assets\Screenshot (145).png" width="80%" />
    <img src="frontend\assets\Screenshot (146).png" width="80%" />
    <img src="frontend\assets\Screenshot (147).png" width="80%" />
</div>

#### Project Structure

```
├── backend
│   ├── main.py
│   ├── pinterest.py
├── frontend
│   ├── assets
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
└── .gitignore
└── LICENSE
└── README.md
```

#### Setting up for local development

1. Clone the repo from Github.
2. Open in your code editor and in the frontend directory run `npm install`.
3. In a new splitted terminal, navigate to backend and install requirements using `pip install -r requirements.txt`.
4. Then run `python main.py` to run the Python backend.
5. Finally, run `npm run dev` in the other terminal to start the React frontend.

#### Project plan

1. Frontend with React using Vite.
2. Backend with Python using BeautifulSoup, Huggingface, and Flask.
3. Axios for communication between frontend and backend.

#### Application procedure

-   [x] Get the URL, count and media types from the frontend and pass to the backend.
-   [x] Scrape the URL and download media.
-   [x] Process images and extract captions.
-   [x] Extract keywords.
-   [x] Send results as `json` to the frontend.
-   [x] Visualize results in the frontend.
