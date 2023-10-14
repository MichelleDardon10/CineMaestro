import "../styles/Post-style.css";
import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5174/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  }, []);

  return (
    <div className="postPage">
      <div className="title"> {postObject.title} </div>
      <div className="body"> {postObject.postText} </div>
      <div className="footer"> {postObject.username} </div>
      <div className="corner"> {postObject.rating} </div>
    </div>
  );
}

export default Post;
