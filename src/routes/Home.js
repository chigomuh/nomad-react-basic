import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Navbar from "../components/Navbar";
import MainMovie from "../components/MainMovie";
import { API_KEY, IMAGE_API_PATH, MOVIE_API_PATH } from "../Config";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  const getMovies = async (pages) => {
    if (movies.length === (pages - 1) * 20) {
      const json = await (
        await fetch(
          `${MOVIE_API_PATH}/now_playing?api_key=${API_KEY}&language=ko&page=${pages}&region=KR`
        )
      ).json();
      setMovies([...movies, ...json.results]);
      setLoading(false);
      setNextPage(nextPage + 1);
    }
  };

  useEffect(() => {
    getMovies(nextPage);
  }, []);

  const fetchMovies = () => {
    getMovies(nextPage);
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <h1>로딩중...</h1>
      ) : (
        <div>
          <MainMovie movie={movies[0]} />
          {movies.slice(1).map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              posters={movie.poster_path}
              title={movie.title}
            />
          ))}
          <button onClick={fetchMovies}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default Home;
