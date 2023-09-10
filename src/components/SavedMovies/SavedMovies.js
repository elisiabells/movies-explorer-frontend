import React, { useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MovieCard from '../Movies/MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import filterMovies from '../../utils/filterMovies';

function SavedMovies({ savedMovies, onDelete, isLoading, error }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);

  const handleSearch = (query) => {
    setCurrentQuery(query);
    const result = filterMovies(savedMovies, query, isShortMovies);
    setFilteredMovies(result);
  };

  const handleCheckboxChange = (checked) => {
    setIsShortMovies(checked);
    const result = filterMovies(savedMovies, currentQuery, checked);
    setFilteredMovies(result);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Preloader />;
    }
    if (error) {
      return <p>{error}</p>;
    }
    if (filteredMovies.length === 0) {
      return <p>Ничего не найдено</p>;
    }
    return (
      <div className="movies-card-list__container">
        {filteredMovies.map(movie => (
          <MovieCard
            key={movie._id}
            movie={movie}
            isSavedMoviePage={true}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  };

  return (
    <div className='saved-movies'>
      <SearchForm
        onSearch={handleSearch}
        isChecked={isShortMovies}
        setChecked={handleCheckboxChange}
      />
      {renderContent()}
    </div>
  );
}

export default SavedMovies;