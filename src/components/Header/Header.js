import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import logo from '../../images/logo.svg';

function Header({ loggedIn = true }) {
   const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
   const location = useLocation();
   const isWhiteBackground = location.pathname !== '/';

   function handleOpenBurgerMenu() {
      setIsBurgerMenuOpen(true);
   }

   function handleCloseBurgerMenu() {
      setIsBurgerMenuOpen(false);
   }

   const renderHeader = () => {
      if (location.pathname === '/') {
         return (
            <div className='header__actions'>
               <img src={logo} alt='Логотип' className='header__logo' />
               <div className='header__navigation'>
                  <Link to='/sign-up' className='header__signup-link header__link'>Регистрация</Link>
                  <Link to='/sign-in' className='header__signin-link header__link'>Войти</Link>
               </div>
            </div>
         );
      } else if (loggedIn) {
         return (
            <>
               <div className='header__actions'>
                  <Link to='/'><img src={logo} alt='Логотип' className='header__logo' /></Link>
                  <div className='header__navigation'>
                     <Navigation isWhiteBackground={isWhiteBackground} />
                  </div>
                  <button
                     className='header__burger-menu-button'
                     onClick={handleOpenBurgerMenu}
                  />
               </div>
               <BurgerMenu
                  isOpen={isBurgerMenuOpen}
                  onCloseBurgerMenu={handleCloseBurgerMenu}
               />
            </>
         );
      } else {
         return (
            <div className='header__actions'>
               <img src={logo} alt='Логотип' className='header__logo' />
               <div className='header__navigation'>
                  <Link to='/sign-up' className='header__signup-link header__link'>Регистрация</Link>
                  <Link to='/sign-in' className='header__signin-link header__link'>Войти</Link>
               </div>
            </div>
         );
      }
   };

   const backgroundColor = location.pathname === '/' ? '#F3C1F8' : '#fff';

   return (
      <header className='header' style={{ backgroundColor: backgroundColor }}>
         {renderHeader()}
      </header>
   );
}

export default Header;