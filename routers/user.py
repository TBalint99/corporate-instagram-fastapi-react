from fastapi import APIRouter, Depends
from db.schemas import UserBase, UserDisplay
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_user

router = APIRouter(
    prefix='/user',
    tags=['user']
)

# Create a user
@router.post('/sign_up', response_model=UserDisplay)
def create_use(request: UserBase, db: Session = Depends(get_db)):
    return db_user.create_user(db, request)

# Get a user by username
@router.get('/{username}', response_model=UserDisplay)
def get_user_by_username(username: str, db: Session = Depends(get_db)):
    return db_user.get_user_by_username(db, username)
