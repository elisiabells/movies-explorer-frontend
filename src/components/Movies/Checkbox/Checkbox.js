import React from 'react';

function Checkbox({ isChecked, setChecked }) {
   return (
      <div className='search-form__toggle'>
         <input
            id='shortFilmToggle'
            type='checkbox'
            checked={isChecked}
            onChange={() => setChecked(!isChecked)}
         />
         <label htmlFor='shortFilmToggle' className='search-form__checkbox-title'> Короткометражки </label>
      </div>
   )
}

export default Checkbox;