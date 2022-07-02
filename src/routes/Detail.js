import { useNavigate, useParams } from "react-router-dom";
import { API_KEY, MOVIE_API_PATH, IMAGE_API_PATH } from "../Config";
import VideoCard from "../components/VideoCard";
import ActorCard from "../components/ActorCard";
import { useQuery } from "react-query";

function Detail() {
  const navigate = useNavigate();
  const params = useParams();

  const getDetailMovie = async () => {
    const response = await fetch(
      `${MOVIE_API_PATH}/movie/${params.id}?api_key=${API_KEY}&language=ko`
    );
    const json = await response.json();

    return json;
  };

  const getVideos = async () => {
    const response = await fetch(
      `${MOVIE_API_PATH}/movie/${params.id}/videos?api_key=${API_KEY}&language=ko`
    );
    const json = await response.json();

    return json.results;
  };

  const getActors = async () => {
    const response = await fetch(
      `${MOVIE_API_PATH}/movie/${params.id}/credits?api_key=${API_KEY}&language=ko`
    );
    const json = await response.json();

    return json.cast;
  };

  const movie = useQuery("movie", getDetailMovie);
  const videos = useQuery("videos", getVideos);
  const actors = useQuery("actors", getActors);

  let backImage = null;
  if (!movie.isLoading) {
    if (movie.data.length !== 0 && movie.data.backdrop_path) {
      backImage = movie.data.backdrop_path;
    } else {
      backImage = movie.data.poster_path;
    }
  }

  const navigateHome = () => {
    navigate("/");
  };

  const isLoading = movie.isLoading || videos.isLoading || actors.isLoading;
  const isError = movie.isError || videos.isError || actors.isError;

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러...</div>;

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
            display: backImage === movie.data.poster_path ? "flex" : "block",
          }}
        >
          {backImage === movie.data.poster_path && (
            <div className="w-1/3 bg-black opacity-90"></div>
          )}
          <img
            className=""
            src={`${IMAGE_API_PATH}/original${backImage}`}
            style={{
              width: backImage === movie.data.poster_path ? "33.33%" : "100%",
            }}
            alt={movie.data.title}
          />
          <div className="absolute w-full h-[30px] bg-black blur-2xl top-0"></div>
          <div className="absolute w-full h-[30px] bg-black blur-2xl bottom-16"></div>
          {backImage === movie.data.poster_path && (
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
            {movie.data?.title}
          </div>
        </div>
        <div className="px-[5%]">
          <div className="flex w-full">
            <div className="w-2/3 pr-8">
              <div className="flex items-center py-8">
                <span className="mr-2">
                  {movie.data?.release_date.slice(0, 4)}
                </span>
                <span className="mr-2 px-1 font-bold border-white border">
                  {movie.data.production_countries[0]?.iso_3166_1}
                </span>
                {movie.data.vote_average !== 0 ? (
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {movie.data.vote_average}
                  </span>
                ) : null}
              </div>
              <div>
                <div className="pb-4 italic text-xl font-bold">
                  {movie.data?.tagline}
                </div>
                <div>{movie.data?.overview}</div>
              </div>
            </div>
            <div className="w-1/3 py-8">
              {actors.data.length !== 0 && (
                <div className="pb-4">
                  <span className="text-[#777777]">출연: </span>
                  {actors.data.slice(0, 3).map((actor) => {
                    return <span key={actor.id}>{actor.name}, </span>;
                  })}
                  <button
                    className="italic"
                    onClick={() => (window.location.href = "#actors")}
                  >
                    더 보기
                  </button>
                </div>
              )}
              {movie.data.genres !== 0 && (
                <div className="pb-4">
                  <span className="text-[#777777]">장르: </span>
                  {movie.data.genres.map((genre, index) => {
                    let splitText = ", ";

                    if (index === Object.keys(movie.data.genres).length - 1) {
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
              )}
              {movie.data.runtime !== 0 ? (
                <div>
                  <span className="text-[#777777]">러닝타임: </span>
                  <span>
                    {Math.floor(movie.data?.runtime / 60)}시간{" "}
                    {movie.data?.runtime % 60}분
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          {videos.data.length !== 0 && (
            <div className="mt-20 border-b-2 border-[#777777]">
              <div className="text-2xl font-bold pb-8">회차</div>
              {videos.data.map((video, index) => (
                <VideoCard key={video.id} video={video} index={index} />
              ))}
            </div>
          )}
          {actors.data.length !== 0 && (
            <div className="border-b-2 border-[#777777] mt-12 mb-20 pb-4">
              <div className="text-2xl font-bold pt-8 pb-8" id="actors">
                출연 배우
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 justify-items-center">
                {actors.data.map((actor) => (
                  <ActorCard key={actor.id} actor={actor} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Detail;
