import axios from 'axios';

// Base configuration
const tmdbApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for logging (optional)
tmdbApi.interceptors.request.use(
  (config) => {
    console.log(`TMDB API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('TMDB API: Unauthorized - Check your token');
    } else if (error.response?.status === 429) {
      console.error('TMDB API: Rate limit exceeded');
    }
    return Promise.reject(error);
  }
);

// Image URL helper
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-movie.jpg'; // Fallback image
  return `${import.meta.env.VITE_TMDB_IMAGE_URL}/${size}${path}`;
};

// API Endpoints
export const tmdbService = {
  // 🏠 HOME PAGE SECTIONS
  
  // Get trending movies/shows (day or week)
  getTrending: (timeWindow = 'week', page = 1) => 
    tmdbApi.get(`/trending/all/${timeWindow}?page=${page}`),
  
  // Get popular movies
  getPopularMovies: (page = 1) => 
    tmdbApi.get(`/movie/popular?page=${page}`),
  
  // Get popular TV shows
  getPopularTV: (page = 1) => 
    tmdbApi.get(`/tv/popular?page=${page}`),
  
  // Get top rated
  getTopRated: (type = 'movie', page = 1) => 
    tmdbApi.get(`/${type}/top_rated?page=${page}`),
  
  // Get upcoming movies
  getUpcoming: (page = 1) => 
    tmdbApi.get(`/movie/upcoming?page=${page}`),
  
  // Now playing in theaters
  getNowPlaying: (page = 1) => 
    tmdbApi.get(`/movie/now_playing?page=${page}`),

  // 🎬 MOVIE DETAILS
  
  // Get full movie details + videos + credits
  getMovieDetails: (movieId) => 
    tmdbApi.get(`/movie/${movieId}?append_to_response=videos,credits,similar`),
  
  // Get TV show details
  getTVDetails: (tvId) => 
    tmdbApi.get(`/tv/${tvId}?append_to_response=videos,credits,similar`),
  
  // Get trailer specifically
  getTrailer: (movieId, type = 'movie') => 
    tmdbApi.get(`/${type}/${movieId}/videos`),

  // 🔍 SEARCH
  
  // Search movies, TV shows, people
  searchMulti: (query, page = 1) => 
    tmdbApi.get(`/search/multi?query=${encodeURIComponent(query)}&page=${page}`),
  
  // Search only movies
  searchMovies: (query, page = 1) => 
    tmdbApi.get(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`),
  
  // Search only TV
  searchTV: (query, page = 1) => 
    tmdbApi.get(`/search/tv?query=${encodeURIComponent(query)}&page=${page}`),
  
  // Search people
  searchPeople: (query, page = 1) => 
    tmdbApi.get(`/search/person?query=${encodeURIComponent(query)}&page=${page}`),

  // 👤 PEOPLE
  
  // Get person details + movie credits
  getPersonDetails: (personId) => 
    tmdbApi.get(`/person/${personId}?append_to_response=movie_credits,tv_credits`),
  
  // Get popular people
  getPopularPeople: (page = 1) => 
    tmdbApi.get(`/person/popular?page=${page}`),

  // 🎭 DISCOVER & FILTERS
  
  // Discover movies by genre, year, etc.
  discoverMovies: (params = {}) => {
    const queryParams = new URLSearchParams({
      page: params.page || 1,
      ...(params.genre && { with_genres: params.genre }),
      ...(params.year && { primary_release_year: params.year }),
      ...(params.sortBy && { sort_by: params.sortBy }),
    });
    return tmdbApi.get(`/discover/movie?${queryParams}`);
  },
  
  // Get genre list
  getGenres: (type = 'movie') => 
    tmdbApi.get(`/genre/${type}/list`),
};

export default tmdbApi;