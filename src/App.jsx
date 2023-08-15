import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Session from "./pages/Session";
import Profil from "./pages/Profil";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function PrivateRoute({ element, isAuthenticated, fallbackPath }) {
  return isAuthenticated ? element : <Navigate to={fallbackPath} />;
}


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    setIsAuthenticated(Cookies.get('token') !== undefined);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <main>
          <Routes>
            <Route path="/" element={<Session />} >
              <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}/>} />
              <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}/>} />
            </Route>
            <Route path="/profil" element={<PrivateRoute element={<Profil isAuthenticated={isAuthenticated} />} isAuthenticated={isAuthenticated} fallbackPath="/signin" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App;