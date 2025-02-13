import React, { useEffect, useState } from "react";
import './MovieDetail.css';  // Assurez-vous que vous avez un fichier CSS pour le style

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

  return (
    <div className="movie-card" data-movie={title}>
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
        <h1 className="movie-cardtitle">{title}</h1>
        <h4 className="movie-cardinfo">{info}</h4>
      </div>
      <p className="movie-carddesc">{description}</p>
      <button className="btn btn-outline movie-card__button" type="button">
        Watch Trailer
      </button>
    </div>
  </div>

  );
};

export default MovieDetail;