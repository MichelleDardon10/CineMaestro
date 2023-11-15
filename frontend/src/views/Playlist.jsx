import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Playlist.css";

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of playlists from /playlist when the component mounts
    axios
      .get("http://localhost:5174/playlist")
      .then((response) => {
        setPlaylists(response.data); // Assuming the response data is an array of playlist names
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const handleCreatePlaylist = () => {
    if (newPlaylistName) {
      axios
        .post("http://localhost:5174/playlist", {
          name: newPlaylistName,
          title: newPlaylistName,
          username: "test",
        })
        .then((response) => {
          axios
            .get("http://localhost:5174/playlist")
            .then((response) => {
              setPlaylists(response.data); // Assuming the response data is an array of playlist names
            })
            .catch((error) => {
              console.error("Error fetching playlists:", error);
            });
        })
        .catch((error) => {
          console.error("Error creating playlist:", error);
        });
    }
  };

  const handleRemovePlaylist = (id) => {
    // Send a DELETE request to the server to delete the playlist
    axios
      .delete(`http://localhost:5174/playlist/${id}`)
      .then((response) => {
        axios
          .get("http://localhost:5174/playlist")
          .then((response) => {
            setPlaylists(response.data); // Assuming the response data is an array of playlist names
          })
          .catch((error) => {
            console.error("Error fetching playlists:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting playlist:", error);
      });
  };

  return (
    <div>
      <h1 className="title-playlist">My Playlists</h1>

      <div>
        <input
          type="text"
          placeholder="Enter playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <button onClick={handleCreatePlaylist}>Create Playlist</button>
      </div>

      <ul>
        {playlists.map((playlist, index) => (
          <li key={index}>
            <span className="title-playlist">{playlist.title}</span>
            <button
              className="remove-button"
              onClick={() => handleRemovePlaylist(playlist.id)}
            >
              Remove
            </button>
            <button
              className="see-button"
              onClick={() => {
                navigate(`/list/${movie.id}`);
              }}
            >
              Ver
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaylistPage;
