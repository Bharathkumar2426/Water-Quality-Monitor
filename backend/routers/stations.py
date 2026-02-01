from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models import WaterStation, StationReading,StationCreate
from pydantic import BaseModel
from fastapi import HTTPException
from backend.security import get_current_user

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
    ).all()


@router.post("/")
def create_station(
    data: StationCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
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
