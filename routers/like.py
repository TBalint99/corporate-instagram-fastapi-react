from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.schemas import LikeBase
from db import db_like
from db.schemas import UserAuth
from auth.oauth import get_current_user

router = APIRouter(
    prefix='/like',
    tags=['like']
)

@router.post('/like')
def like(request: LikeBase, db: Session = Depends(get_db), current_user: UserAuth = Depends(get_current_user)):
    return db_like.like(db, request)

@router.delete('/dislike')
def dislike(request: LikeBase, db: Session = Depends(get_db), current_user: UserAuth = Depends(get_current_user)):
    return db_like.dislike(db, request)

@router.get('/all_likes/{post_id}')
def get_likes(post_id: int, db: Session = Depends(get_db)):
    return db_like.get_all_likes(db, post_id)