import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
import { useTheme } from '../context/ThemeContext';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addToFavorites, removeFromFavorites } = useTheme();

  const isFavorite = favorites.some(fav => fav.id === Number(id));

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
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
    <div className="movie-details">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
      
      <div className="movie-details-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="release-date">
            Released: {new Date(movie.release_date).toLocaleDateString()}
          </p>
          <p className="rating">Rating: ⭐ {movie.vote_average}</p>
          <p className="overview">{movie.overview}</p>
          
          <div className="genres">
            {movie.genres.map(genre => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <button
            onClick={() => isFavorite 
              ? removeFromFavorites(movie.id)
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