// src/components/GenreFilter.js
import React from 'react';

const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  return (
    <select
      value={selectedGenre}
      onChange={(e) => onGenreChange(e.target.value)}
      className="p-2 bg-gray-700 bg-opacity-60 backdrop-blur-md text-white border rounded"
    >
      <option value="">All Genres</option>
      <option value="Action">Action</option>
      <option value="Adventure">Adventure</option>
      <option value="Comedy">Comedy</option>
      <option value="Drama">Drama</option>
      <option value="Sci-Fi">Sci-Fi</option>
      <option value="Fantasy">Fantasy</option>
    </select>
  );
};

export default GenreFilter;
