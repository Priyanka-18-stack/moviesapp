import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Moviescard = ({ movie, isInWatchlist, addToWatchlist, removeFromWatchlist }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white relative">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
        alt={movie.Title}
        className="w-full h-80 object-contain rounded-sm"
      />
      <h3 className="text-lg font-bold mt-4">{movie.Title}</h3>
      <p className="text-sm text-gray-400">{movie.Year}</p>
      <button
        aria-pressed={isInWatchlist}
        onClick={() =>
          isInWatchlist ? removeFromWatchlist(movie.imdbID) : addToWatchlist(movie)
        }
        className="absolute top-2 right-2 text-red-500 text-xl"
      >
        {isInWatchlist ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default Moviescard;
