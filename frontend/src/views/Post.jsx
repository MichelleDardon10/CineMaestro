import "../styles/Post-style.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState("");
  const [averageRating, setAverageRating] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5174/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:5174/ratings/${id}`).then((response) => {
      setRatings(response.data);

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
    });
  }, []);

  //TODO solo dejar un rating por usuario
  const addRating = () => {
    const newRatingInt = parseFloat(newRating, 10);
    console.log(Number.isInteger(newRatingInt));
    if (
      !Number.isInteger(newRatingInt) ||
      newRatingInt < 0 ||
      newRatingInt > 10
    ) {
      console.log();
      alert("Por favor, ingrese un número entero entre 0 y 10.");
      return;
    }
    axios
      .post(
        "http://localhost:5174/ratings",
        {
          rating: newRatingInt,
          PostId: id,
        },
        {
          headers: {
            accesToken: localStorage.getItem("accesToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const ratingToAdd = { rating: newRatingInt };
          setRatings([...ratings, ratingToAdd]);

          if (ratings && ratings.length > 0) {
            const totalRatings = [...ratings, ratingToAdd].reduce(
              (sum, ratingJson) => sum + ratingJson.rating,
              0
            );
            const avgRating = totalRatings / (ratings.length + 1); // Increment the count
            setAverageRating(avgRating.toFixed(1));
          } else {
            setAverageRating(newRatingInt.toFixed(1));
          }
          setNewRating("");
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
          <button onClick={addRating}>Deja tu Calificación!</button>
        </div>
        <div className="Rating promedio">
          <div className="avgRating">Calificación general: {averageRating}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
