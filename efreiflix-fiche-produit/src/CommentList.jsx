import React, { useEffect, useState } from 'react';
import './CommentList.css';

const CommentList = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
    let commentsData = [];
  useEffect(() => {
    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:2066/comments?movieId=${movieId}`);
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des commentaires");
            }

            const commentsData = await response.json();
            console.log("Comments fetched:", commentsData);  // ✅ Vérifier les données récupérées

            setComments(Array.isArray(commentsData) ? commentsData : [commentsData]);

        } catch (err) {
            console.error("Erreur lors du fetch des commentaires:", err);
            setComments([]); 
        }
    };
      

    if (movieId) {
        console.log("Fetching comments for movie ID:", movieId);
        fetchComments();
    }
}, [movieId]);

  if (error) {
    console.log("error")
    return <div>{error}</div>;
  }



  return (
    <div className="comment-list">
      {comments.length === 0 ? (  // Vérifier ici plutôt que dans `if (comments.length == 0)`
        <div>Aucun commentaire pour ce film.</div>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <h5 className="comment-author">{comment.author}</h5>
            <p className="comment-text">{comment.text}</p>
            <span className="comment-timestamp">{new Date(comment.timestamp).toLocaleString()}</span>
          </div>
        ))
      )}
    </div>
  );
  
};

export default CommentList;
