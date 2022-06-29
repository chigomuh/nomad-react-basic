import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, MOVIE_API_PATH, IMAGE_API_PATH } from "../Config";
import VideoCard from "../components/VideoCard";

function Detail() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [videos, setVideos] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
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
  console.log(actors);
  if (loading) return <div>로딩중...</div>;

  if (movie.length !== 0) {
    return (
      <>
        <div
          className="w-full relative"
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
        </div>
        <div>
          <span>{movie?.release_date.slice(0, 4)}</span>
          <span>{movie.production_countries[0]?.iso_3166_1}</span>
          <span>{movie?.vote_average}</span>
        </div>
        <div>{movie?.title}</div>
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
      </>
    );
  }
}

export default Detail;
