import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Navbar from "../components/Navbar";
import MainMovie from "../components/MainMovie";
import { API_KEY, MOVIE_API_PATH } from "../Config";
import Loading from "../components/Loading";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const mainMovies = movies.filter((movie) => {
    return movie.backdrop_path;
  });
  const randomIndex = Math.floor(Math.random() * mainMovies.length);
  const mainMovie = mainMovies[randomIndex];

  const postMovies = movies.filter((movie) => {
    return movie.poster_path;
  });

  const getMovies = async (pages) => {
    if (movies.length === (pages - 1) * 20) {
      const json = await (
        await fetch(
          `${MOVIE_API_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko&page=${pages}&region=KR`
        )
      ).json();
      setMovies([...movies, ...json.results]);
      setLoading(false);
      setNextPage(nextPage + 1);
    }
  };

  const getMovieGenre = async () => {
    const json = await (
      await fetch(
        `${MOVIE_API_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko`
      )
    ).json();
    setGenres(json.genres);
  };

  useEffect(() => {
    getMovies(nextPage);
    getMovieGenre();
  }, []);

  const fetchMovies = () => {
    getMovies(nextPage);
  };

  // 변수
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;

  // 오른쪽 클릭 방지
  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  // 터치 이벤트
  const popular = document.querySelector("#popular");
  if (popular) {
    popular.addEventListener("touchstart", touchStart());
    popular.addEventListener("touchend", touchEnd);
    popular.addEventListener("touchmove", touchMove);

    // 마우스 이벤트
    popular.addEventListener("mousedown", touchStart());
    popular.addEventListener("mouseup", touchEnd);
    popular.addEventListener("mouse.leave", touchEnd);
    popular.addEventListener("mousemove", touchMove);
  }

  function touchStart() {
    return function (event) {
      console.log("start");
      console.log(event.type.includes("mouse"));
      isDragging = true;
    };
  }

  function touchEnd() {
    console.log("end");
    isDragging = false;
  }

  function touchMove() {
    if (isDragging) {
    }
  }

  return (
    <div className="overflow-x-hidden overflow-y-scroll bg-black text-white h-screen w-screen">
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <MainMovie movie={mainMovie} genres={genres} />
          <div className="px-2 pt-4 text-lg font-semibold">
            <h1>지금 상영 중인 콘텐츠</h1>
          </div>
          <div
            id="popular"
            className={`ml-2 relative flex h-40 my-2`}
            style={{
              width: `${112 * postMovies.length}px`,
            }}
          >
            {postMovies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                posters={movie.poster_path}
                title={movie.title}
              />
            ))}
            <button onClick={fetchMovies}>더보기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
