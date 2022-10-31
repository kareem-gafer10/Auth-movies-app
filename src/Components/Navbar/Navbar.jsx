import axios from 'axios';
import React, { useContext,useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { MoviesContext } from '../../Context/MoviesContext';
import {logout} from '../../Firebase';
import './Navbar.css';

const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=c0a753282bdc2008ffe4d6e4e1d6462c&language=en-US&query=`;





const Navbar = () => {

  const [search, setSearch] = useState('');

    const navigate=useNavigate()
   const {currentUser}= useContext(AuthContext)
   const {movies,setMovies}= useContext(MoviesContext)





  const logoutHandler = ()=>{
    logout()
    navigate('/login')
  }





 const searchHandler= async()=>{

  const res= await axios.get(`${searchUrl}${search}`)
  setMovies(res.data.results)
 }






  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor : "#070707"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
    <h4 className="text-danger">Movies App</h4>
    </Link>
   
   <div className="d-flex align-items-center">
      {currentUser ? (
        <>
           <form className="d-flex">
           <input className="form-control me-2"
            type="search"
             placeholder="Search"
              onChange={(e)=>setSearch(e.target.value)} value={search}
             />
            <button className="btn btn-outline-success" type="button" onClick={searchHandler}>Search</button>
            </form>
        <h4 className='text-capitalize text-warning d-inline-block mx-md-5'>{currentUser?.displayName}</h4>
        <button className="ms-2 btn btn-outline-light" onClick={logoutHandler}>Logout</button>
      
       </> 
         ) :( 
         <>
       <button onClick={()=> navigate('/login')} className="ms-2 btn btn-outline-light">Login</button>
     <button onClick={()=> navigate('/register')} className="ms-2 btn btn-outline-light">Register</button>
        </>
      )}

   </div>
  </div>
</nav>




    </>
  )
}

export default Navbar;