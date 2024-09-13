import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID to generate unique keys for each movie
import './StreamList.css'; // Import the CSS file for styling

function StreamList() {
  // State to hold the input value of the movie being typed by the user
  const [input, setInput] = useState('');

  // State to store the list of movies. Each movie will be an object with id, name, and completed status
  const [movies, setMovies] = useState([]);

  // State to track if the user is editing a movie, and if so, which movie by its id
  const [isEditing, setIsEditing] = useState(null);

  // State to hold the current value of the input field when editing a movie
  const [editInput, setEditInput] = useState('');

  // Function that handles form submission to add a movie
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload)

    // Check if the input is not empty (after trimming any spaces)
    if (input.trim()) {
      // Create a new movie object with a unique id, name from input, and 'completed' set to false
      const newMovie = { id: uuidv4(), name: input, completed: false };

      // Add the new movie to the list and sort it alphabetically by name
      const updatedMovies = [...movies, newMovie].sort((a, b) => a.name.localeCompare(b.name));

      // Update the state with the new sorted list of movies
      setMovies(updatedMovies);

      // Clear the input field for the next movie entry
      setInput('');
    }
  };

  // Function to handle removing a movie from the list
  const handleRemove = (movieToRemove) => {
    // Filter out the movie that matches the movieToRemove id
    const updatedMovies = movies.filter((movie) => movie.id !== movieToRemove.id);

    // Update the state with the new list after removal
    setMovies(updatedMovies);
  };

  // Function to handle marking a movie as completed or undoing the completion
  const handleComplete = (movieToComplete) => {
    // Toggle the 'completed' status of the movie
    const updatedMovies = movies.map((movie) =>
      movie.id === movieToComplete.id
        ? { ...movie, completed: !movie.completed } // If movie id matches, toggle 'completed'
        : movie // Else, return the movie as is
    );

    // Update the state with the new list that includes the toggled 'completed' status
    setMovies(updatedMovies);
  };

  // Function to handle when the user clicks "Edit" to start editing a movie title
  const handleEdit = (movie) => {
    // Set the id of the movie being edited
    setIsEditing(movie.id);

    // Set the current movie name into the input field for editing
    setEditInput(movie.name);
  };

  // Function to save the edited movie title
  const handleSaveEdit = (movieToEdit) => {
    // Update the movie's name in the list with the new value from editInput
    const updatedMovies = movies.map((movie) =>
      movie.id === movieToEdit.id ? { ...movie, name: editInput } : movie
    );

    // Sort the movies alphabetically by the new name and update the state
    setMovies(updatedMovies.sort((a, b) => a.name.localeCompare(b.name)));

    // Exit edit mode by setting isEditing to null
    setIsEditing(null);
  };

  return (
    <div className="streamlist-container">
      <h2>Stream Your Favorite Movies</h2>

      {/* Form for adding a new movie */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input} // Controlled input field for movie name
          onChange={(e) => setInput(e.target.value)} // Update input state as the user types
          placeholder="Enter movie title..."
        />
        <button type="submit">Add Movie</button> {/* Button to submit the movie */}
      </form>

      {/* Movie list section */}
      <div className="movie-list">
        <h3>Movie List:</h3>
        <ul>
          {/* Loop through the movies and display each one */}
          {movies.map((movie) => (
            <li key={movie.id} className={movie.completed ? 'completed' : ''}>
              {/* If the movie is being edited, show the edit input and save button */}
              {isEditing === movie.id ? (
                <>
                  <input
                    type="text"
                    value={editInput} // Controlled input field for editing the movie
                    onChange={(e) => setEditInput(e.target.value)} // Update editInput state as the user types
                  />
                  <button onClick={() => handleSaveEdit(movie)}>Save</button> {/* Button to save the edited movie */}
                </>
              ) : (
                <>
                  <span className="movie-title">{movie.name}</span> {/* Display movie name */}
                  
                  {/* Edit button to trigger the edit state */}
                  <button onClick={() => handleEdit(movie)} className="edit-btn">
                    Edit
                  </button>
                  
                  {/* Button to toggle the movie's completed status */}
                  <button onClick={() => handleComplete(movie)} className="complete-btn">
                    {movie.completed ? 'Undo' : 'Complete'}
                  </button>

                  {/* Remove button to delete the movie */}
                  <button onClick={() => handleRemove(movie)} className="remove-btn">
                    Remove
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StreamList;
