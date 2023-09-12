import React, { useEffect, useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
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

  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies])

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
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
        isSavedMoviePage={true}
        savedMovies={savedMovies}
      />
    );
  };

  return (
    <section className='saved-movies'>
      <SearchForm
        onSearch={handleSearch}
        isChecked={isShortMovies}
        setChecked={handleCheckboxChange}
      />
      {renderContent()}
    </section>
  );
}

export default SavedMovies;