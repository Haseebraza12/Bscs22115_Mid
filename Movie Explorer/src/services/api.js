import axios from 'axios';

const API_KEY = '1cf1f83d';
const BASE_URL = 'https://www.omdbapi.com'; // Changed to https

export const fetchMovies = async ({ searchTerm = '', page = 1 }) => {
  try {
    console.log('Fetching movies with search term:', searchTerm); // Debug log
    
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: searchTerm || 'guardians', // Changed default search
        page: page,
        type: 'movie'
      }
    });
    
    console.log('API Response:', response.data); // Debug log
    
    if (response.data.Response === "True") {
      return {
        results: response.data.Search,
        totalResults: Number(response.data.totalResults),
        page: page,
      };
    } else {
      throw new Error(response.data.Error);
    }
  } catch (error) {
    console.error('API Error:', error); // Debug log
    throw new Error(error.message || 'Failed to fetch movies');
  }
};

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