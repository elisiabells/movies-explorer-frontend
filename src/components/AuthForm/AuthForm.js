import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function AuthForm({ type, onSubmit }) {
   return (
      <div className='auth-form__container'>
         <div className='auth-form'>
            <Link to='/'><img src={logo} alt='Логотип приложения' className='auth-form__logo' /></Link>
            <h2 className='auth-form__title'>
               {type === 'register' ? 'Добро пожаловать!' : 'Рады видеть!'}
            </h2>
            <form onSubmit={onSubmit} className='auth-form__form'>
               {type === 'register' && (
                  <>
                     <label className='auth-form__label'>Имя</label>
                     <input className='auth-form__input' type='text' placeholder='Имя' />
                  </>
               )}
               <label className='auth-form__label'>E-mail</label>
               <input className='auth-form__input' type='email' placeholder='E-mail' />
               <label className='auth-form__label'>Пароль</label>
               <input className='auth-form__input' type='password' placeholder='Пароль' />
               <button className={`auth-form__button ${type === 'login' ? 'auth-form__login-button' : ''}`} type='submit'>
                  {type === 'register' ? 'Зарегистрироваться' : 'Войти'}
               </button>
            </form>
            <p className='auth-form__footer'>
               {type === 'register'
                  ? 'Уже зарегистрированы? '
                  : 'Ещё не зарегистрированы? '}
               <Link to={type === 'register' ? '/sign-in' : '/sign-up'} className='auth-form__link'>
                  {type === 'register' ? 'Войти' : 'Регистрация'}
               </Link>
            </p>
         </div>
      </div>
   );
}

export default AuthForm;