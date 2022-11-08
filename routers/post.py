from typing import List
from fastapi import APIRouter, Depends, File, UploadFile, status
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from db.schemas import PostBase, PostDisplay
from db import db_post
import cloudinary
from cloudinary import uploader
from db.schemas import UserAuth
from auth.oauth import get_current_user

router = APIRouter(
    prefix='/post',
    tags=['post']
)

image_url_types = ['absolute', 'relative']

@router.post('/create', response_model=PostDisplay)
def create(request: PostBase, db: Session = Depends(get_db), current_user: UserAuth = Depends(get_current_user)):
    if not request.image_url_type in image_url_types:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Parameter image_url_type can only take value of 'absolute' or 'relative'.")
    return db_post.create(db, request)

@router.get('/all', response_model=List[PostDisplay])
def get_all_posts(db: Session = Depends(get_db)):
    return db_post.get_all(db)

@router.get('/{user_id}', response_model=List[PostDisplay])
def get_my_posts(user_id: int, db: Session = Depends(get_db)):
    return db_post.get_my_posts(db, user_id)


@router.post('/upload_image')
def upload_image(image: UploadFile = File(...), current_user: UserAuth = Depends(get_current_user)):
    # upload to cludinary
    result = uploader.upload(image.file)
    url = result.get("url")
    return {
        'filename': url
    }

@router.put('/update/{post_id}')
def update_post(post_id: int, request: PostBase, db: Session = Depends(get_db), current_user: UserAuth = Depends(get_current_user)):
    return db_post.update_post(db, post_id, current_user.id, request)

@router.delete('/delete/{post_id}')
def delete_post(post_id: int, db: Session = Depends(get_db), current_user: UserAuth = Depends(get_current_user)):
    return db_post.delete_post(db, post_id, current_user.id)
