import React from 'react';
import MyPht from '../../../images/avatar.jpeg';

function AboutMe() {
   return (
      <section className='about-me'>
         <h2 className='about-me__title' id='me'>Студент</h2>
         <div className='about-me__container'>
            <div className='about-me__info'>
               <h3 className='about-me__name'>Елизавета</h3>
               <p className='about-me__subtitle'>Фронтенд-разработчик, 25 лет</p>
               <p className='about-me__description'>Я родилась в Беларуси. Закончила факультет экологии в Петербургском РГГМУ с красным дипломом. Специализируюсь на экологии больших городов и Арктике. Проживала в четырёх странах и восьми городах, а сейчас живу в Тбилиси. Люблю петь и снимать на касетную камеру.</p>
               <a href='https://github.com/elisiabells' className='about-me__github-link' target='_blank' rel='noreferrer'>Github</a>
            </div>
            <img className='about-me__img' alt='Фотография' src={MyPht} />
         </div>
      </section>
   );
}

export default AboutMe;