import React, { useState } from "react";
import "./home.css";

const Home = () => {
  const [moviename, setMoviename] = useState("");
  const [moviedata, setMoviedata] = useState("");
  const key = "2170d262";
  const handlesearch = async () => {
    console.log(moviename);
    if (moviename.length <= 0) {
    } else {
      await fetch(`http://www.omdbapi.com/?t=${moviename}&apikey=${key}`)
        .then((res) => res.json())
        .then((data) => {
          setMoviedata(data);
          console.log(moviedata);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          id="movie-name"
          placeholder="Enter movie name here..."
          onChange={(e) => {
            setMoviename(e.target.value);
          }}
        />
        <button id="search-btn" onClick={handlesearch}>
          Search
        </button>
      </div>
      <div id="result">
        {moviedata && (
          <>
            <div className="info">
              <img
                src={moviedata.Poster}
                className="poster"
                alt={moviedata.Title}
              />
              <div>
                <h2>{moviedata.Title}</h2>
                <div className="rating">
                  <img src="/star.png" alt="star" />
                  <h4>{moviedata.imdbRating}</h4>
                </div>
                <div className="details">
                  <span>{moviedata.Rated}</span>
                  <span>{moviedata.Year}</span>
                  <span>{moviedata.Runtime}</span>
                </div>
                <div className="genre">
                  {moviedata.Genre.split(",").map((genre, index) => (
                    <div className="genre" key={index}>
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h3>Plot:</h3>
            <p>{moviedata.Plot}</p>
            <h3>Cast:</h3>
            <p>{moviedata.Actors}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
