from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models import Report,Alert,ReportCreate
from backend.security import get_current_user
from pydantic import BaseModel

class ReportActionSchema(BaseModel):
    action: str



router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)
reports = []

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_report(
    data: ReportCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not data:
        raise HTTPException(status_code=400, detail="Empty request body")

    report = Report(
        user_id=1,
        photo_url=data.photo_url,
        location=data.location,
        description=data.description,
        water_source=data.water_source,
        status="pending",
        alert_id=data.alert_id   # ✅ important

    )

    db.add(report)
    db.commit()
    db.refresh(report)


    if report.alert_id:
        alert = db.query(Alert).filter(Alert.id == report.alert_id).first()
        if alert:
            alert.report_id = report.id
            db.commit()

    return {
        "message": "Report submitted successfully",
        "report_id": report.id
    }


@router.get("/")
def get_reports(db: Session = Depends(get_db)):
    return db.query(Report).all()


class ReportStatusUpdate(BaseModel):
    report_id: int
    status: str


@router.post("/{report_id}/action")
def report_action(
    report_id: int,
    action_data: ReportActionSchema,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # 🔹 Allow only authority
    if current_user["role"] != "authority":
        raise HTTPException(status_code=403, detail="Only authority allowed")

    # 🔹 Find report

    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")


    # 🔹 Allow action only if pending
    if report.status != "pending":
        raise HTTPException(status_code=400, detail="Already processed")

    # 🔹 Validate action
    if action_data.action not in ["verified", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid action")

    # 🔹 Update status
    report.status = action_data.action
    db.commit()

    return {"message": f"Report {action_data.action} successfully"}

