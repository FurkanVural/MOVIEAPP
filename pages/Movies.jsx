import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
const api_key = "fc54b4a99dc94ccc1b6b05378dbdd615";
const page = 1;
const language = "tr-TR";
const apiUrl = `https://api.themoviedb.org/3`;
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(
          `${apiUrl}/movie/popular?api_key=${api_key}&page=${page}&language=${language}`,
        );
        if (!response.ok) {
          throw new Error("Hata oluştu.");
        }
        const data = await response.json();
        if (data.success) {
          setMovies(data.results);
        }
        setMovies(data.results);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }

    getMovies();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }
  return (
    <>
      <div className=" my-3">
        <div className="card">
          <div className="card-header">
            <h2 className="title h5 mb-0">Movie List</h2>
          </div>
          <div className="card-body">
            {movies.length == 0 ? (
              <div>Film bulunamadı</div>
            ) : (
              <div
                id="movie-list"
                className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-2"
              >
                {movies.map((m, index) => (
                  <Movie key={index} movieObj={m} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
