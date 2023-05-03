// import { Navigate } from 'react-router-dom'
// import { useState } from 'react'

// const PrivateRoute = ({children, ...rest}) => {
//     let [user, setUser] = useState(null)

//     return !user ? <Navigate to='/login'/> : children;
// }

// export default PrivateRoute;


// import { Route, Redirect } from 'react-router-dom'
// import { useContext } from 'react'
// import AuthContext from '../context/AuthContext'

// const PrivateRoute = ({children, ...rest}) => {
//     let {user} = useContext(AuthContext)
//     return(
//         <Route {...rest}>{!user ? <Redirect to="/login" /> :   children}</Route>
//     )
// }

// export default PrivateRoute;

import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import React, { useContext } from "react";

const PrivateRoutes = () => {
  let { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;