import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login({ onLogin, serverError, location }) {
   return <AuthForm type='login' onSubmit={onLogin} serverError={serverError} location={location} />;
}

export default Login;