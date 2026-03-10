from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.security import get_current_user
from backend.database import SessionLocal
from backend.models import Alert

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_alerts(db: Session = Depends(get_db)):
    alerts = db.query(Alert).all()
    return alerts

from backend.security import role_required
from backend.models import Alert
from datetime import datetime


@router.post("/")
def create_alert(
    alert_type: str,
    message: str,
    location: str,
    db: Session = Depends(get_db),
    user = Depends(role_required(["authority", "admin"]))
):
    alert = Alert(
        alert_type=alert_type,
        message=message,
        location=location,
        created_at=datetime.utcnow()
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)

    return {"message": "Alert created", "alert_id": alert.id}