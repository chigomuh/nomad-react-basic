import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MainMovie from "../components/MainMovie";
import { API_KEY, MOVIE_API_PATH } from "../Config";
import MovieContentBlock from "../components/MovieContentBlock";
import { Outlet } from "react-router-dom";

function Home() {
  const [genres, setGenres] = useState([]);
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRaterMovies] = useState([]);
  const [upComingMovies, setupComingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const movieUrl = {
    nowPlaying: `${MOVIE_API_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko&region=KR&page=1`,
    popular: `${MOVIE_API_PATH}/movie/popular?api_key=${API_KEY}&language=ko&region=KR&page=1`,
    topRate: `${MOVIE_API_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko&region=KR&page=1`,
    upComing: `${MOVIE_API_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko&region=KR&page=1`,
  };

  const mainMovies = nowMovies.filter((movie) => {
    return movie.backdrop_path;
  });
  const randomIndex = Math.floor(Math.random() * mainMovies.length);
  const mainMovie = mainMovies[randomIndex];

  const postMovies = (movies) => {
    return movies.filter((movie) => {
      return movie.poster_path;
    });
  };

  const getMovies = async (url, setStateFunc, isEnd = false) => {
    const json = await (await fetch(url)).json();
    const filterMovies = postMovies(json.results);
    setStateFunc([...nowMovies, ...filterMovies]);

    if (isEnd) {
      setLoading(false);
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
    getMovies(movieUrl.nowPlaying, setNowMovies);
    getMovies(movieUrl.popular, setPopularMovies);
    getMovies(movieUrl.topRate, setTopRaterMovies);
    getMovies(movieUrl.upComing, setupComingMovies, true);
    getMovieGenre();
  }, []);

  if (loading === true) return <div>로딩중...</div>;

  return (
    <div className="overflow-x-hidden overflow-y-scroll bg-black text-white h-screen w-screen">
      <Navbar />
      <div>
        <MainMovie movie={mainMovie} genres={genres} />
        {nowMovies && (
          <>
            <div className="px-2 pt-4 text-lg font-medium">
              <h1 className="2xl:text-2xl">지금 상영 중인 콘텐츠</h1>
            </div>
            <MovieContentBlock
              id="nowMovies"
              movies={nowMovies}
              url={movieUrl.nowPlaying}
            />
          </>
        )}

        <div className="px-2 pt-4 text-lg font-medium">
          <h1 className="2xl:text-2xl">지금 뜨는 콘텐츠</h1>
        </div>
        <MovieContentBlock
          id="popularMovies"
          movies={popularMovies}
          url={movieUrl.popular}
        />

        <div className="px-2 pt-4 text-lg font-medium">
          <h1 className="2xl:text-2xl">대한민국 인기 콘텐츠</h1>
        </div>
        <MovieContentBlock
          id="topRateMovies"
          movies={topRatedMovies}
          url={movieUrl.topRate}
        />

        <div className="px-2 pt-4 text-lg font-medium">
          <h1 className="2xl:text-2xl">새로 올라온 콘텐츠</h1>
        </div>
        <MovieContentBlock
          id="upComingMovies"
          movies={upComingMovies}
          url={movieUrl.upComing}
        />
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
