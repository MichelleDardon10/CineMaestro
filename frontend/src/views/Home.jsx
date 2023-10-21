import React from "react";
import axios from "axios";
import "../styles/Home-style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const textStyle = {
  color: "black", // Set the text color to white
};

export function Home() {
  //Lo que sea escrito adentro de useEffect va a cargar cada vez que den refresh
  //Axios.get es para llamar a la información que se envía desde posts

  //List of posts es un array con todos los posts en la base de datos
  const [listOfPosts, setListOfPosts] = useState([]);

  //Navigate sirve para abrir otras ventanas
  let navigate = useNavigate();

  useEffect(() => {
    //Llamada al API para que nos de los posts y guardarlos en el array
    axios.get("http://localhost:5174/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div style={textStyle} className="title">
      {/* Imprime todos los posts en lisOfPosts y sus valores, el onclick y el value.id es para que al presionar un bloque de post
      se vaya a una pagina especifica para ese post, que es el view que se llama Post.jsx */}
      {listOfPosts.map((value, key) => {
        return (
          <div
            key={value.id}
            className="posts"
            onClick={() => {
              navigate(`/post/${value.id}`);
            }}
          >
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
