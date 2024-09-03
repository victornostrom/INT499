import React, { useState } from 'react';
import './StreamList.css';

function StreamList() {
  const [input, setInput] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const updatedMovies = [...movies, input].sort((a, b) => a.localeCompare(b));
      setMovies(updatedMovies);
    }
    setInput('');
  };

  const handleRemove = (movieToRemove) => {
    const updatedMovies = movies.filter(movie => movie !== movieToRemove);
    setMovies(updatedMovies);
  };

  return (
    <div className="streamlist-container">
      <h2>Welcome to StreamList</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your favorite stream..."
        />
        <button type="submit">Submit</button>
      </form>

      <div className="movie-list">
        <h3>Your Movies:</h3>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              {movie}
              <button onClick={() => handleRemove(movie)} className="remove-btn">Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StreamList;
