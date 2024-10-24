import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

function MovieItem({ movie }) {
  const { favorites, addToFavorites, removeFromFavorites } = useTheme();
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-item">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{new Date(movie.release_date).getFullYear()}</p>
          <span className="rating">⭐ {movie.vote_average}</span>
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