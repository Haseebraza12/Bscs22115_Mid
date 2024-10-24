function MovieList({ movies }) {
    console.log('MovieList received movies:', movies); // Debug log
  
    if (!movies || movies.length === 0) {
      return <div>No movies found</div>;
    }
  
    return (
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <h3>{movie.Title}</h3>
            <img 
              src={movie.Poster} 
              alt={movie.Title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
              }}
            />
            <p>{movie.Year}</p>
          </div>
        ))}
  
        <style jsx>{`
          .movie-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            padding: 20px;
          }
  
          .movie-card {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: center;
          }
  
          .movie-card img {
            max-width: 100%;
            height: auto;
          }
        `}</style>
      </div>
    );
  }
  
  export default MovieList;