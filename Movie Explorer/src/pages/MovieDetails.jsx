import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api'; // Fixed path
import { useTheme } from '../context/ThemeContext'; // Fixed path
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode, favorites, addToFavorites, removeFromFavorites } = useTheme();

  const isFavorite = favorites.some(fav => fav.imdbID === id);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className={`movie-details ${isDarkMode ? 'dark' : 'light'}`}>
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
      
      <div className="movie-details-content">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
          alt={movie.Title}
          className="movie-poster"
        />
        
        <div className="movie-info">
          <h1>{movie.Title}</h1>
          <p className="release-date">Released: {movie.Released}</p>
          <p className="rating">Rating: ⭐ {movie.imdbRating}</p>
          <p className="runtime">Runtime: {movie.Runtime}</p>
          <p className="genre">Genre: {movie.Genre}</p>
          <p className="plot">{movie.Plot}</p>
          <p className="actors">Actors: {movie.Actors}</p>
          <p className="director">Director: {movie.Director}</p>
          
          <button
            onClick={() => isFavorite 
              ? removeFromFavorites(movie.imdbID)
              : addToFavorites(movie)
            }
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;