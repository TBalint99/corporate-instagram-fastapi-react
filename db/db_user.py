from fastapi import HTTPException, status
from sqlalchemy.orm.session import Session
from db.models import DbUser
from db.schemas import UserBase
from db.hash import Hash

def create_user(db: Session, request: UserBase):
    user = db.query(DbUser).filter(DbUser.username == request.username).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'User already exist'
        )
    new_user = DbUser(
        username = request.username,
        email = request.email,
        password = Hash.bcrypt(request.password),
        image_url = request.image_url
    )

    db.add(new_user)
    db.commit() # this sends the data to the database
    db.refresh(new_user)

    return new_user

def get_user_by_username(db: Session, username: str):
    user = db.query(DbUser).filter(DbUser.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'User with that username: {username} does not exist'
        )
    return user

