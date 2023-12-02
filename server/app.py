# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from presentation_router import presentation_router
from exports_router import exports_router

app = FastAPI(title= "Music Sales analysis API",description='Business Intelligence Project')

origins = ["http://localhost:3000", "http://localhost:5173" ]

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


app.include_router(presentation_router, prefix='/api/v1/music-sales-data', tags=['Music sales'])
app.include_router(exports_router, prefix='/api/v1/exports', tags=['Exports'])
