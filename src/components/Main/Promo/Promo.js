import React from 'react';
import cover_logo from '../../../images/cover_logo.svg';
import NavTab from '../NavTab/NavTab';

function Promo() {
   return (
      <section className='promo'>
         <div className='promo__cover-container'>
            <img src={cover_logo} alt='Обложка' className='promo__cover-logo' />
            <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
         </div>
         <NavTab />
      </section>
   );
}

export default Promo;