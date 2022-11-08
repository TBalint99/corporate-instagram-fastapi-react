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