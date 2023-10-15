import "../styles/Post-style.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

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
        setAverageRating(avgRating);
      } else {
        setAverageRating("No hay calificaciones todavía");
      }
    });
  }, []);

  const addRating = () => {
    axios
      .post("http://localhost:5174/ratings", {
        rating: newRating,
        PostId: id,
      })
      .then((response) => {
        console.log("Rating added");
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
            type="int"
            placeholder="8"
            onChange={(e) => {
              setNewRating(e.target.value);
            }}
          />
          <button onClick={addRating}>Deja tu Calificación!</button>
        </div>
        <div className="Rating promedio">
          <div className="avgRating">
            {" "}
            Calificación general: {averageRating}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
