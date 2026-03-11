from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import WaterStation, StationReading,StationCreate,Alert,StationReadingCreate
from pydantic import BaseModel
from fastapi import HTTPException
from security import get_current_user,role_required
from datetime import datetime


router = APIRouter(
    prefix="/stations",
    tags=["Stations"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_stations(db: Session = Depends(get_db)):
    return db.query(WaterStation).all()



@router.get("/{station_id}/readings")
def get_station_readings(station_id: int, db: Session = Depends(get_db)):
    return db.query(StationReading).filter(
        StationReading.station_id == station_id

    ).order_by(StationReading.recorded_at.asc()).all()


@router.post("/")
def create_station(
    data: StationCreate,
    db: Session = Depends(get_db),
    current_user = Depends(role_required(["authority","admin"]))
):
    if not data:
        raise HTTPException(status_code=400, detail="Empty request body")

    station = WaterStation(
        name=data.name,
        location=data.location,
        latitude=data.latitude,
        longitude=data.longitude,
        managed_by=data.managed_by
    )

    db.add(station)
    db.commit()
    db.refresh(station)

    return {
        "message": "Station added successfully",
        "station_id": station.id
    }


THRESHOLDS = {
    "pH": 8.5,
    "turbidity": 5,
    "DO": 10,
    "lead": 0.01,
    "arsenic": 0.01
}

@router.post("/{station_id}/readings")
def create_station_reading(
    station_id: int,
    data: StationReadingCreate,
    db: Session = Depends(get_db)
):
    reading = StationReading(
        station_id=station_id,
        parameter=data.parameter,
        value=data.value,
        recorded_at=datetime.utcnow()
    )

    db.add(reading)

    # 🔵 Predictive Alert Logic
    if data.parameter in THRESHOLDS and data.value > THRESHOLDS[data.parameter]:

        station = db.query(WaterStation).filter(
            WaterStation.id == station_id
        ).first()

        if station:
            alert = Alert(
                alert_type="contamination",   # ✔ correct field
                message=f"{data.parameter} level {data.value} exceeded safe limit {THRESHOLDS[data.parameter]}",
                location=station.location,
                station_id=station_id,
                created_at=datetime.utcnow()   # ✔ correct field
            )

            db.add(alert)

    # 🔵 Commit everything once
    db.commit()
    db.refresh(reading)

    return {
        "message": "Reading added successfully",
        "reading_id": reading.id
    }

@router.get("/analytics/summary")
def analytics_summary(
    db: Session = Depends(get_db),
    user = Depends(role_required(["authority","admin"]))
):

    total_stations = db.query(WaterStation).count()
    total_readings = db.query(StationReading).count()
    total_alerts = db.query(Alert).count()

    contamination_alerts = db.query(Alert).filter(
        Alert.alert_type == "contamination"
    ).count()

    return {
        "total_stations": total_stations,
        "total_readings": total_readings,
        "total_alerts": total_alerts,
        "contamination_alerts": contamination_alerts
    }

