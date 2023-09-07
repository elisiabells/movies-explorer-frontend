import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ loggedIn, component: Component, ...props }) {
   if (!loggedIn) {
      return <Navigate to="/" />;
   }

   return <Route {...props} element={<Component {...props} />} />;
}

export default ProtectedRoute;