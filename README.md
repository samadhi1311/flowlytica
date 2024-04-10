# \_flowlytica

'\_flowlytica' is a social media content analyzer to extract insights.

#### Project Structure

```
-   public

-   src
    |
    - assets
    - backend
        |
         - main.py
    -   App.jsx
```

#### Setting up for local development

1. Clone the repo from Github.
2. Open in your code editor and in the main directory run `npm install`.
3. In a new splitted terminal, create a new Python Virtual Environment by running `py -3 -m venv .venv`.
4. Then activate the Virtual Environment by running `.venv\Scripts\activate`.
5. Install requirements by running `pip install Flask Flask-CORS beautifulsoup4 requests`.
6. The change the directory to `src/backend` and run `python main.py` to run the Python backend.
7. Finally, run `npm run dev` to start the React frontend.

#### Project plan

1. Frontend with React using Vite.
2. Backend with Python using Scrapy, pyTorch, and Flask.
3. Axios for communication between frontend and backend.

#### Application procedure

-   [x] Get the URL, count and media types from the frontend and pass to the backend.
-   [ ] Identify the social media platform and entity status (Eg: public/private).
-   [ ] Scrape the URL and download media.
-   [ ] Process media using relavent models.
-   [ ] Send results as `json` to the frontend.
-   [ ] Visualize results in the frontend.
