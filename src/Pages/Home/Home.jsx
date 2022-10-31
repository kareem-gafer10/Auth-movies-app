import React, { useEffect,useContext } from "react";
import axios from "axios";
import MovieCard from "../../Components/MovieCard/MovieCard";
import { MoviesContext } from "../../Context/MoviesContext";



const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=c0a753282bdc2008ffe4d6e4e1d6462c&language=en`;

const Home = () => {

  const {movies,setMovies}= useContext(MoviesContext)



  const fetchMovies = async (url) => {
    const res = await axios.get(url);
    setMovies(res.data.results);
  };

  useEffect(() => {
    fetchMovies(baseUrl);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center flex-wrap page" style={{background :"#555"}}>
      {movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
      </div>
    </>
  );
};

export default Home;
