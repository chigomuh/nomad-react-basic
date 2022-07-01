import { useEffect, useState } from "react";
import { API_KEY, IMAGE_API_PATH, MOVIE_API_PATH } from "../Config";
import infoIcon from "../img/infoIcon.png";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function MainMovie({ movie, genres }) {
  const [movieVideo, setMovieVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  let isMobile = true;
  let mainImage;
  const movieGenres = genres.filter((genre) => {
    return movie.genre_ids.includes(genre.id);
  });

  useEffect(() => {
    fetch(
      `${MOVIE_API_PATH}/movie/${movie.id}/videos?api_key=${API_KEY}&language=ko`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.results.length === 0) {
          setMovieVideo(null);
        } else {
          const YOUTUBE_PATH = `https://www.youtube.com/embed/${response.results[0].key}?autoplay=1&mute=1&rel=0&modestbranding=1`;
          setMovieVideo((prev) => YOUTUBE_PATH);
        }
      });
    setLoading(false);
  }, [movie]);

  if (window.screen.availWidth <= 500) {
    mainImage = `${IMAGE_API_PATH}/original${movie.poster_path}`;
  } else if (movie.backdrop_path) {
    mainImage = `${IMAGE_API_PATH}/original${movie.backdrop_path}`;
    isMobile = false;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-3/5 relative">
          <img
            className="brightness-75 w-full"
            src={mainImage}
            alt={movie.title}
          />
          {isMobile ? (
            <div>
              <div className="absolute w-full bottom-1 h-20 blur-2xl bg-black"></div>
              <div className="absolute w-full text-white bottom-1 flex flex-col items-center h-20">
                <div className="mb-2">
                  {movieGenres.length !== 0 &&
                    movieGenres.map((genre, index) => {
                      let splitText = "▪";
                      if (index + 1 === movieGenres.length) {
                        splitText = "";
                      }
                      return (
                        <span key={genre.id}>
                          {genre.name}
                          {splitText}
                        </span>
                      );
                    })}
                </div>
                <Link to={`/movie/${movie.id}`}>
                  <button className="z-10 justify-center flex flex-col items-center">
                    <img className="w-5 h-5" src={infoIcon} alt="infoIcon" />
                    <span className="font-light text-sm">정보</span>
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div
              className="absolute flex justify-between text-white w-1/2 md:w-[92%] h-auto top-[15%] xl:top-1/3 min-h-80"
              style={{
                left: "4%",
              }}
            >
              <div className="w-1/3 min-h-[288px]">
                <div className="hidden sm:block text-md py-3 font-bold md:text-[1.2vw]">
                  {movie.title}
                </div>
                <div className="hidden md:block py-3 text-[1.2vw] font-light">
                  {movie.overview}
                </div>
                <div>
                  <button className="hidden scale-75 sm:flex md:scale-100 bg-zinc-500 opacity-80 font-bold hover:bg-zinc-600 rounded-md py-2 px-5">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="flex w-full h-full"
                    >
                      <img
                        className="w-6 h-6 mr-3"
                        src={infoIcon}
                        alt="infoIcon"
                      />
                      <span>상세정보</span>
                    </Link>
                  </button>
                </div>
              </div>
              <div className="hidden md:block w-1/3 align-middle min-h-[380px]">
                {movieVideo && (
                  <iframe
                    className="w-full h-full"
                    title={movie.title}
                    src={movieVideo}
                  ></iframe>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MainMovie;
