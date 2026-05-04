import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "../index.css";
const api_key = "fc54b4a99dc94ccc1b6b05378dbdd615";
const language = "tr-TR";
const apiUrl = `https://api.themoviedb.org/3`;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  useEffect(() => {
    async function getMovie() {
      try {
        const response = await fetch(
          `${apiUrl}/movie/${id}?api_key=${api_key}&language=${language}&append_to_response=credits`,
        );
        if (!response.ok) {
          throw new Error("Hata oluştu.");
        }
        const data = await response.json();

        setMovie(data);
        setScore(Math.floor(data.vote_average * 10)); // Convert to 0-100 scale
        console.log(data);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }

    getMovie();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }
  return (
    <>
      <div
        className="position-relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left calculate((50vw - 170px)- 340px) top",
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 10.5, 10.5, 0.84) 50%, rgba(31.5, 10.5, 10.5, 0.84) 100%)",
          }}
        >
          <div className="container ">
            <div className="row p-4 position-relative" style={{}}>
              <div className="col-md-3">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-9 text-white">
                <h3>{movie.title}</h3>
                <div className="d-flex flex-column justify-content-center mb-3 mt-3">
                  <div className="d-flex">
                    <div
                      className="scale-1-1"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: "#081c22",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        style={{
                          transform: "rotate(-90deg)",
                        }}
                      >
                        <circle
                          cx="30"
                          cy="30"
                          r="26"
                          fill="none"
                          stroke="#204529"
                          strokeWidth="4"
                        />

                        <circle
                          cx="30"
                          cy="30"
                          r="26"
                          fill="none"
                          stroke="#21d07a"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                        />
                      </svg>

                      <div
                        style={{
                          position: "absolute",
                          display: "flex",
                          alignItems: "flex-start",
                          color: "white",
                          fontWeight: "700",
                          lineHeight: "1",
                        }}
                      >
                        <span style={{ fontSize: "20px" }}>{score}</span>
                      </div>
                    </div>
                    <div
                      className="d-flex align-items-center ms-2"
                      style={{
                        fontWeight: "700",
                        color: "#fff",
                        fontSize: "18px",
                      }}
                    >
                      Üye <br />
                      Puanı
                    </div>
                    <div
                      className="scale-1-1 d-inline-flex align-items-center px-4 py-2 rounded-pill ms-4"
                      style={{
                        background:
                          "linear-gradient(90deg, #0d3b66 0%, #071c2c 100%)",
                        color: "white",
                        fontWeight: "700",
                        fontSize: "18px",
                        gap: "6px",
                      }}
                    >
                      {" "}
                      Senin
                      <span
                        style={{
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                          textDecorationThickness: "2px",
                        }}
                      >
                        Hissiyat'ın
                      </span>
                      nasıl?
                      <i
                        className="bi bi-info-circle-fill"
                        style={{ fontSize: "13px", opacity: 0.95 }}
                      ></i>
                    </div>
                  </div>

                  <div>
                    <ul
                      className="d-flex align-items-center list-unstyled"
                      style={{
                        height: "68px",
                        width: "100%",
                      }}
                    >
                      <li className="me-4" style={{}}>
                        <a
                          className="rounded-circle"
                          href=""
                          style={{
                            padding: "23px 23px",
                            width: "46px",
                            height: "46px",
                            backgroundColor: "#0d3b66",
                          }}
                        >
                          <span className="bi bi-list-task"></span>
                        </a>
                      </li>
                      <li className="me-4">
                        <a
                          href=""
                          style={{
                            width: "46px",
                            height: "46px",
                          }}
                        >
                          <span className="bi bi-list-task"></span>
                        </a>
                      </li>
                      <li className="me-4">
                        <a
                          href=""
                          style={{
                            width: "46px",
                            height: "46px",
                          }}
                        >
                          <span className="bi bi-list-task"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <p>{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
                <p>Süre: {movie.runtime}</p>
                <p>Ülke: {movie.production_countries[0].name}</p>
                <p>Yapımcı: {movie.production_companies[0].name}</p>
                <p>Yönetmen: {movie.credits.crew[0].name}</p>
                <p>Senarist: {movie.credits.crew[1].name}</p>
                <p>Türler:</p>
                <ul className="list-unstyled d-flex flex-wrap">
                  {movie.genres.map((genre) => (
                    <li key={genre.id} className="badge bg-primary me-2 mb-2">
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
