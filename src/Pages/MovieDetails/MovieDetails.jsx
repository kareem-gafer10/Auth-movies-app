import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../../Components/VideoCard/VideoCard'

const MovieDetails = () => {


  const [movieDetails, setMovieDetails] = useState();
const [videoKey, setVideoKey] = useState();
const {id}=useParams()



  const movieDetailsUrl=`https://api.themoviedb.org/3/movie/${id}?api_key=c0a753282bdc2008ffe4d6e4e1d6462c`;
  
  const videoUrl= `https://api.themoviedb.org/3/movie/${id}/videos?api_key=c0a753282bdc2008ffe4d6e4e1d6462c`;

  const imgUrl= 'https://image.tmdb.org/t/p/w1280';



  useEffect(() => {
    
    axios.get(movieDetailsUrl).then(res => setMovieDetails(res.data))
    axios.get(videoUrl).then(res => setVideoKey(res.data.results[0].key))

  }, [movieDetails,videoKey,id]);
 




  return (
    <>
         <div className="py-5 page" style={{backgroundColor :"#555"}}>
            <div className="container">
              <div className="card mb-3 bg-dark text-light shadow-lg">
                <div className="row">

                <div className="col-md-4">
                 <img src={imgUrl+movieDetails?.poster_path} alt='imgDetails' 
                 className='img-fluid rounded-start' />
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                    <b>Release Date :</b>
                     <span>{movieDetails?.release_date}</span> 
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                    <b>Rate :</b>
                    <span>{movieDetails?.vote_average}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                    <b>Total Vote :</b>
                    <span>{movieDetails?.vote_count}</span>
                    </li>
                    <li className="list-group-item  text-center">
                        <Link to={-1} className='btn btn-primary'>Go Back</Link>
                    </li>
                  </ul>
                </div>



              <div className="col-md-8 d-flex flex-column">
               <div className="card-body">
                <h3 className='text-center'>{movieDetails?.title}</h3>
                {videoKey&& <VideoCard videoKey={videoKey}/>}
                <h5 className='card-title mt-4 mb-5'>Overview</h5>
                <p className='card-text'>{movieDetails?.overview}</p>
               </div>
                
              </div> 










                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default MovieDetails;