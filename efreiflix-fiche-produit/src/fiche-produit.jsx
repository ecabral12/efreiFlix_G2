import React, { useEffect, useState } from "react";
import './MovieDetail.css';  // Assurez-vous que vous avez un fichier CSS pour le style
import CommentList from "./CommentList";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

// Fonction de Démonstration (ID fixe 1)
const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch("http://localhost:2066/movies/1");
        
        if (!response.ok) {
          throw new Error("Film non trouvé");
        }

        const movieData = await response.json();
        console.log(movieData)
        setMovie(movieData);
      } catch (err) {
        setError("Erreur lors de la récupération du film.");
      }
    };

    fetchMovie();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Chargement...</div>;
  }

  const { title, year, genres, description, posterUrl, trailerUrl, rating } = movie;

  return (
    <div className="movie-card">
      <div className="movie-cardoverlay">
        <img src={movie.posterUrl} className="image-detail-film"  alt={movie.posterUrl}/>
      </div>
      <div className="movie-cardshare">
        <button className="movie-cardicon">
          <ThumbUpIcon/>
        </button>
        <button className="movie-cardicon">
          <ThumbDownIcon/>
        </button>
        <button className="movie-cardicon">
          <span> {movie.rating} / 5</span>
        </button>
      </div>
      <div className="movie-cardcontent">
        <div className="movie-cardheader">
          <h1 className="movie-cardtitle">{movie.title}</h1>
          <h4 className="movie-cardinfo">{movie.info}</h4>
        </div>
        <p className="movie-carddesc">{movie.description}</p>
        <button className="btn btn-outline movie-card__button" type="button" onClick={
          () => window.open(movie.trailerUrl, '_blank')}>
          Watch Trailer
        </button>
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
        setMovie(movieData);
      } catch (err) {
        setError("Erreur lors de la récupération du film.");
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="movie-card">
      <div className="movie-cardoverlay"></div>
      <div className="movie-cardshare">
        <button className="movie-cardicon">
          <i className="material-icons">&#xe87d;</i>
        </button>
        <button className="movie-cardicon">
          <i className="material-icons">&#xe253;</i>
        </button>
        <button className="movie-cardicon">
          <i className="material-icons">&#xe80d;</i>
        </button>
      </div>
      <div className="movie-cardcontent">
        <div className="movie-cardheader">
          <h1 className="movie-cardtitle">{movie.title}</h1>
          <h4 className="movie-cardinfo">{movie.info}</h4>
        </div>
        <p className="movie-carddesc">{movie.description}</p>
        <button className="btn btn-outline movie-card__button" type="button" onClick={
          () => window.open(movie.trailerUrl, '_blank')}>
          Watch Trailer
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
export { MovieDetailWithID };
