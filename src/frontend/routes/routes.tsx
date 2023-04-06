import {useAtom} from "jotai"
import {token,set_user_auth,allusers,fetch_user,get_user_details,user_id} from "../store/storage"
import Main from "../pages/main";
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Home from "../pages/private/home"
import Profile from "../pages/private/Profile"
import jwt, {} from "jsonwebtoken";
import jwt_decode, { JwtPayload } from 'jwt-decode';

import {
    BrowserRouter as Router,
    createRoutesFromElements,
    Route,
    Routes,
    Navigate,
    RouterProvider,
  } from "react-router-dom";
import { useEffect } from "react";
const PrivateRoute:React.FC<{path: string, element: React.ReactElement}> = ({path, element}) => {
    const [isAuth] = useAtom(token)
    return isAuth? (
        <Routes><Route path={path} element={element} /></Routes>
    ) : (
        <Routes> <Route path={path} element={<Navigate to = "/login" />} /></Routes> 
    )
}

const PublicRoutes:React.FC<{path: string, element: React.ReactElement}> = ({path, element}) => {
    const [isAuth] = useAtom(token)
    return !isAuth? (
        <Routes><Route path={path} element={element} /></Routes>
    ) : (
        <Routes> <Route path={path} element={<Navigate to = "/home" />} /></Routes> 
    )
}

export const App = ()=>{
    const [isAuth] = useAtom(token)
    const [_user_id] = useAtom(user_id)
    const [_alluser] = useAtom(allusers)
    useEffect(()=>{
        fetch_user()
        
        get_user_details()
    },[])
    if(isAuth){
        const decodedToken =   jwt_decode<JwtPayload>(isAuth);
        if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
            localStorage.removeItem('authtoken');
          }
    }
  
    
    
  
return <Router>
    {/* <PrivateRoute path="/" element={} /> */}
    <PublicRoutes path = "/" element={<Main />} />
    <PublicRoutes path = "/login" element={<Login />} />
    <PublicRoutes path = "/signup" element={<Signup />} />
    <PrivateRoute path="/home" element={<Home />} />
    <PrivateRoute path = '/profile' element={<Profile />} />
</Router>

}