import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './MovieItem.css';

function MovieItem({ movie }) {
  const { isDarkMode, favorites, addToFavorites, removeFromFavorites } = useTheme();
  const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the favorite button
    if (isFavorite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className={`movie-item ${isDarkMode ? 'dark' : 'light'}`}>
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
          alt={movie.Title}
          className="movie-poster"
          onError={(e) => {
            e.target.src = '/placeholder.png';
          }}
        />
        <div className="movie-info">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <span className="rating">⭐ {movie.imdbRating || 'N/A'}</span>
        </div>
      </Link>
      <button
        onClick={handleFavoriteClick}
        className={`favorite-button ${isFavorite ? 'active' : ''}`}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default MovieItem;