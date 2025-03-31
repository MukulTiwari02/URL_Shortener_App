# URL_Shortener_App

## Introduction

URL_Shortener_App is a **simple and efficient URL shortening service** that allows users to:

- **Generate short URLs** from long links.
- **Track click analytics** for each shortened URL.
- **Create QR codes** for easy sharing.
- **Authenticate users** to manage their shortened links.
- **View a dashboard** to track link status and analytics.

This project is built using the **MERN stack** (MongoDB, Express.js, React, and Node.js).

### **Live Demo:** [URL_Shortener_App](https://url-shortener-app-two.vercel.app/)

---

## 🚀 Installation & Usage

Follow these steps to set up the project locally:

### **1. Clone the Repository**

```sh
git clone https://github.com/MukulTiwari02/URL_Shortener_App.git
cd URL_Shortener_App
```

### **2. Setup Backend**

```sh
cd backend
npm install
```

Create a `.env` file in the **backend** folder and add the following environment variables:

```env
PORT=your_backend_port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```sh
npm start
```

### **3. Setup Frontend**

NOTE: Run frontend in a new/separate terminal

```sh
cd frontend
npm install
```

Create a `.env` file in the **frontend** folder and add the following environment variable:

```env
REACT_APP_BACKEND_URL=your_backend_api_url
```

Start the frontend server:

```sh
npm start
```

### **4. Open the App**

Once both backend and frontend are running, open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Tech Stack

- **Frontend**: React, React Router, Redux Toolkit, Axios, React-Toastify
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt, cookie-parser
- **Utilities**: shortid for URL generation, QR code generator
- **Hosting**: Vercel (Frontend), Railway.app (Backend)

---

## 📌 Features

✅ **User Authentication** (JWT-based login/logout)  
✅ **URL Shortening** (Generate short links for long URLs)  
✅ **Click Analytics** (Track number of visits per URL)  
✅ **QR Code Generation** (For easy sharing)  
✅ **Dashboard** (View and manage shortened URLs)  
✅ **Responsive UI** (Built with React and TailwindCSS)

---

## 📬 Contributions & Support

Feel free to fork this repository and submit pull requests for improvements! If you encounter any issues, open an issue on GitHub.

---
