import MovieItem from './MovieItem';
import './MovieList.css';

function MovieList({ movies, loading, error }) {
  if (loading) {
    return <div className="movie-list-message">Loading...</div>;
  }

  if (error) {
    return <div className="movie-list-message error">{error}</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className="movie-list-message">No movies found</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;