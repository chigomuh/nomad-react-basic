import { useQuery } from "react-query";
import { useMatch, useParams } from "react-router-dom";
import { API_KEY, MOVIE_API_PATH } from "../Config";
import Movie from "../components/Movie";
import Navbar from "../components/Navbar";
import Detail from "./Detail";

const Search = () => {
  const params = useParams();
  const match = useMatch("/search/:title/:content/:id");

  const getSearchContents = async (content) => {
    const response = await fetch(
      `${MOVIE_API_PATH}/search/${content}?api_key=${API_KEY}&language=ko&query=${params.title}`
    );
    const json = await response.json();

    return json;
  };

  const searchMovies = useQuery("searchMovies", () =>
    getSearchContents("movie")
  );
  const searchTvs = useQuery("searchTvs", () => getSearchContents("tv"));

  const isLoading = searchMovies.isLoading || searchTvs.isLoading;
  const isError = searchMovies.isError || searchTvs.isError;

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러...</div>;

  return (
    <>
      <Navbar />
      <div className="relative w-full h-auto min-h-screen bg-[#141414] px-1 md:px-10 pt-20 md:pt-40">
        <div className="text-white px-6 md:px-2 mb-6">
          <span className="text-[#777777]">다음과 관련된 콘텐츠: </span>
          <span>{params.title}</span>
        </div>
        <div className="text-white px-6 md:px-2 mb-6 text-xl">
          영화 검색 결과
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 bg-[#141414] justify-center items-center">
          {searchMovies.data.results.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              posters={movie.poster_path}
              title={movie.title}
              width={"130"}
              type="search"
              searchTitle={params.title}
              content="movie"
            />
          ))}
        </div>
        <div className="text-white px-6 md:px-2 mb-6 text-xl mt-8">
          TV 검색 결과
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 bg-[#141414] justify-center items-center">
          {searchTvs.data.results.map((tv) => (
            <Movie
              key={tv.id}
              id={tv.id}
              posters={tv.poster_path}
              title={tv.name}
              width={"130"}
              type="search"
              searchTitle={params.title}
              content="tv"
            />
          ))}
        </div>
        {match ? <Detail content={match.params.content} /> : null}
      </div>
    </>
  );
};

export default Search;
