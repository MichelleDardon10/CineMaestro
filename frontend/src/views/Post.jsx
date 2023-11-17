import "../styles/Post-style.css";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [movieObject, setMovieObject] = useState({});
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [userRating, setUserRating] = useState("");
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  const handleRemoveRating = () => {
    // Send a DELETE request to the server to delete the playlist
    axios
      .delete(
        `http://localhost:5174/ratings/${id}`,

        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          window.location.reload();
        }
      });
  };

  const handleCreateComment = () => {
    if (newComment) {
      axios
        .post(
          "http://localhost:5174/comments",
          {
            comment: newComment,
            username: authState.username,
            MovieId: id,
            UserId: authState.id,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            axios
              .get(`http://localhost:5174/comments/${id}`)
              .then((response) => {
                setCommentList(response.data);
              })
              .catch((error) => {
                console.error("Error fetching comments:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error creating comment:", error);
        });
    }
  };

  const handleRemoveComment = (id) => {
    // Send a DELETE request to the server to delete the playlist
    axios
      .delete(`http://localhost:5174/comments/${id}`)
      .then((response) => {
        axios
          .get("http://localhost:5174/comments")
          .then((response) => {
            setCommentList(response.data); // Assuming the response data is an array of playlist names
          })
          .catch((error) => {
            console.error("Error fetching playlists:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting playlist:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5174/comments/${id}`)
      .then((response) => {
        setCommentList(response.data); // Assuming the response data is an array of playlist names
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });

    axios.get(`http://localhost:5174/movies/byId/${id}`).then((response) => {
      setMovieObject(response.data);
    });

    //Llama al API y busca los ratings relacionado con el post que tiene en id
    axios.get(`http://localhost:5174/ratings/byId/${id}`).then((response) => {
      setRatings(response.data);
      //setRatingId(response.data[0].id);

      //Lógica para hacer un promedio de rating.
      if (response.data && response.data.length > 0) {
        const totalRatings = response.data.reduce(
          (sum, ratingJson) => sum + ratingJson.rating,
          0
        );
        const avgRating = totalRatings / response.data.length;
        setAverageRating(avgRating.toFixed(1));
      } else {
        setAverageRating("No hay calificaciones todavía");
      }

      const userRated = response.data.find(
        (obj) => obj.username === authState.username
      );

      if (userRated) {
        setUserRating(userRated.rating);
      } else {
        setUserRating("No ha calificado esta pelicula");
      }
    });
  }, [authState]);

  const addRating = () => {
    //Antes de llamar al API mira si se cumplen ciertas condiciones
    const newRatingInt = parseFloat(newRating, 10);

    if (
      !Number.isInteger(newRatingInt) ||
      newRatingInt < 0 ||
      newRatingInt > 10
    ) {
      alert("Por favor, ingrese un número entero entre 0 y 10.");
      return;
    }

    axios
      .post(
        "http://localhost:5174/ratings",
        {
          rating: newRatingInt,
          MovieId: id,
          UserId: authState.id,
        },

        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          window.location.reload();
        }
      });
  };

  return (
    <div>
      <div className="post-container">
        <div className="post">
          <div className="title"> {movieObject.titulo} </div>
          <div className="director"> {movieObject.director} </div>
          <div className="genre"> {movieObject.genero} </div>
          <div className="date">
            {" "}
            {new Date(movieObject.fechaEstreno).getFullYear()}{" "}
          </div>
          <div className="username"> {movieObject.username} </div>
        </div>

        <div className="ratings">
          <div className="ratingBox">
            <div> Mi calificación: {userRating} </div>
            <input
              type="number"
              placeholder=""
              value={newRating}
              onChange={(e) => {
                setNewRating(e.target.value);
              }}
            />

            <button onClick={addRating}>
              {" "}
              {typeof userRating !== "string"
                ? "Cambia tu Calificación"
                : "Deja tu Calificación"}
            </button>
            <div>
              Calificación general: {averageRating} con {ratings.length}{" "}
              {ratings.length === 1 ? "calificación" : "calificaciones"}
            </div>

            {ratings.length !== 0 && (
              <button
                className="remove-button"
                onClick={() => handleRemoveRating()}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="Comments">
        <div className="Commentbox">
          <input
            type="string"
            placeholder="place your comment"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <button onClick={handleCreateComment}>add comment</button>

          <ul>
            {commentList.map((comment, index) => (
              <li key={index}>
                <span className="title">{comment.comment}</span>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveComment(comment.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Post;