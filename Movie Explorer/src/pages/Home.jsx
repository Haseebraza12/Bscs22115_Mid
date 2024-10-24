import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api'; // Updated path
import SearchBar from '../components/movies/SearchBar';
import MovieList from '../components/movies/MovieList';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('guardians');

  const searchMovies = async (searchTerm = 'guardians', pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMovies({ searchTerm, page: pageNum });
      
      if (pageNum === 1) {
        setMovies(data.results);
        setCurrentSearchTerm(searchTerm);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      
      setTotalResults(data.totalResults);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies();
  }, []);

  const loadMore = () => {
    if (!loading) {
      searchMovies(currentSearchTerm, page + 1);
    }
  };

  return (
    <div className="home">
      <SearchBar onSearch={(term) => searchMovies(term, 1)} />
      <MovieList 
        movies={movies} 
        loading={loading} 
        error={error}
        onLoadMore={loadMore}
        hasMore={movies.length < totalResults}
      />
    </div>
  );
}

export default Home;