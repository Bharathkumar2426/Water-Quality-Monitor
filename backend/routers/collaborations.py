from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models import Collaboration, CollaborationCreate, CollaborationResponse
from backend.security import role_required
router = APIRouter(prefix="/collaborations", tags=["Collaborations"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=CollaborationResponse)
def create_collaboration(
    data: CollaborationCreate,
    db: Session = Depends(get_db),
    user = Depends(role_required(["ngo","admin"]))
):
    collaboration = Collaboration(**data.dict())
    db.add(collaboration)
    db.commit()
    db.refresh(collaboration)
    return collaboration


@router.get("/", response_model=list[CollaborationResponse])
def get_collaborations(
    db: Session = Depends(get_db),
    user = Depends(role_required(["ngo","authority","admin"]))
):
    return db.query(Collaboration).all()