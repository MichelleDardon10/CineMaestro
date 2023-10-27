import "../styles/Post-style.css";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [originalRating, setOriginalRating] = useState("");
  const { authState } = useContext(AuthContext);
  const [postObject, setPostObject] = useState({});
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [userRating, setUserRating] = useState("");

  useEffect(() => {
    //Llama al API y busca un post con el id que se envió al hacer click en Home
    axios.get(`http://localhost:5174/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    //Llama al API y busca los ratings relacionado con el post que tiene en id
    axios.get(`http://localhost:5174/ratings/${id}`).then((response) => {
      setRatings(response.data);

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
        setOriginalRating(userRated.rating);
      } else {
        setUserRating("No ha calificado esta pelicula");
      }
    });
  }, [authState]);

  //TODO solo dejar un rating por usuario
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
    //Hace el post, y en el API se revisa si el usuario está registrado y si no regresa error.
    axios
      .post(
        "http://localhost:5174/ratings",
        {
          rating: newRatingInt,
          PostId: id,
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
          const ratingToAdd = { rating: newRatingInt };

          //Se actualiza el promedio con el nuevo dato
          if (ratings && ratings.length > 0) {
            const totalRatings = [...ratings, ratingToAdd].reduce(
              (sum, ratingJson) => sum + ratingJson.rating,
              0
            );
            let avgRating = 0;

            if (typeof userRating !== "string") {
              avgRating = (totalRatings - originalRating) / ratings.length;
            } else {
              setOriginalRating(newRatingInt);
              avgRating = totalRatings / (ratings.length + 1);
            }
            setAverageRating(avgRating.toFixed(1));
          } else {
            setRatings([...ratings, ratingToAdd]);
            setOriginalRating(newRatingInt);
            setAverageRating(newRatingInt.toFixed(1));
          }
          setNewRating("");

          setUserRating(newRatingInt);
        }
      });
  };

  return (
    <div className="postPage">
      <div className="post">
        <div className="title"> {postObject.title} </div>
        <div className="body"> {postObject.postText} </div>
        <div className="footer"> {postObject.username} </div>
        <div className="corner"> {postObject.rating} </div>
      </div>
      <div className="ratings">
        <div className="ratingBox">
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
        </div>
        <div className="RatingS">
          <div>
            Calificación general: {averageRating} con {ratings.length}{" "}
            {ratings.length === 1 ? "calificación" : "calificaciones"}
          </div>
          <div> mi calificación: {userRating} </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
