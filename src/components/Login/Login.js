import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
   const handleLogin = (e) => {
      e.preventDefault();
   };

   return <AuthForm type='login' onSubmit={handleLogin} />;
}

export default Login;