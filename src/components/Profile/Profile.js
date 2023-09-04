import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

function Profile() {
   const [isEditing, setIsEditing] = useState(false);
   const [name, setName] = useState('Виталий');
   const [email, setEmail] = useState('pochta@yandex.ru');

   const handleEdit = () => {
      setIsEditing(true);
   };

   const handleSave = () => {
      // здесь вы можете добавить логику отправки измененных данных на сервер
      setIsEditing(false);
   };

   const handleLogout = () => {
      // здесь будет логика для выхода из аккаунта
   };

   return (
      <section className='profile'>
         <Header />
         <h2 className='profile__title'> Привет, {name}!</h2>
         <form className='profile__form'>
            <div className='profile__form-item profile__name'>
               <label className='profile__label'>Имя</label>
               <input
                  className='profile__input'
                  value={name}
                  onChange={e => setName(e.target.value)}
               />
            </div>
            <div className='profile__form-item profile__email'>
               <label className='profile__label'>E-mail</label>
               <input
                  className='profile__input'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </div>
            {isEditing ? (
               <button onClick={handleSave} className='profile__button profile__button-save' type="button">
                  Сохранить
               </button>
            ) : (
               <button onClick={handleEdit} className='profile__button' type="button">
                  Редактировать
               </button>
            )}
         </form>
         {!isEditing && (
            <Link to='/' onClick={handleLogout} className='profile__button-exit'>
               Выйти из аккаунта
            </Link>
         )}
      </section>
   );
}

export default Profile;