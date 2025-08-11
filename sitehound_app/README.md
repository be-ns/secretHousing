# Sighthound Design Studios

Sighthound Design Studios ("Sighthound" for short) is a simple plant‑marketplace web application built with Python and Flask. The goal of the project is to help people discover and sell quality plants and trees for their homes. A light, organic aesthetic underpins the interface, reflecting the natural products on offer.

## Features

* **List plants for sale** – browse a catalog of plants with images, species and optional pricing.
* **Add new plants** – upload photos and describe your plant using a simple form. The app stores images on disk and metadata in a SQLite database.
* **Automatic classification (stub)** – uploaded images are sent to a stubbed classification function which currently returns `"unknown"`. This function is designed to be replaced with a call to a large language model or computer vision API in the future.
* **Responsive design** – the interface adapts to different screen sizes, using an organic watercolour background and translucent panels.

## Requirements

* Python 3.8 or later
* `pip` package manager

The application depends on `Flask` and `SQLAlchemy`. These dependencies are listed in `requirements.txt` (not strictly necessary, but included for convenience).

## Installation

1. Clone this repository or copy the `sitehound_app` folder into your workspace.

   ```bash
   git clone https://github.com/your-user/secret-housing.git
   cd secret-housing
   ```

2. Create a virtual environment (recommended) and activate it:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:

   ```bash
   python -m sitehound_app.app
   ```

5. Open your browser and navigate to `http://127.0.0.1:5000/` to access Sighthound.

When run locally, the server starts in debug mode and writes uploaded images to `sitehound_app/uploads`. SQLite data is stored in `sitehound_app/sitehound.db`. To start fresh, simply delete these directories and re-run the application.

## LLM and image classification integration

The function `classify_plant(image_path)` in `app.py` currently returns the string `"unknown"`. To enable automatic classification of uploaded images, replace the body of this function with a call to your preferred model or API. For example, you could use a computer vision API to detect plant species, or feed the image into a language model that generates classification labels.

After determining the classification, return the result as a string. The returned value will appear next to the plant listing.

## Customising the design

The organic look of SiteHound comes from `static/css/styles.css` and a background image located in `static/images/watercolor_bg.png`. If you wish to update the appearance, replace the background image with your own artwork or adjust the CSS variables defined in `:root`.

## Static version for GitHub Pages

GitHub Pages can only host static content – HTML, CSS and JavaScript – and cannot run Python code or manage a database【550380897618827†L86-L100】. To provide a shareable preview of Sighthound Design Studios on GitHub Pages, a client‑side implementation has been added in the `sighthound_site` directory. This version features:

* A **landing page** (`index.html`) introducing the brand and linking to the shop.
* A **shop page** (`store.html`) that displays a small catalogue of plants in a carousel. All data resides in client-side JavaScript; no backend is required.
* A **cart page** (`cart.html`) which stores selected items in the browser’s `localStorage`.

Because there is no server, visitors cannot upload new plants or receive AI classification suggestions. Those features remain in the Flask application. To publish the static site on GitHub Pages, configure Pages to serve from the root of `sighthound_site` (for example, by copying its contents into a `gh-pages` branch) and GitHub will automatically build and deploy it.

## License

This project is provided as-is for educational purposes. Feel free to modify and extend it to suit your needs.