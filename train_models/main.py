from fastapi import FastAPI
import api.train as train

app = FastAPI()

app.include_router(train.router)

@app.get('/')
def root_api():
    return {"message": "Welcome to AI Training"}