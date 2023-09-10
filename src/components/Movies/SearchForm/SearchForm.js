import React, { useState } from 'react';
import searchIcon from '../../../images/search.svg';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm({ onSearch, isChecked, setChecked, initialValue, onInputChange }) {
   const [inputValue, setInputValue] = useState(initialValue || ''); // Состояние инпута
   const [error, setError] = useState(null);

   // Обработчик изменения значения инпута
   const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
      // Вызываем дополнительную функцию, если она передана
      onInputChange && onInputChange(value);
   };

   // Обработчик отправки формы поиска
   const handleSubmit = (event) => {
      event.preventDefault();

      if (!inputValue.trim()) {
         setError('Нужно ввести ключевое слово');
         return;
      }
      // Если нет ошибки, сбрасываем ошибку и выполняем поиск
      setError(null);
      onSearch(inputValue);
   };

   return (
      <div className='search-form'>
         <div className='search-form__container'>
            <form className='search-form__content' onSubmit={handleSubmit}>
               <img src={searchIcon} alt='Лупа' className='search-form__icon' />
               <input
                  type='text'
                  placeholder='Фильм'
                  className='search-form__input'
                  value={inputValue}
                  onChange={handleInputChange}
               />
               <button type='submit' className='search-form__button'>Найти</button>
            </form>
            <Checkbox isChecked={isChecked} setChecked={setChecked} />
         </div>
         {error && <p className='search-form__error'>{error}</p>}
      </div>
   );
}

export default SearchForm;