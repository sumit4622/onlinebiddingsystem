# Online Bidding System

![React CI/CD](https://github.com/sumit4622/onlinebiddingsystem/actions/workflows/deploy.yml/badge.svg)

An online bidding application where users can drop auction items and bid for products, while the admin can monitor all activities in real-time.

[![Last Commit](https://img.shields.io/github/last-commit/sumit4622/onlinebiddingsystem?style=for-the-badge\&color=007ACC)]()
[![React](https://img.shields.io/badge/React-17.0.2-blue)]()
[![Django](https://img.shields.io/badge/Django-4.2-green)]()

---

## 🔧 Tech Stack

* **Frontend:** React, Bootstrap, Ant Design, react-lucide
* **Backend:** Django REST Framework, Django Channels
* **Database:** SQLite
* **Realtime:** Redis (for WebSocket channels)
* **Authentication:** JWT (JSON Web Tokens)

---

## ⚙️ Features

* User Registration and Login with JWT Authentication
* Create and Drop Auction Items
* Real-time Bidding using WebSockets (Django Channels + Redis)
* Admin Dashboard for Monitoring Users and Bids
* Block/Delete Users from Admin Panel
* Responsive UI using React, Bootstrap, and Ant Design

---

## 🖥️ Installation Guide

### Prerequisites

* Python 3.9+
* Node.js 16+
* npm or yarn
* Redis server (for real-time bidding)

---

### Backend Setup (Django)

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Create a virtual environment:

   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:

   * **Windows:**

     ```bash
     venv\Scripts\activate
     ```
   * **Mac/Linux:**

     ```bash
     source venv/bin/activate
     ```
4. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
5. Apply database migrations:

   ```bash
   python manage.py migrate
   ```
6. Start the Django development server:

   ```bash
   python manage.py runserver
   ```
7. Make sure Redis server is running for Django Channels:

   ```bash
   redis-server
   ```

---

### Frontend Setup (React)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the React development server:

   ```bash
   npm start
   ```
4. Open your browser at `http://localhost:3000`

---
