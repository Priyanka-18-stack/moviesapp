// src/pages/Watchlist.js
import React, { useState } from 'react';
import GenreFilter from '../components/GenreFilter';

const Watchlist = ({ watchlist = [], removeFromWatchlist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Filtering logic based on title and genre
  const filteredMovies = watchlist.filter((movie) => {
    const matchesTitle = movie.Title.toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesGenre = selectedGenre
      ? movie.Genre?.toLowerCase().includes(selectedGenre.toLowerCase())
      : true;
    return matchesTitle && matchesGenre;
  });

  return (
    <div className="p-4 pt-20 min-h-screen bg-gray-900">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-600 bg-opacity-60 text-white backdrop-blur-md fixed top-16 left-1/2 transform -translate-x-1/2 z-10"
      />

      {/* Genre filter */}
      <div className="mt-24 flex justify-center">
        <GenreFilter selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
      </div>

      {/* Movie grid */}
      <div className="movies-container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredMovies.length === 0 ? (
          <p className="text-white text-center col-span-full mt-10">
            No movies found in your watchlist.
          </p>
        ) : (
          filteredMovies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-gray-800 p-4 rounded-lg shadow-md text-white relative"
            >
              <img
                src={
                  movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={movie.Title}
                className="w-full h-80 object-contain rounded-sm"
              />
              <h3 className="text-lg font-bold mt-4">{movie.Title}</h3>
              <p className="text-sm text-gray-400">{movie.Year}</p>
              <p className="text-xs text-gray-500 italic mt-1">{movie.Genre}</p>

              <button
                onClick={() => removeFromWatchlist(movie.imdbID)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 rounded px-2 py-1 text-sm"
                aria-label={`Remove ${movie.Title} from watchlist`}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;
