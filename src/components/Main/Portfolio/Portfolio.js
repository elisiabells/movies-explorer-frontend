import React from 'react';
import { Link } from 'react-router-dom';

function Portfolio() {
   return (
      <section className='portfolio'>
         <h2 className='portfolio__title'>Портфолио</h2>
         <ul className='portfolio__block'>
            <li className='portfolio__list'>
               <Link to='https://github.com/elisiabells/how-to-learn' className='portfolio__link' target='_blank' rel='noreferrer'>
                  Статичный сайт
                  <p className='portfolio__link-arrow'>&#8599;</p>
               </Link>
            </li>
            <li className='portfolio__list'>
               <Link to='https://elisiabells.github.io/russian-travel/' className='portfolio__link' target='_blank' rel='noreferrer'>
                  Адаптивный сайт
                  <p className='portfolio__link-arrow'>&#8599;</p>
               </Link>
            </li>
            <li className='portfolio__list'>
               <Link to='https://mestobyelisiabells.nomoreparties.sbs/sign-in' className='portfolio__link' target='_blank' rel='noreferrer'>
                  Одностраничное приложение
                  <p className='portfolio__link-arrow'>&#8599;</p>
               </Link>
            </li>
         </ul>
      </section>
   );
}

export default Portfolio;