import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTcxMWE4ZDU5YzA4YWM3OGQ2YTFkNGE3NTJjMTJkMCIsIm5iZiI6MTc3MDMzNDE0NC41Mywic3ViIjoiNjk4NTI3YzA5ODg2MGExZGM2OWQxYjc2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.nfD3-WDPUveJrkB756R9JUg5Gey_W2o7ZekxlnYA9zo",
      },
    };

    if (!id) return;

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options,
    )
      .then((Response) => Response.json())
      .then((Response) =>
        setApiData(Response.results ? Response.results[0] : {}),
      )
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt=""
        className="back-arrow"
        onClick={() => {
          navigate(-2);
        }}
      />
      {apiData && apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Trailer not available</p>
      )}

      <div className="player-info">
        <p>
          {apiData && apiData.published_at
            ? apiData.published_at.slice(0, 10)
            : ""}
        </p>
        <p>{apiData && apiData.published_at ? apiData.published_at : ""}</p>
        <p>{apiData && apiData.type ? apiData.type : ""}</p>
      </div>
    </div>
  );
};

export default Player;
