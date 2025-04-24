import React, { useEffect, useState } from "react";
import './MovieDetail.css';
import CommentList from "./CommentList";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios';

const apiKey = '15d2ea6d0dc1d476efbca3eba2b9bbfb';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch("http://localhost:2066/movies/6");
        
        if (!response.ok) {
          throw new Error("Film non trouvé");
        }

        const movieData = await response.json();

        // Fetch poster from TMDb API
        const tmdbRes = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieData.title)}`);
        const posterPath = tmdbRes.data.results[0]?.backdrop_path;
        const posterUrl = posterPath ? `http://image.tmdb.org/t/p/w500/${posterPath}` : null;

        setMovie({ ...movieData, posterUrl });
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération du film.");
      }
    };

    fetchMovie();
  }, []);

  if (error) return <div>{error}</div>;
  if (!movie) return <div>Chargement...</div>;

  return (
    <div>
      <div className="movie-card">
        <div className="movie-cardoverlay">
          {movie.posterUrl ? (
            <img src={movie.posterUrl} className="image-detail-film" alt={movie.title} />
          ) : (
            <div>Poster non disponible</div>
          )}
        </div>
        <div className="movie-cardshare">
          <button className="movie-cardicon"><span>{movie.rating} / 5</span></button>
        </div>
        <div className="movie-cardcontent">
          <div className="movie-cardheader">
            <h1 className="movie-cardtitle">{movie.title}</h1>
            <h4 className="movie-cardinfo">{movie.info}</h4>
          </div>
          <p className="movie-carddesc">{movie.description}</p>
          <button className="btn btn-outline movie-card__button" type="button" onClick={() => window.open(movie.trailerUrl, '_blank')}>
            Watch Trailer
          </button>
        </div>
      </div>
      <CommentList movieId={1} />
    </div>
  );
};




// Fonction Dynamique qui prend un ID de film en paramètre
const MovieDetailWithID = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:2066/movies/${movieId}`);
        
        if (!response.ok) {
          throw new Error("Film non trouvé");
        }

        const movieData = await response.json();

        // Récupérer le poster depuis TMDb
        const tmdbRes = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieData.title)}`);
        const posterPath = tmdbRes.data.results[0]?.poster_path;
        const posterUrl = posterPath ? `http://image.tmdb.org/t/p/w500/${posterPath}` : null;

        setMovie({ ...movieData, posterUrl });
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération du film.");
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  if (error) return <div>{error}</div>;
  if (!movie) return <div>Chargement...</div>;

  return (
    <div className="movie-card">
      <div className="movie-cardoverlay">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} className="image-detail-film" alt={movie.title} />
        ) : (
          <div>Poster non disponible</div>
        )}
      </div>
      <div className="movie-cardshare">
        <button className="movie-cardicon"><ThumbUpIcon /></button>
        <button className="movie-cardicon"><ThumbDownIcon /></button>
        <button className="movie-cardicon"><span>{movie.rating} / 5</span></button>
      </div>
      <div className="movie-cardcontent">
        <div className="movie-cardheader">
          <h1 className="movie-cardtitle">{movie.title}</h1>
          <h4 className="movie-cardinfo">{movie.info}</h4>
        </div>
        <p className="movie-carddesc">{movie.description}</p>
        <button className="btn btn-outline movie-card__button" type="button" onClick={() => window.open(movie.trailerUrl, '_blank')}>
          Watch Trailer
        </button>
      </div>
    </div>
  );
};


export default MovieDetail;
export { MovieDetailWithID };
