# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI(title= "Music Sales analysis API",description='Business Intelligence Project')

origins = ["http://localhost:3000"]

# Add the CORS middleware to the FastAPI app.
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Service up"}


app.include_router(router, prefix='/api/v1/music-sales-data', tags=['Music sales'])

