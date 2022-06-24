import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Navbar from "../components/Navbar";
import API_KEY from "../key";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const getMovies = async (pages, items) => {
    const json = await (
      await fetch(
        `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${API_KEY}&releaseDts=20220101&startCount=${pages}&listCount=${items}&nation=대한민국&detail=Y`
      )
    ).json();
    setMovies([...movies, ...json.Data[0].Result]);
    setLoading(false);
    setCurrentPage((currentPage) => currentPage + items);
  };

  useEffect(() => {
    getMovies(currentPage, 10);
  }, []);

  const fetchMovies = () => {
    getMovies(currentPage, 20);
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <h1>로딩중...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.DOCID}
              id={movie.DOCID}
              posters={movie.posters}
              title={movie.title}
              plotText={movie.plots.plot[0].plotText}
              genre={movie.genre}
            />
          ))}
          <button onClick={fetchMovies}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default Home;
