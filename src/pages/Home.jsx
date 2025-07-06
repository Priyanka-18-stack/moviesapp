import React, { useState, useEffect } from 'react';
import Moviescard from '../components/Moviescard';

const MOVIES_PER_PAGE = 8;

const Home = ({ watchlist, addToWatchlist, removeFromWatchlist }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchMovieDetails = async (imdbID) => {
    const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=525c0cbf`);
    const data = await res.json();
    return data;
  };

  const fetchMoviesBySearch = async (searchTerm) => {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=525c0cbf`
    );
    const data = await res.json();

    if (data.Response === 'True') {
      const detailedMovies = await Promise.all(
        data.Search.map((movie) => fetchMovieDetails(movie.imdbID))
      );
      return detailedMovies;
    }
    return [];
  };

  const fetchDefaultMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const [avengers, pirates] = await Promise.all([
        fetchMoviesBySearch('avengers'),
        fetchMoviesBySearch('pirates'),
      ]);
      setMovies([...avengers, ...pirates]);
      setPage(1);
    } catch {
      setError('Failed to fetch default movies');
      setMovies([]);
    }
    setLoading(false);
  };

  const fetchMovies = async (searchTerm) => {
    setLoading(true);
    setError(null);

    if (!searchTerm.trim()) {
      await fetchDefaultMovies();
      setLoading(false);
      return;
    }

    try {
      const results = await fetchMoviesBySearch(searchTerm);
      setMovies(results);
      setPage(1);
    } catch {
      setError('Failed to fetch movies');
      setMovies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(query);
  };

  // Client-side pagination logic
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const currentMovies = movies.slice(startIndex, startIndex + MOVIES_PER_PAGE);
  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);

  return (
    <div className="p-4 pt-20 min-h-screen bg-gray-900">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="fixed top-16 left-1/2 transform -translate-x-1/2 z-10 w-3/4 md:w-1/2 flex gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="p-2 flex-grow border rounded border-gray-700 bg-gray-600 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Loading & Error Messages */}
      {loading && <p className="text-white text-center mt-6">Loading...</p>}
      {error && <p className="text-red-500 text-center mt-6">{error}</p>}

      {/* Movie Cards */}
      <div className="movies-container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
        {currentMovies.map((movie) => (
          <Moviescard
            key={movie.imdbID}
            movie={movie}
            isInWatchlist={watchlist.some((m) => m.imdbID === movie.imdbID)}
            addToWatchlist={addToWatchlist}
            removeFromWatchlist={removeFromWatchlist}
          />
        ))}
      </div>

      {/* Pagination Buttons */}
      {movies.length > MOVIES_PER_PAGE && (
        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${
              page === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ${
              page === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
