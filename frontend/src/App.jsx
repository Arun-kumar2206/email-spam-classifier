import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handlePredict = async () => {
    const res = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif" }}>
      <h1>Spam Email Classifier</h1>

      <textarea 
        placeholder="Enter email text here..."
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <button 
        onClick={handlePredict}
        style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}>
        Predict
      </button>

      {result && (
        <h2 style={{ marginTop: 20 }}>
          Prediction: <span>{result}</span>
        </h2>
      )}
    </div>
  );
}

export default App;
