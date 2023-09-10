import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import filterMovies from '../../utils/filterMovies';

function Movies({ movies, error, isLoading, onSave, savedMovies }) {
   // Инициализация состояний из localStorage или дефолтные значения
   const [query, setQuery] = useState(localStorage.getItem('searchQuery') || '');
   const [isChecked, setChecked] = useState(localStorage.getItem('isShortFilmChecked') === 'true');
   const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
   const [inputValue, setInputValue] = useState(localStorage.getItem('inputValue') || '');

   // Сохраняем query, isChecked и filteredMovies в localStorage при их изменении
   useEffect(() => {
      localStorage.setItem('searchQuery', query);
   }, [query]);

   useEffect(() => {
      localStorage.setItem('isShortFilmChecked', isChecked.toString());
   }, [isChecked]);

   useEffect(() => {
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
   }, [filteredMovies]);

   useEffect(() => {
      localStorage.setItem('inputValue', inputValue);
   }, [inputValue]);


   // Фильтрация фильмов на основе текущего запроса и состояния чекбокса
   useEffect(() => {
      const result = filterMovies(movies, query, isChecked);
      setFilteredMovies(result);
   }, [movies, query, isChecked]);

   // Обработчик поиска фильмов
   const handleSearchMovies = (newQuery) => {
      const lowercaseQuery = newQuery.toLowerCase();
      const searchResult = movies.filter(movie =>
         movie.nameRU.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredMovies(searchResult);
      setQuery(newQuery);  // устанавливаем запрос
   };


   // Функция для рендера контента на основе текущего состояния
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
      return <MoviesCardList
         movies={filteredMovies}
         isSavedMoviePage={false}
         onSave={onSave}
         savedMovies={savedMovies}
      />;
   };

   return (
      <section className='movies'>
         <SearchForm
            onSearch={(query) => handleSearchMovies(query)}
            isChecked={isChecked}
            setChecked={setChecked}
            initialValue={inputValue}
            onInputChange={setInputValue}
         />
         {renderContent()}
      </section>
   );
}

export default Movies;
// import React, { useState, useEffect } from 'react';
// import SearchForm from './SearchForm/SearchForm';
// import MoviesCardList from './MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';
// import { searchMovies } from '../../utils/filterMovies';  // Импорт функции из утилиты

// function Movies({ movies, error, isLoading, onSave, savedMovies }) {
//    const [query, setQuery] = useState(localStorage.getItem('searchQuery') || '');
//    const [isChecked, setChecked] = useState(localStorage.getItem('isShortFilmChecked') === 'true');
//    const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
//    const [inputValue, setInputValue] = useState(localStorage.getItem('inputValue') || '');

//    useEffect(() => {
//       localStorage.setItem('searchQuery', query);
//       localStorage.setItem('isShortFilmChecked', isChecked.toString());
//       localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
//       localStorage.setItem('inputValue', inputValue);
//    }, [query, isChecked, filteredMovies, inputValue]);

//    // Фильтрация фильмов на основе текущего запроса и состояния чекбокса
//    useEffect(() => {
//       const result = searchMovies(movies, query, isChecked);
//       setFilteredMovies(result);
//    }, [movies, query, isChecked]);

//    // Обработчик поиска фильмов
//    const handleSearchMovies = (newQuery) => {
//       setQuery(newQuery);
//    };

//    // Функция для рендера контента на основе текущего состояния
//    const renderContent = () => {
//       if (isLoading) {
//          return <Preloader />;
//       }
//       if (error) {
//          return <p>{error}</p>;
//       }
//       if (filteredMovies.length === 0) {
//          return <p>Ничего не найдено</p>;
//       }
//       return <MoviesCardList
//          movies={filteredMovies}
//          isSavedMoviePage={false}
//          onSave={onSave}
//          savedMovies={savedMovies}
//       />;
//    };

//    return (
//       <section className='movies'>
//          <SearchForm
//             onSearch={(query) => handleSearchMovies(query)}
//             isChecked={isChecked}
//             setChecked={setChecked}
//             initialValue={inputValue}
//          />
//          {renderContent()}
//       </section>
//    );
// }

// export default Movies;
