import { useQuery } from "react-query";
import { useMatch, useParams } from "react-router-dom";
import { API_KEY, MOVIE_API_PATH } from "../Config";
import Movie from "../components/Movie";
import Navbar from "../components/Navbar";
import Detail from "./Detail";

const Search = () => {
  const params = useParams();
  const show = useMatch("/search/:title/:id");

  const getSearchMovies = async () => {
    const response = await fetch(
      `${MOVIE_API_PATH}/search/movie?api_key=${API_KEY}&language=ko&query=${params.title}`
    );
    const json = await response.json();

    return json;
  };

  const searchMovies = useQuery("searchMovies", getSearchMovies);

  const isLoading = searchMovies.isLoading;
  const isError = searchMovies.isError;

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러...</div>;

  return (
    <>
      <Navbar />
      <div className="w-full h-auto min-h-screen bg-[#141414] px-1 md:px-10 pt-20 md:pt-40">
        <div className="text-white px-6 md:px-2 mb-6">
          <span className="text-[#777777]">다음과 관련된 콘텐츠: </span>
          <span>{params.title}</span>
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
            />
          ))}
        </div>
      </div>
      {show ? <Detail /> : null}
    </>
  );
};

export default Search;
