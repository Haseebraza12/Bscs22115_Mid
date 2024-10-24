import axios from 'axios';

const API_KEY = '1cf1f83d';
const BASE_URL = 'http://www.omdbapi.com';

// Function to fetch movies list
export const fetchMovies = async ({ searchTerm = '', page = 1 }) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: searchTerm || 'marvel', // default search if no term provided
        page: page,
        type: 'movie'
      }
    });
    
    if (response.data.Response === "True") {
      return {
        results: response.data.Search,
        total_pages: Math.ceil(Number(response.data.totalResults) / 10),
        page: page,
      };
    } else {
      throw new Error(response.data.Error);
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch movies');
  }
};

// Function to fetch movie details
export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full'
      }
    });
    
    if (response.data.Response === "True") {
      return response.data;
    } else {
      throw new Error(response.data.Error);
    }
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
};