import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';
import MovieList from '../components/movies/MovieList';
import SearchBar from '../components/movies/SearchBar';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // Initial load and search functionality
  const loadMovies = async (search = 'marvel', pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMovies({ 
        searchTerm: search, 
        page: pageNum 
      });
      
      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load initial movies
  useEffect(() => {
    loadMovies();
  }, []);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
    loadMovies(term, 1);
  };

  // Handle load more
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(searchTerm || 'marvel', nextPage);
  };

  return (
    <div className="home">
      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
      </div>

      <MovieList
        movies={movies}
        loading={loading}
        error={error}
        onLoadMore={handleLoadMore}
      />

      <style jsx>{`
        .home {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .search-container {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}

export default Home;