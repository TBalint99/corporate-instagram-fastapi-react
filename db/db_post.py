from fastapi import HTTPException, status
from db.schemas import PostBase
from sqlalchemy.orm.session import Session
from db.models import DbPost
from datetime import datetime

def create(db: Session, request: PostBase):
    new_post = DbPost(
        image_url = request.image_url,
        image_url_type = request.image_url_type,
        caption = request.caption,
        timestamp = datetime.now(),
        user_id = request.creator_id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post

def get_all(db: Session):
    return db.query(DbPost).all()

def get_my_posts(db: Session, id: int):
    return db.query(DbPost).filter(DbPost.user_id == id).all()

def delete_post(db: Session, post_id: int, user_id: int):
    post = db.query(DbPost).filter(DbPost.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Post with id: {post_id} not found'
        )
    if post.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f'Only the creator can delete this post'
        )
    db.delete(post)
    db.commit()
    return "Post successfully deleted"

def update_post(db: Session, post_id: int, user_id: int, request: PostBase):
    post = db.query(DbPost).filter(DbPost.id == post_id)
    if not post.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Post with id: {post_id} not found'
        )
    if post.first().user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f'Only the creator can update this post'
        )
    post.update({
        DbPost.image_url: request.image_url,
        DbPost.image_url_type: request.image_url_type,
        DbPost.caption: request.caption,
        DbPost.timestamp: datetime.now()
    })
    db.commit()
    return "Post successfully updated"
