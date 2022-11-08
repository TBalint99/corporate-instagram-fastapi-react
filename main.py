from fastapi import FastAPI
from db import models
from db.database import engine
from routers import user, post, comment, like
from auth import authentication
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# enable React frontend via CORS
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(user.router)
app.include_router(post.router)
app.include_router(comment.router)
app.include_router(like.router)
app.include_router(authentication.router)

@app.get("/")
def root():
    return "Hello world"

models.Base.metadata.create_all(engine)