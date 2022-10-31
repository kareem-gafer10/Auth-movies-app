import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";
import { AuthContext } from "./Context/AuthContext";
import { userObserver } from "./Firebase";
import { MoviesContext } from "./Context/MoviesContext";



const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const [movies, setMovies] = useState([]);



  useEffect(() => {
    userObserver(setCurrentUser);
  }, []);




  return (
    <>
      <AuthContext.Provider value={{ currentUser }}>
        <MoviesContext.Provider value={{movies,setMovies}}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details/:id" element={<MovieDetails />} />
          </Routes>
        </MoviesContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
