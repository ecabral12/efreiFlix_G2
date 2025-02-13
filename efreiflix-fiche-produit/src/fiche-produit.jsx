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
    <div className="movie-detail-container">
      <div className="movie-detail">
        <div className="movie-poster">
          <img src={movie.posterUrl} alt={movie.title} />
        </div>

        <div className="movie-info">
          <h1 className="movie-title">{movie.title} ({movie.year})</h1>
          <div className="movie-genres">
            {movie.genres.map((genre, index) => (
              <span key={index} className="genre">{genre}</span>
            ))}
          </div>
          <div className="movie-rating">
            <strong>Rating:</strong> {movie.rating} / 5
          </div>

          <p className="movie-description">{movie.description}</p>

          <div className="movie-buttons">
            <button className="play-button">► Play</button>
            <button className="trailer-button">Trailer</button>
          </div>

          <div className="movie-trailer">
            <iframe
              width="100%"
              height="400"
              src={movie.trailerUrl}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
