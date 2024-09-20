import React, { useState } from 'react';

const API_KEY = '3134058ff337c539ac9fda0112beec19';

function Movies() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results || []);
        } catch (error) {
            console.error("Error fetching the movies:", error);
        }
    };

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

            {/* Display Search Results */}
            <div className="movie-results">
                {movies && movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id} className="movie-item">
                            <h3>{movie.title}</h3>
                            <p>{movie.overview}</p>
                            <p>Release Date: {movie.release_date}</p>
                            {/* Link to the movie's TMDB page */}
                            <a
                                href={`https://www.themoviedb.org/movie/${movie.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                More Info
                            </a>
                            {movie.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>
    );
}

export default Movies;
