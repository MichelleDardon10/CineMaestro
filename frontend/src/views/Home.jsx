import React from "react";
import axios from "axios";
import "../styles/Home-style.css";
import { useEffect, useState } from "react";

const textStyle = {
  color: "black", // Set the text color to white
};

export function Home() {
  //Lo que sea escrito adentro de useEffect va a cargar cada vez que den refresh
  //Axios.get es para llamar a la información que se envía desde posts

  const [listOfPosts, setListOfPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5174/Posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div style={textStyle} className="title">
      {listOfPosts.map((value, key) => {
        return (
          <div className="posts">
            <div className="title"> {value.title} </div>
            <div className="body"> {value.postText} </div>
            <div className="footer"> {value.username} </div>
            <div className="corner"> {value.rating} </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
