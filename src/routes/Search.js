import { useQuery } from "react-query";
import { useMatch, useParams } from "react-router-dom";
import { API_KEY, MOVIE_API_PATH } from "../Config";
import Movie from "../components/Movie";
import Navbar from "../components/Navbar";
import Detail from "./Detail";
import { useState } from "react";

const Search = () => {
  const params = useParams();
  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);
  const match = useMatch("/search/:title/:content/:id");

  const getSearchContents = async (content, page) => {
    const response = await fetch(
      `${MOVIE_API_PATH}/search/${content}?api_key=${API_KEY}&language=ko&query=${params.title}&page=${page}`
    );
    const json = await response.json();

    if (content === "movie") {
      setMoviePage(moviePage + 1);
      setMovies([...movies, ...json.results]);
    } else if (content === "tv") {
      setTvPage(tvPage + 1);
      setTvs([...tvs, ...json.results]);
    }

    return json;
  };

  const getMoreMovies = (content, page) => {
    getSearchContents(content, page);
  };

  const searchMovies = useQuery("searchMovies", () =>
    getSearchContents("movie", moviePage)
  );
  const searchTvs = useQuery("searchTvs", () =>
    getSearchContents("tv", tvPage)
  );

  const isLoading = searchMovies.isLoading || searchTvs.isLoading;
  const isError = searchMovies.isError || searchTvs.isError;

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러...</div>;

  return (
    <div className="overflow-y-hidden">
      <Navbar />
      <div className="relative w-full h-auto min-h-screen bg-[#141414] px-1 md:px-10 pt-20 md:pt-28">
        <div className="text-white px-6 md:px-2 mb-6">
          <span className="text-[#777777]">다음과 관련된 콘텐츠: </span>
          <span>{params.title}</span>
        </div>
        <div className="text-white px-6 md:px-2 mb-6 text-xl mt-10">
          영화 콘텐츠
        </div>
        {searchMovies.data.total_results !== 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 bg-[#141414] justify-center items-center">
              {movies.map((movie, index) => (
                <Movie
                  key={index}
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
            <div className="text-white w-full flex justify-center mt-8">
              {moviePage <= searchMovies.data.total_pages && (
                <button
                  className="font-bold text-xl"
                  onClick={() => getMoreMovies("movie", moviePage)}
                >
                  더보기
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-[#777777] px-6 md:px-2 mb-6 text-xl">
            "{params.title}" 키워드와 관련된 결과가 없습니다.
          </div>
        )}
        <div className="text-white px-6 md:px-2 mb-6 text-xl mt-8">
          TV 콘텐츠
        </div>
        {searchTvs.data.total_results !== 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 bg-[#141414] justify-center items-center">
              {tvs.map((tv, index) => (
                <Movie
                  key={index}
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
            <div className="text-white w-full flex justify-center mt-8 pb-10">
              {tvPage <= searchTvs.data.total_pages && (
                <button
                  className="font-bold text-xl"
                  onClick={() => getMoreMovies("tv", tvPage)}
                >
                  더보기
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-[#777777] px-6 md:px-2 mb-6 text-xl">
            "{params.title}" 키워드와 관련된 결과가 없습니다.
          </div>
        )}
        {match ? <Detail content={match.params.content} /> : null}
      </div>
    </div>
  );
};

export default Search;
