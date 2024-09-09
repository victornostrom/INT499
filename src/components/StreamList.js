import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID to generate unique keys
import './StreamList.css';

function StreamList() {
  // Input field state for the movie name
  const [input, setInput] = useState('');
  
  // State to store the list of movies
  const [movies, setMovies] = useState([]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (input.trim()) { // Check if input is not just whitespace
      // Create a new movie object with a unique ID using UUID
      const newMovie = { id: uuidv4(), name: input };
      
      // Update the movie list with the new movie, sorted alphabetically by name
      const updatedMovies = [...movies, newMovie].sort((a, b) => a.name.localeCompare(b.name));
      
      setMovies(updatedMovies); // Set the updated movie list
      setInput(''); // Clear the input field after submission
    }
  };

  // Function to handle removing a movie
  const handleRemove = (movieToRemove) => {
    // Filter the movie list to remove the selected movie by its unique ID
    const updatedMovies = movies.filter(movie => movie.id !== movieToRemove.id);
    setMovies(updatedMovies); // Set the updated movie list
  };

  return (
    <div className="streamlist-container">
      {/* Heading for the page */}
      <h2>Stream Your Favorite Movies</h2>

      {/* Form for adding movies */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input} // Binds input state to the input field
          onChange={(e) => setInput(e.target.value)} // Update input state on change
          placeholder="Enter movie title..."
        />
        <button type="submit">Add Movie</button> {/* Submit button */}
      </form>

      {/* Displaying the list of movies */}
      <div className="movie-list">
        <h3>Movie List:</h3>
        <ul>
          {/* Loop through movies and display each as a list item */}
          {movies.map((movie) => (
            <li key={movie.id}> {/* Use unique UUID as the key */}
              <span className="movie-title">{movie.name}</span>
              {/* Button to remove the movie */}
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
