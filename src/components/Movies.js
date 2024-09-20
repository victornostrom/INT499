import React, { useState, useEffect } from 'react';

const API_KEY = 'YOUR_TMDB_API_KEY';  // Replace with your TMDB API key

function Movies() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState(() => {
        // Initialize movies state from localStorage, if available
        const savedMovies = localStorage.getItem('movies');
        return savedMovies ? JSON.parse(savedMovies) : [];
    });
    const [error, setError] = useState('');

    // Function to search movies
    const searchMovies = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;  // Do nothing if the search query is empty

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.results) {
                setMovies(data.results);  // Set movies to state
                localStorage.setItem('movies', JSON.stringify(data.results));  // Save results to localStorage
                setError('');  // Clear any previous error message
            } else {
                setMovies([]);
                localStorage.removeItem('movies');  // Clear localStorage if no movies are found
                setError('No movies found.');
            }
        } catch (error) {
            console.error("Error fetching the movies:", error);
            setError('Error fetching movie data.');
        }
    };

    // Clear localStorage when query changes (Optional)
    useEffect(() => {
        if (!query) {
            localStorage.removeItem('movies');  // Remove saved data if search query is cleared
        }
    }, [query]);

    return (
        <div>
            <h2>Movies Page</h2>

            {/* Movie Search Form */}
            <form onSubmit={searchMovies}>
                <input
                    type="text"
                    placeholder="Search for a movie"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {/* Display Errors */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display Search Results */}
            <div className="movie-results">
                {movies && movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p>{movie.overview}</p>
                            <p>Release Date: {movie.release_date}</p>
                        </div>
                    ))
                ) : (
                    !error && <p>No movies found</p>
                )}
            </div>
        </div>
    );
}

export default Movies;
