import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({isAuthenticated, children}) => {

    if(!isAuthenticated){
        return <Navigate to="/" />
    }

  return (
    <> {children} </>
  );
};

export default ProtectedRoute;
