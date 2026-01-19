# Water Quality Monitor – Complete Step-by-Step Execution Guide


---

## 1. Project Overview

The **Water Quality Monitor** is a full-stack application used to monitor and manage water quality data.

**Technologies Used:**
- Backend: FastAPI (Python)
- Frontend: React (Vite)
- Database: PostgreSQL
- Authentication: JWT (JSON Web Tokens)

---

## 2. System Requirements (Install First)

### 2.1 Install Python

- Install **Python 3.9 or above**
- Download from: https://www.python.org

Verify installation:
```
python --version
```
Expected Output:
```
Python 3.x.x
```

---

### 2.2 Install Node.js and npm

- Install **Node.js 18 or above**
- Download from: https://nodejs.org

Verify installation:
```
node --version
npm --version
```
Expected Output:
```
v18.x.x
9.x.x
```

---

### 2.3 Install PostgreSQL

- Install PostgreSQL
- Set a username and password during installation

Verify PostgreSQL is running:
```
psql --version
```
Expected Output:
```
psql (PostgreSQL) xx.x
```

---

### 2.4 Install Git

Verify Git:
```
git --version
```
Expected Output:
```
git version 2.x.x
```

---

## 3. Project Folder Structure

```
Water-Quality-Monitor/
│
├── backend/            # FastAPI backend
├── frontend/           # React frontend
├── .env.example        # Environment variables example
├── .gitignore
├── requirements.txt
└── README.md / PROJECT_SETUP.txt
```

---

## 4. Backend Setup (FastAPI)

### Step 4.1: Open Terminal and Navigate to Backend

Command:
```
cd Water-Quality-Monitor
cd backend
```

Expected Output:
- Terminal path changes to backend folder

---

### Step 4.2: Create Virtual Environment

Command:
```
python -m venv venv
```

Expected Output:
- A folder named `venv` is created

---

### Step 4.3: Activate Virtual Environment

**Windows:**
```
venv\Scripts\activate
```

Expected Output:
```
(venv)
```

---

### Step 4.4: Install Backend Dependencies

Command:
```
pip install -r requirements.txt
```

Expected Output:
- Packages such as fastapi, uvicorn, sqlalchemy installed

---

### Step 4.5: Setup Environment Variables

Command:
```
copy .env.example .env
```

Edit `.env` file:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/water_monitor
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Expected Output:
- `.env` file created successfully

---

### Step 4.6: Create PostgreSQL Database

Command (inside PostgreSQL shell):
```
CREATE DATABASE water_monitor;
```

Expected Output:
```
CREATE DATABASE
```

---

### Step 4.7: Run Backend Server

Command:
```
uvicorn main:app --reload
```

Expected Output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

---

### Step 4.8: Verify Backend

Open browser:
```
http://127.0.0.1:8000/docs
```

Expected Output:
- Swagger UI page opens
- API endpoints are visible

---

## 5. Frontend Setup (React)

### Step 5.1: Open New Terminal

Command:
```
cd Water-Quality-Monitor
cd frontend
```

---

### Step 5.2: Install Frontend Dependencies

Command:
```
npm install
```

Expected Output:
- node_modules folder created
- No errors

---

### Step 5.3: Run Frontend Server

Command:
```
npm run dev
```

Expected Output:
```
Local: http://localhost:5173/
```

---

### Step 5.4: View Frontend Dashboard

Open browser:
```
http://localhost:5173
```

Expected Output:
- Frontend UI loads successfully

---

## 6. Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token is used in API requests

Header format:
```
Authorization: Bearer <token>
```

---

## 7. Testing the Project

### Using Swagger
- Open `/docs`
- Try login API
- Verify responses

### Using Frontend
- Interact with UI
- Confirm backend responses

---

## 8. Common Errors & Fixes

- **Port already in use** → Stop previous server
- **Database connection error** → Check PostgreSQL credentials
- **Module not found** → Re-run pip or npm install

---

## 9. Important Notes

- `.env` file should NOT be committed
- `venv/` and `node_modules/` are ignored
- Backend must run before frontend

---

## 10. Author

**Bharath Kumar**

---


