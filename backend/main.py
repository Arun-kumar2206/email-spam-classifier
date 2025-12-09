from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle

model = pickle.load(open("spam_model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    text: str

def clean_text(text):
    text = text.lower()
    import re
    text = re.sub(r'[^a-zA-Z]', ' ', text)
    return text


@app.get("/")
def home():
    return {"message": "Spam Classifier API is running!"}

@app.post("/predict")
def predict(req: EmailRequest):
    cleaned = clean_text(req.text)
    vector = vectorizer.transform([cleaned])
    prediction = model.predict(vector)[0]
    return {"result": "SPAM" if prediction == 1 else "NOT SPAM"}