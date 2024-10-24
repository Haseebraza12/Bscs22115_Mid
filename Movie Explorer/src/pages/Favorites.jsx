import { useTheme } from '../context/ThemeContext';
import MovieItem from '../components/movies/MovieItem';

function Favorites() {
  const { favorites } = useTheme();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorites Yet</h2>
        <p>Start adding movies to your favorites list!</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h1>Your Favorite Movies</h1>
      <div className="movies-grid">
        {favorites.map(movie => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;