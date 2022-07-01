import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_KEY, MOVIE_API_PATH, IMAGE_API_PATH } from "../Config";
import VideoCard from "../components/VideoCard";

function Detail() {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [videos, setVideos] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    if (isNaN(params.id)) {
      navigate("/404");
    }
    fetch(`${MOVIE_API_PATH}/movie/${params.id}?api_key=${API_KEY}&language=ko`)
      .then((response) => response.json())
      .then((json) => {
        setMovie(json);
      });

    fetch(
      `${MOVIE_API_PATH}/movie/${params.id}/videos?api_key=${API_KEY}&language=ko`
    )
      .then((response) => response.json())
      .then((json) => setVideos(json.results));

    fetch(
      `${MOVIE_API_PATH}/movie/${params.id}/credits?api_key=${API_KEY}&language=ko`
    )
      .then((response) => response.json())
      .then((json) => setActors(json.cast));

    setLoading(false);
  }, []);

  let backImage = null;
  if (movie.length !== 0 && movie.backdrop_path) {
    backImage = movie.backdrop_path;
  } else {
    backImage = movie.poster_path;
  }

  const navigateHome = () => {
    navigate("/");
  };

  if (loading) return <div>로딩중...</div>;

  if (movie.length !== 0) {
    return (
      <>
        <div
          className="absolute w-screen h-screen top-0 left-0 flex justify-center items-center z-[100] bg-[#181818]/[.7]"
          onClick={navigateHome}
        ></div>
        <div className="absolute w-[70%] h-[90%] top-[5%] left-1/2 max-w-[1250px] bg-[#181818] z-[101] -translate-x-1/2 rounded-lg scrollbar-hide overflow-y-scroll text-white">
          <div
            className="relative w-full"
            style={{
              display: backImage === movie.poster_path ? "flex" : "block",
            }}
          >
            {backImage === movie.poster_path && (
              <div className="w-1/3 bg-black opacity-90"></div>
            )}
            <img
              className=""
              src={`${IMAGE_API_PATH}/original${backImage}`}
              style={{
                width: backImage === movie.poster_path ? "33.33%" : "100%",
              }}
              alt={movie.title}
            />
            <div className="absolute w-full h-[30px] bg-black blur-2xl top-0"></div>
            <div className="absolute w-full h-[30px] bg-black blur-2xl bottom-16"></div>
            {backImage === movie.poster_path && (
              <div className="w-1/3 bg-black opacity-90"></div>
            )}
            <button
              className="absolute top-4 right-4 w-9 h-9 flex justify-center items-center bg-[#181818]/[.8] rounded-full"
              onClick={navigateHome}
            >
              <div className="absolute w-[20px] h-[2px] bg-white rotate-45"></div>
              <div className="absolute w-[20px] h-[2px] bg-white -rotate-45"></div>
            </button>
            <div className="absolute left-[5%] bottom-[10%] text-2xl">
              {movie?.title}
            </div>
          </div>
          <div className="px-[5%]">
            <div className="flex w-20 h-16 items-center">
              <span className="mr-2">{movie?.release_date.slice(0, 4)}</span>
              <span className="mr-2 px-1 font-bold border-white border">
                {movie.production_countries[0]?.iso_3166_1}
              </span>
              {movie.vote_average !== 0 ? (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.vote_average}
                </span>
              ) : null}
            </div>
            <div>{movie?.tagline}</div>
            <div>{movie?.overview}</div>
            <div>
              <span>출연: </span>
              {actors.slice(0, 3).map((actor) => {
                return <span key={actor.id}>{actor.name}, </span>;
              })}
              <button>더보기</button>
            </div>
            <div>
              <span>장르: </span>
              {movie.genres?.map((genre, index) => {
                let splitText = ", ";

                if (index === Object.keys(movie.genres).length - 1) {
                  splitText = "";
                }
                return (
                  <span key={genre.id}>
                    {genre.name}
                    {splitText}
                  </span>
                );
              })}
              {movie.runtime !== 0 ? (
                <div>
                  {Math.floor(movie?.runtime / 60)}시간 {movie?.runtime % 60}분
                </div>
              ) : null}
            </div>
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Detail;
