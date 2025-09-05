# URL Shortener with Expiry

A simple URL shortener built with **React (frontend)** and **Express + MongoDB (backend)**.  
Users can shorten a URL and set an expiry time (in minutes). After expiry, the link becomes invalid.

---

## 🚀 Setup Instructions

### 1. Clone & Extract
Download and extract this project, then open two terminals: one for backend and one for frontend.

### 2. Backend Setup
```sh
cd backend
npm install
npm start
```
Backend will run on [http://localhost:5000](http://localhost:5000).

Make sure MongoDB is running locally (`mongodb://localhost:27017/urlshortener`) or update `.env` with your MongoDB Atlas URI.

### 3. Frontend Setup
```sh
cd frontend
npm install
npm start
```
Frontend will run on [http://localhost:3000](http://localhost:3000).

### 4. Usage
1. Enter a URL and set expiry time (in minutes).  
2. Copy the generated short link.  
3. Open it before expiry → redirects to original URL.  
4. After expiry → shows "Link expired".

---

## 📂 Project Structure

```
url-shortener/
│── backend/   # Express + MongoDB server
│── frontend/  # React frontend
│── README.md  # Instructions
```

---

## ✅ Tech Stack
- **Frontend**: React (components, single CSS file)
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Database**: MongoDB (local or Atlas)

Enjoy shortening 🚀
