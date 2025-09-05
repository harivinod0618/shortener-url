import React, { useState } from "react";

export default function LinkForm({ onShorten }) {
  const [url, setUrl] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onShorten(url, timeLimit);
    setUrl("");
    setTimeLimit("");
  };

  return (
    <form onSubmit={handleSubmit} className="link-form">
      <h2 className="form-title">🔗 URL Shortener</h2>
      <input
        type="url"
        placeholder="Enter a long URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="form-input"
      />
      <input
        type="number"
        placeholder="Expiry time (minutes)"
        value={timeLimit}
        onChange={(e) => setTimeLimit(e.target.value)}
        required
        className="form-input"
      />
      <button type="submit" className="form-button">
        Generate Short Link
      </button>
    </form>
  );
}
