import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function AuthForm({ type, onSubmit }) {
   // Объявляем состояние для хранения пользовательских данных и их валидации
   const [userData, setUserData] = useState({
      name: {
         value: "",
         isValid: false,
         errorMessage: ""
      },
      email: {
         value: "",
         isValid: false,
         errorMessage: ""
      },
      password: {
         value: "",
         isValid: false,
         errorMessage: ""
      }
   });

   // Определяем, нужно ли отключить кнопку отправки формы
   const isValid = userData.name.isValid && userData.email.isValid && userData.password.isValid;
   const [disabled, setDisabled] = useState(true);

   useEffect(() => {
      if (type === 'login') {
         (userData.email.isValid && userData.password.isValid) ? setDisabled(false) : setDisabled(true);
      } else {
         isValid ? setDisabled(false) : setDisabled(true);
      }
   }, [isValid, userData.email.isValid, userData.password.isValid, type]);

   // Обработчик изменения значений в инпутах
   const handleChange = (evt) => {
      const { name, value, validity, validationMessage } = evt.target;

      setUserData((prevState) => ({
         ...prevState,
         [name]: {
            ...userData[name],
            value,
            isValid: validity.valid,
            errorMessage: validationMessage
         }
      }));
   }

   // Обработчик отправки формы
   const handleSubmit = (evt) => {
      evt.preventDefault();
      onSubmit({
         name: userData.name.value,
         email: userData.email.value,
         password: userData.password.value
      });
   }

   return (
      <div className='auth-form'>
         <div className='auth-form__container'>
            <Link to='/'><img src={logo} alt='Логотип приложения' className='auth-form__logo' /></Link>
            <h2 className='auth-form__title'>
               {type === 'register' ? 'Добро пожаловать!' : 'Рады видеть!'}
            </h2>
            <form onSubmit={handleSubmit} className='auth-form__form-content'>
               {type === 'register' && (
                  <>
                     <label className='auth-form__label'>Имя</label>
                     <input
                        name="name"
                        className='auth-form__input'
                        type='text'
                        placeholder='Имя'
                        value={userData.name.value}
                        onChange={handleChange}
                        required
                     />
                     {userData.name.errorMessage && <span className="auth-form__error">{userData.name.errorMessage}</span>}
                  </>
               )}
               <label className='auth-form__label'>E-mail</label>
               <input
                  name="email"
                  className='auth-form__input'
                  type='email'
                  placeholder='E-mail'
                  value={userData.email.value}
                  onChange={handleChange}
                  required
               />
               {userData.email.errorMessage && <span className="auth-form__error">{userData.email.errorMessage}</span>}
               <label className='auth-form__label'>Пароль</label>
               <input
                  name="password"
                  className='auth-form__input'
                  type='password'
                  placeholder='Пароль'
                  value={userData.password.value}
                  onChange={handleChange}
                  required
               />
               {userData.password.errorMessage && <span className="auth-form__error">{userData.password.errorMessage}</span>}
               <button
                  className={`auth-form__button ${type === 'login' ? 'auth-form__button--login' : ''}`}
                  type='submit'
                  disabled={disabled}
               >
                  {type === 'register' ? 'Зарегистрироваться' : 'Войти'}
               </button>
            </form>
            <p className='auth-form__footer-text'>
               {type === 'register' ? 'Уже зарегистрированы? ' : 'Ещё не зарегистрированы? '}
               <Link to={type === 'register' ? '/sign-in' : '/sign-up'} className='auth-form__link'>
                  {type === 'register' ? 'Войти' : 'Регистрация'}
               </Link>
            </p>
         </div>
      </div>
   );
}

export default AuthForm;