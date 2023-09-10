import React, { useState } from 'react';
import searchIcon from '../../../images/search.svg';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm({ onSearch, isChecked, setChecked, initialValue, onInputChange }) {
   // Состояние для значения поля ввода и для ошибок
   const [inputValue, setInputValue] = useState(initialValue || '');
   const [error, setError] = useState(null);

   // Обработчик отправки формы
   const handleSubmit = (event) => {
      event.preventDefault();

      // Проверка на пустое или состоящее только из пробелов значение
      if (!inputValue.trim()) {
         setError('Нужно ввести ключевое слово');
         return;
      }
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
                  onChange={(e) => {
                     setInputValue(e.target.value);
                     onInputChange(e.target.value);
                  }}
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