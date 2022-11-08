from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from db.models import DbLike
from db.schemas import LikeBase

def like(db: Session, request: LikeBase):
    like = db.query(DbLike).filter(DbLike.username == request.username).first()
    if not like: 
        new_like = DbLike(
            username = request.username,
            post_id = request.post_id,
            timestamp = datetime.now()
        )
        db.add(new_like)
        db.commit()
        db.refresh(new_like)
        return new_like
    else:
        return 'Already liked'

def dislike(db: Session, request: LikeBase):
    like = db.query(DbLike).filter(DbLike.username == request.username).first()
    if not like:
        return 'You have hot liked this post yet.'
    db.delete(like)
    db.commit()
    return "Successfully disliked!"

# Get all likes that belong to the post
def get_all_likes(db: Session, post_id: int):
    return db.query(DbLike).filter(DbLike.id == post_id).all()
