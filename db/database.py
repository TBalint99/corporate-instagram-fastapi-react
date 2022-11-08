from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import cloudinary

cloudinary.config(
    cloud_name="next-drinks",
    api_key="989878735844422",
    api_secret="rvIiw2yj5b7gDef90PllO8tz4B4"
)

SQLALCHEMY_DATABASE_URL = 'sqlite:///./intagram_api.db'
 
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
 
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
 
Base = declarative_base()
 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()