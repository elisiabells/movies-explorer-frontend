import { Link } from 'react-router-dom';
import accountImageAlt from '../../images/icon-profile-black.svg';

function BurgerMenu({ isOpen, onCloseBurgerMenu }) {
   const menuItems = [
      { path: '/', name: 'Главная' },
      { path: '/movies', name: 'Фильмы' },
      { path: '/saved-movies', name: 'Сохранённые фильмы' }
   ];

   return (
      <div className={`burger-menu ${isOpen ? 'burger-menu_opened' : 'burger-menu_hidden'}`}>
         <button
            type='button'
            className='burger-menu__button-close'
            onClick={onCloseBurgerMenu}>
         </button>
         <div className='burger-menu__content'>
            <div className='burger-menu__links'>
               {menuItems.map(item => (
                  <Link
                     key={item.path}
                     to={item.path}
                     className='burger-menu__link'
                     onClick={onCloseBurgerMenu}>
                     {item.name}
                  </Link>
               ))}
            </div>
            <div className='burger-menu__account'>
               <Link
                  to='/profile'
                  className='burger-menu__account-link burger-menu__link'
                  onClick={onCloseBurgerMenu}>
                  Аккаунт
                  <img src={accountImageAlt} alt='Иконка аккаунта' className='burger-menu__account-icon' />
               </Link>
            </div>
         </div>
      </div>
   );
}

export default BurgerMenu;