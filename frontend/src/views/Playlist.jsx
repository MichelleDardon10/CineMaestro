import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Playlist.css";

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5174/playlist")
      .then((response) => {
        setPlaylists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, []);

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
              setPlaylists(response.data);
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
    axios
      .delete(`http://localhost:5174/playlist/${id}`)
      .then((response) => {
        axios
          .get("http://localhost:5174/playlist")
          .then((response) => {
            setPlaylists(response.data);
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
      <h1 className="playlist-title">My Playlists</h1>

      <div>
        <input
          className="playlist-input"
          type="text"
          placeholder="Enter playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <button className="create-button" onClick={handleCreatePlaylist}>
          Create Playlist
        </button>
      </div>

      <ul>
        {playlists.map((playlist, index) => (
          <li key={index} className="playlist-item">
            <span className="playlist-name">{playlist.title}</span>
            <button
              className="remove-button"
              onClick={() => handleRemovePlaylist(playlist.id)}
            >
              Remove
            </button>
            <button
              className="see-button"
              onClick={() => {
                navigate(`/list/${playlist.id}`);
              }}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaylistPage;
