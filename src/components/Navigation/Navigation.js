import { Link } from 'react-router-dom';
import accountImage from '../../images/icon-profile-main.svg';
import accountImageAlt from '../../images/icon-profile-black.svg';

function Navigation({ isWhiteBackground }) {
   const backgroundColor = isWhiteBackground ? '#F9F9F9' : '#000';

   return (
      <nav className='header__auth-nav'>
         <Link to='/movies' className='header__movies-link header__link'>Фильмы</Link>
         <Link to='/saved-movies' className='header__movies-link header__link'>Сохраненные фильмы</Link>
         <Link to='/profile' className='header__profile-link header__link'>Аккаунт
            <img
               src={isWhiteBackground ? accountImageAlt : accountImage}
               alt='Иконка аккаунта'
               className='header__account-icon'
               style={{ backgroundColor: backgroundColor }}
            />
         </Link>
      </nav>
   );
}

export default Navigation;