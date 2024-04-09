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
3. In a new terminal windows, change the directory to `src/backend` and run `pip install` and then `python main.py`.
4. In the terminal of main directory, run `npm run dev'`.

#### Project plan

1. Frontend with React using Vite.
2. Backend with Python using Scrapy, pyTorch, and Flask.
3. Axios for communication between frontend and backend.

#### Application procedure

1. Get the URL, time range and media type from the frontend and pass to the backend.
2. Identify the social media platform and entity status (Eg: public/private).
3. Scrape the URL and download media.
4. Process media using relavent models.
5. Send results as `json` to the frontend.
6. Visualize results in the frontend.
