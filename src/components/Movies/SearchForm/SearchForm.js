import React, { useState } from 'react';
import searchIcon from '../../../images/search.svg';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm() {
   const [isChecked, setChecked] = useState(false);

   return (
      <div className='search-form__line'>
         <div className='search-form__container'>
            <form className='search-form'>
               <img src={searchIcon} alt='Лупа' className='search-form__icon' />
               <input
                  type='text'
                  placeholder='Фильм'
                  className='search-form__input'
               />
               <button type='submit' className='search-form__button'>Найти</button>
            </form>
            <Checkbox isChecked={isChecked} setChecked={setChecked} />
         </div>
      </div>
   );
}

export default SearchForm;