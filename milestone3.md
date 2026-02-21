# 🌊 Water Quality Monitor  
## Milestone 3 – Alerts & Historical Data Module

---

## 📌 Overview

Milestone 3 enhances the Water Quality Monitor platform by implementing a structured Alerts System and a Historical Data module.

This phase focuses on improving transparency, monitoring capabilities, and providing real-time contamination updates to users.

---

## 🎯 Objectives

- Implement water contamination and boil-water alerts
- Store and retrieve alerts from database
- Fetch historical water station readings
- Display past data for trend analysis
- Improve API response handling for stability

---

## 🏗️ Features Implemented

### 1️⃣ Alerts Module

The Alerts module allows the system to generate and retrieve water safety notifications.

#### Capabilities:
- Create alerts (boil notice, contamination, outage)
- Store alert details in PostgreSQL
- Link alerts with stations or reports (optional)
- Retrieve all alerts via API
- Display alerts in frontend interface

#### Alerts Table Structure:
- id
- alert_type
- message
- location
- station_id (optional)
- report_id (optional)
- created_at

---

### 2️⃣ Historical Data Module

The Historical Data module allows users to view previous water quality readings.

#### Capabilities:
- Retrieve station readings from database
- Display readings in History page
- Handle empty datasets safely
- Avoid returning unnecessary 400 errors

#### Station Readings Table Structure:
- id
- station_id
- parameter (pH, turbidity, DO, lead, arsenic)
- value
- recorded_at

---

## 🔌 Backend Implementation

### Technologies Used
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic

### API Endpoints Implemented

#### Alerts
- `POST /alerts` – Create new alert
- `GET /alerts` – Retrieve all alerts

#### Historical Data
- `GET /history` – Retrieve station readings

---

## 💻 Frontend Integration

### Technologies Used
- React.js
- Tailwind CSS
- Axios

### Pages Updated
- Alerts Page
- History Page

### Improvements
- Alerts displayed dynamically
- Historical readings shown properly
- Empty responses handled safely
- No crash when database has no records

---

## 🧪 Testing Performed

- Verified alert creation through Swagger
- Checked alert entries in PostgreSQL
- Tested history endpoint with data
- Tested history endpoint with empty dataset
- Confirmed frontend renders responses correctly

---

## 🛠️ Problems Addressed in Milestone 3

- Lack of centralized contamination alert system
- No historical data visibility
- Poor transparency in water quality trends
- Delay in notifying users about unsafe water
- Unstable API behavior on empty responses

---

## 📚 Technology Stack

Frontend: React.js + Tailwind CSS  
Backend: FastAPI  
Database: PostgreSQL  

---

## 👨‍💻 Project Author

Bharath Kumar  
Water Quality Monitor Project  

