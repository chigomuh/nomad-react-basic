import Navbar from "../components/Navbar";
import MainMovie from "../components/MainMovie";
import { API_KEY, MOVIE_API_PATH } from "../Config";
import MovieContentBlock from "../components/MovieContentBlock";
import { useLocation, useMatch } from "react-router-dom";
import Detail from "./Detail";
import { useQuery } from "react-query";

function Home() {
  const location = useLocation();
  const show = useMatch("/movie/:id");

  const movieUrl = {
    nowPlaying: `${MOVIE_API_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko&region=KR&page=1`,
    popular: `${MOVIE_API_PATH}/movie/popular?api_key=${API_KEY}&language=ko&region=KR&page=1`,
    topRate: `${MOVIE_API_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko&region=KR&page=1`,
    upComing: `${MOVIE_API_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko&region=KR&page=1`,
  };

  const postMovies = (movies) => {
    return movies.filter((movie) => {
      return movie.poster_path;
    });
  };

  const getMovies = async (url) => {
    const json = await (await fetch(url)).json();
    const filterMovies = postMovies(json.results);

    return filterMovies;
  };

  const getMovieGenre = async () => {
    const json = await (
      await fetch(
        `${MOVIE_API_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko`
      )
    ).json();

    return json;
  };

  const nowMovies = useQuery("nowMovies", () => getMovies(movieUrl.nowPlaying));
  const popularMovies = useQuery("popularMovies", () =>
    getMovies(movieUrl.popular)
  );
  const topRatedMovies = useQuery("topRatedMovies", () =>
    getMovies(movieUrl.topRate)
  );
  const upComingMovies = useQuery("upComingMovies", () =>
    getMovies(movieUrl.upComing)
  );
  const genres = useQuery("genres", getMovieGenre);

  const backMovies = (movies) => {
    return movies?.filter((movie) => {
      return movie.backdrop_path;
    });
  };
  let mainMovies = null;
  let randomIndex = null;
  let mainMovie = null;

  if (!nowMovies.isLoading) {
    mainMovies = backMovies(nowMovies.data);
    randomIndex = Math.floor(new Date().getHours() / 2);
    mainMovie = mainMovies[randomIndex];
  }

  const isLoading =
    nowMovies.isLoading ||
    popularMovies.isLoading ||
    topRatedMovies.isLoading ||
    upComingMovies.isLoading;

  const isError =
    nowMovies.isError ||
    popularMovies.isError ||
    topRatedMovies.isError ||
    upComingMovies.isError;

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러...</div>;

  return (
    <>
      <div
        className="overflow-x-hidden overflow-y-scroll bg-black text-white h-screen w-screen z-0"
        style={{
          position: location.pathname === "/" ? "relative" : "fixed ",
        }}
      >
        <div>
          <Navbar />
          {mainMovie && (
            <MainMovie movie={mainMovie} genres={genres.data.genres} />
          )}
          {nowMovies.data && (
            <>
              <div className="px-2 pt-4 text-lg font-medium">
                <h1 className="2xl:text-2xl">지금 상영 중인 콘텐츠</h1>
              </div>
              <MovieContentBlock
                id="nowMovies"
                movies={nowMovies.data}
                url={movieUrl.nowPlaying}
              />
            </>
          )}

          <div className="px-2 pt-4 text-lg font-medium">
            <h1 className="2xl:text-2xl">지금 뜨는 콘텐츠</h1>
          </div>
          <MovieContentBlock
            id="popularMovies"
            movies={popularMovies.data}
            url={movieUrl.popular}
          />

          <div className="px-2 pt-4 text-lg font-medium">
            <h1 className="2xl:text-2xl">대한민국 인기 콘텐츠</h1>
          </div>
          <MovieContentBlock
            id="topRateMovies"
            movies={topRatedMovies.data}
            url={movieUrl.topRate}
          />

          <div className="px-2 pt-4 text-lg font-medium">
            <h1 className="2xl:text-2xl">새로 올라온 콘텐츠</h1>
          </div>
          <MovieContentBlock
            id="upComingMovies"
            movies={upComingMovies.data}
            url={movieUrl.upComing}
          />
        </div>
      </div>
      {show ? <Detail /> : null}
    </>
  );
}

export default Home;
