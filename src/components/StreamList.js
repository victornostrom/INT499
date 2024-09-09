import React, { useState } from 'react';
import './StreamList.css';

function StreamList() {
  const [input, setInput] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const updatedMovies = [...movies, input].sort((a, b) => a.localeCompare(b)); // Sort alphabetically
      setMovies(updatedMovies);
      setInput(''); // Clear input after submission
    }
  };

  const handleRemove = (movieToRemove) => {
    const updatedMovies = movies.filter(movie => movie !== movieToRemove);
    setMovies(updatedMovies);
  };

  return (
    <div className="streamlist-container">
      <h2>Stream Your Favorite Movies</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter movie title..."
        />
        <button type="submit">Add Movie</button>
      </form>

      <div className="movie-list">
        <h3>Movie List:</h3>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <span className="movie-title">{movie}</span>
              <button onClick={() => handleRemove(movie)} className="remove-btn">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StreamList;
