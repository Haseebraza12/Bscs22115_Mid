import axios from 'axios';

const API_KEY = 'YOUR_TMDB_API_KEY'; // Get this from themoviedb.org
const BASE_URL = 'https://api.themoviedb.org/3';

// Function to fetch movies list
export const fetchMovies = async ({ page = 1, query = '', genre = '' }) => {
  try {
    const endpoint = query
      ? '/search/movie'
      : '/movie/popular';
    
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page,
        query: query || undefined,
        with_genres: genre || undefined,
      }
    });
    
    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
      page: response.data.page,
    };
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};

// Function to fetch movie details
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
};