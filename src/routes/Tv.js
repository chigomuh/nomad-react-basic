import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import MainMovie from "../components/MainMovie";
import MovieContentBlock from "../components/MovieContentBlock";
import Navbar from "../components/Navbar";
import { API_KEY, MOVIE_API_PATH } from "../Config";
import Detail from "./Detail";

const Tv = () => {
  const show = useMatch("/tv/:id");

  const tvUrl = {
    onTheAir: `${MOVIE_API_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko&page=1`,
    popular: `${MOVIE_API_PATH}/tv/popular?api_key=${API_KEY}&language=ko&page=1`,
    topRate: `${MOVIE_API_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko&page=1`,
  };

  const getTvs = async (url) => {
    const response = await fetch(url);
    const json = await response.json();

    return json;
  };

  const getGenres = async () => {
    const response = await fetch(
      `${MOVIE_API_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko`
    );
    const json = await response.json();

    return json;
  };

  const genres = useQuery("genres", getGenres);
  const onTheAir = useQuery("onTheAir", () => getTvs(tvUrl.onTheAir));
  const popular = useQuery("popular", () => getTvs(tvUrl.popular));
  const topRate = useQuery("topRate", () => getTvs(tvUrl.topRate));

  const isLoading =
    onTheAir.isLoading ||
    popular.isLoading ||
    topRate.isLoading ||
    genres.isLoading;
  const isError =
    onTheAir.isError || popular.isError || topRate.isError || genres.isError;

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러...</div>;

  return (
    <>
      <div
        className="overflow-x-hidden overflow-y-scroll bg-[#141414] text-white h-screen w-screen z-0"
        style={
          {
            // position: location.pathname === "/" ? "relative" : "fixed ",
          }
        }
      >
        <div>
          <Navbar />
          <MainMovie
            movie={onTheAir.data.results[0]}
            genres={genres.data.genres}
          />
          <div className="px-2 pt-4 text-lg font-medium">
            <h1 className="2xl:text-2xl">지금 상영 중인 콘텐츠</h1>
          </div>
          <MovieContentBlock
            id="onTheAir"
            movies={onTheAir.data.results}
            url={tvUrl.onTheAir}
            content="tv"
          />
          <div className="px-2 pt-4 text-lg font-medium">
            <h1 className="2xl:text-2xl">지금 뜨는 콘텐츠</h1>
          </div>
          <MovieContentBlock
            id="popular"
            movies={popular.data.results}
            url={tvUrl.popular}
            content="tv"
          />
          <div className="px-2 pt-4 text-lg font-medium">
            <h1 className="2xl:text-2xl">대한민국 인기 콘텐츠</h1>
          </div>
          <MovieContentBlock
            id="topRate"
            movies={topRate.data.results}
            url={tvUrl.topRate}
            content="tv"
          />
        </div>
      </div>
      {show ? <Detail content="tv" /> : null}
    </>
  );
};

export default Tv;
