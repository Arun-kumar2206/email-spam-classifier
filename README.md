# Spam Email Classifier

A simple web app that detects whether an email is spam or not using machine learning.

## What it does

You paste an email text, click predict, and it tells you if it's spam or not. That's it.

## Tech Stack

- **ML Model**: Naive Bayes classifier trained on SMS spam dataset
- **Backend**: FastAPI (Python)
- **Frontend**: React + Vite

## Project Structure

```
spam-email-classifier/
├── spam_classifier.ipynb   # Jupyter notebook to train the model
├── spam.csv                # Dataset
├── backend/
│   ├── main.py             # FastAPI server
│   └── requirements.txt    # Python dependencies
└── frontend/
    └── src/
        └── App.jsx         # React app
```

## How to Run

### 1. Train the Model (if not already done)

Open `spam_classifier.ipynb` and run all cells. This will create:

- `spam_model.pkl` - the trained model
- `vectorizer.pkl` - the text vectorizer

Move both `.pkl` files to the `backend/` folder.

### 2. Start the Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will run at `http://127.0.0.1:8000`

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`)

## API Endpoint

**POST** `/predict`

Request body:

```json
{
  "text": "Congratulations! You've won a free prize..."
}
```

Response:

```json
{
  "result": "SPAM"
}
```

## Model Info

- Algorithm: Multinomial Naive Bayes
- Features: TF-IDF vectorization
- Dataset: SMS Spam Collection (5,574 messages)
- Accuracy: ~97% on test set

## Notes

- Make sure the backend is running before using the frontend
- The model files (`spam_model.pkl` and `vectorizer.pkl`) must be in the backend folder
