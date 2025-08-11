from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from datetime import datetime
import os

"""
SiteHound
==========

This module defines the Flask application powering the SiteHound plant marketplace.
The app allows users to list and sell plants, upload photos of their inventory and
receive automatic classification suggestions. While the current implementation
uses a simple stub for classification, the architecture has been designed to
accommodate an LLM or vision model in the future. A lightweight SQLite
database stores plant listings.
"""

# Configure application
app = Flask(__name__)
app.config['SECRET_KEY'] = 'change-this-key'  # Replace with a secure key in production
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sitehound.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# File upload settings
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialise database
db = SQLAlchemy(app)


class Plant(db.Model):
    """A simple ORM model for storing plant listings."""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    species = db.Column(db.String(120), nullable=True)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=True)
    image_filename = db.Column(db.String(255), nullable=True)
    classification = db.Column(db.String(120), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Plant {self.name}>"


def classify_plant(image_path: str) -> str:
    """
    Stub function for plant classification.

    Given an image path, this function returns a string representing a
    classification of the plant. In the current implementation it simply
    returns "unknown". When integrating an LLM or computer vision model,
    replace this logic with a call to the appropriate API or model.

    Args:
        image_path: The absolute path to the uploaded image.

    Returns:
        A string classification label.
    """
    # Placeholder classification logic. Replace with an AI model call.
    return "unknown"


@app.before_first_request
def init_db() -> None:
    """Ensure the database and tables exist before handling requests."""
    db.create_all()


@app.route('/')
@app.route('/plants')
def list_plants():
    """Display all plant listings."""
    plants = Plant.query.order_by(Plant.created_at.desc()).all()
    return render_template('list.html', plants=plants)


@app.route('/add', methods=['GET', 'POST'])
def add_plant():
    """Handle addition of new plant listings via form submission."""
    if request.method == 'POST':
        name = request.form.get('name')
        species = request.form.get('species')
        description = request.form.get('description')
        price = request.form.get('price')
        image_file = request.files.get('image')

        if not name:
            flash('Name is required.', 'error')
            return redirect(request.url)

        # Save uploaded image if present
        image_filename = None
        classification = None
        if image_file and image_file.filename:
            filename = secure_filename(image_file.filename)
            save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image_file.save(save_path)
            image_filename = filename
            # Classify the uploaded image (stubbed)
            classification = classify_plant(save_path)

        try:
            price_value = float(price) if price else None
        except ValueError:
            flash('Price must be a numeric value.', 'error')
            price_value = None

        # Create and save plant record
        plant = Plant(
            name=name,
            species=species,
            description=description,
            price=price_value,
            image_filename=image_filename,
            classification=classification,
        )
        db.session.add(plant)
        db.session.commit()
        flash('Plant added successfully!', 'success')
        return redirect(url_for('list_plants'))

    return render_template('add.html')


@app.route('/plant/<int:plant_id>')
def view_plant(plant_id: int):
    """Display details for a single plant."""
    plant = Plant.query.get_or_404(plant_id)
    return render_template('detail.html', plant=plant)


@app.route('/uploads/<path:filename>')
def uploaded_file(filename: str):
    """Serve uploaded images from the upload directory."""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# Provide datetime object in all templates for footer year
@app.context_processor
def inject_datetime():
    from datetime import datetime as _dt
    return dict(datetime=_dt)


if __name__ == '__main__':
    app.run(debug=True)