import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login({ onLogin, serverError, location, setServerError }) {
   return <AuthForm 
   type='login' 
   onSubmit={onLogin} 
   setServerError={setServerError}
   serverError={serverError} 
   location={location} />;
}

export default Login;