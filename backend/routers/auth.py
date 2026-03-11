from fastapi import APIRouter, HTTPException,Body, Depends,status
from sqlalchemy import text
from database import SessionLocal
from models import UserRegister, UserLogin
from security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
def register(user: UserRegister):
    db = SessionLocal()
    try:
        existing = db.execute(
            text("SELECT id FROM users WHERE email = :e"),
            {"e": user.email}
        ).fetchone()

        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")

        db.execute(
            text("""
                INSERT INTO users (name, email, password, role, location)
                VALUES (:n, :e, :p, :r, :l)
            """),
            {
                "n": user.name,
                "e": user.email,
                "p": hash_password(user.password),
                "r": user.role,
                "l": user.location
            }
        )
        db.commit()
        return {"message": "User registered successfully"}
    finally:
        db.close()

@router.post("/login")
def login(user: UserLogin):
    db = SessionLocal()
    try:
        db_user = db.execute(
            text("SELECT email, password, role FROM users WHERE email = :e"),
            {"e": user.email}
        ).fetchone()

        if not db_user or not verify_password(user.password, db_user.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = create_access_token({
            "sub": db_user.email,
            "role": db_user.role
        })

        return {
    "access_token": token,
    "token_type": "bearer",
    "role": db_user.role}
    finally:
        db.close()

from fastapi import Depends
from security import get_current_user

@router.get("/me")
def my_profile(current_user = Depends(get_current_user)):
    return {
        "message": "Authenticated user",
        "user": current_user
    }

from fastapi import Depends, HTTPException, status
from security import get_current_user

def require_role(allowed_roles: list):
    def role_checker(current_user = Depends(get_current_user)):
        if current_user["role"] not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not authorized"
            )
        return current_user
    return role_checker