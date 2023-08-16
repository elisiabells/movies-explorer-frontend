import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Main from './components/Main';
import Movies from './components/Movies';
import SavedMovies from './components/SavedMovies';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Логотип</Link>
          <Link to="/movies">Фильмы</Link>
          <Link to="/saved-movies">Сохранённые фильмы</Link>
          <Link to="/signup">Регистрация</Link>
          <Link to="/signin">Авторизация</Link>
          <Link to="/profile">Аккаунт</Link>
        </nav>

        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/movies" component={Movies} />
          <Route path="/saved-movies" component={SavedMovies} />
          <Route path="/profile" component={Profile} />
          <Route path="/signin" component={Login} />
          <Route path="/signup" component={Register} />
          <Route render={() => <h1>404: Страница не найдена</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
