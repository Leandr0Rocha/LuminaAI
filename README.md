# Lumina AI
**Disclaimer**: This project uses a fictitious company. Any resemblance to real names, people, companies, or events is purely coincidental. The content is for demonstration and educational purposes only.

![image](https://github.com/user-attachments/assets/13b31302-f0b7-4fe0-879d-9c9c3c32830c)

Lumina AI is a learning platform that offers courses and solutions in artificial intelligence for students, professionals, and companies. The project uses **Flask** as a web framework, **SQLite** as a database, and follows the RESTful API standard for communication and data manipulation.

---

## 📋 Main Features

- **User Interface**:

- Home page with information about the platform and available courses.

- Registration and login page for users.

- Flash messages for user feedback (success, error, information).

- **Backend (RESTful API)**:

- Routes organized in Blueprints for better modularization.

- RESTful endpoints for registration, login, course enrollment, course consultation, and sending contact messages.

- Responses and redirects in JSON or HTML format, according to the interface's needs.

- **Database**:

- Integration with **Flask-SQLAlchemy** for data persistence.

- **SQLite** database for easy configuration and portability.

- Tables for users, courses (with fields such as duration, instructor, chapters), and associations between them.

---

## 🚀 Technologies Used

- **Frontend**:

- HTML5, CSS3

- JavaScript for interactivity (popups, flash messages, animations)

- **Backend**:

- Flask (Python web framework)

- Flask-SQLAlchemy (ORM)

- Flask-Login (authentication)

- RESTful APIs for data manipulation

- **Database**:

- SQLite (standard, easy to use and built-in)

---

## 🌐 Backend RESTful Routes

### Public Routes
- **`GET /`**: Homepage (index) and course listing.

- **`GET /cadastro`**: New user registration page.

- **`POST /cadastro`**: New user creation.

- **`POST /login`**: User authentication.

- **`POST /contact`**: Sends a contact message.

### Protected Routes (Login Required)
- **`GET /home`**: Homepage for logged-in users, displaying available courses and the student area.

- **`POST /enroll/<int:course_id>`**: Enrolls the logged-in user in a specific course.

- **`GET /course/<int:course_id>`**: Details of a specific course.

- **`POST /delete-account`**: Deletes the logged-in user's account.

- **`GET /logout`**: Logs the user out.

---

## ⚙️ How to Run the Project

### Prerequisites
- **Python 3.8+**
- **Pip** (Python package manager)
- **Virtualenv** (optional, but recommended)

### Installation

1. **Clone the repository**:

``bash
git clone https://github.com/your-username/lumina-ai.git
cd lumina-ai

``

2. **Create a virtual environment (optional, but recommended)**:

``bash
python -m venv venv
venv\Scripts\activate # On Windows

# or
source venv/bin/activate # On Linux/Mac

``

3. **Install the dependencies**:

``bash
pip install -r requirements.txt

```

4. **Configure the database**:

- Create the SQLite database and tables Required:

``bash
python

>>> from website import db, create_app

>>> app = create_app()

>>> with app.app_context():

... db.create_all()

... exit()

``

5. **(Optional) Populate the database with initial courses**:

``bash
python website/seed.py

``

6. **Run the Flask server**:

``bash
flask run

```

7. **Access the project in your browser**:

- [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## 🗂️ Project Structure

```
Lumina/
├── website/
│ ├── static/ # Static files (CSS, JS, (images)
│ ├── templates/ # HTML Templates
│ ├── __init__.py # Flask app initialization
│ ├── models.py # Database table definitions
│ ├── views.py # Backend routes and logic (RESTful APIs)
│ ├── seed.py # Script to populate the database
├── requirements.txt # Project dependencies
└── run.py # Main file to run the app

```

---

## 📚 Notes

- The project follows the RESTful pattern for routes and data manipulation.

- The Flask backend serves both HTML pages and endpoints for data manipulation via forms.

- The SQLite database is used by default to facilitate local testing and development.

- For production, it is recommended to switch the database to PostgreSQL or MySQL and configure appropriate environment variables.

---

Now you are ready to run and evolve Lumina AI! 🚀
