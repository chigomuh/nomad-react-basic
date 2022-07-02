import VideoCard from "../components/VideoCard";
import ActorCard from "../components/ActorCard";
import { IMAGE_API_PATH } from "../Config";

const DetailPage = ({ movie, videos, actors, navigateHome, mobile }) => {
  let backImage = null;
  if (!movie.isLoading) {
    if (movie.length !== 0 && movie.backdrop_path) {
      backImage = movie.backdrop_path;
    } else {
      backImage = movie.poster_path;
    }
  }

  return (
    <>
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
          className="fixed md:absolute top-4 right-4 w-9 h-9 flex justify-center items-center bg-[#181818]/[.8] rounded-full"
          onClick={navigateHome}
        >
          <div className="absolute w-[20px] h-[2px] bg-white rotate-45"></div>
          <div className="absolute w-[20px] h-[2px] bg-white -rotate-45"></div>
        </button>
        <div className="absolute left-[5%] bottom-[10%] md:text-2xl text-lg font-bold md:font-medium">
          {movie?.title}
        </div>
      </div>
      <div className="px-[5%]">
        <div className="md:flex w-full">
          <div className="md:w-2/3 md:pr-8">
            <div className="flex items-center py-8">
              <span className="mr-2">{movie?.release_date.slice(0, 4)}</span>
              {movie.production_countries.length !== 0 && (
                <span className="mr-2 px-1 font-bold border-white border">
                  {movie.production_countries[0]?.iso_3166_1}
                </span>
              )}
              {movie.vote_average !== 0 ? (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.vote_average}
                </span>
              ) : null}
            </div>
            <div>
              <div className="pb-4 italic text-xl font-bold">
                {movie?.tagline}
              </div>
              <div className="text-sm md:text-md">{movie?.overview}</div>
            </div>
          </div>
          <div className="md:w-1/3 py-8">
            {actors.length !== 0 && (
              <div className="pb-4">
                <span className="text-[#777777] font-bold">출연: </span>
                {actors.slice(0, 3).map((actor) => {
                  return (
                    <span
                      key={actor.id}
                      className="text-[#777777] md:text-white"
                    >
                      {actor.name},{" "}
                    </span>
                  );
                })}
                <button
                  className="text-sm md:italic opacity-90"
                  onClick={() => (window.location.href = "#actors")}
                >
                  더 보기
                </button>
              </div>
            )}
            {movie.genres !== 0 && (
              <div className="pb-4">
                <span className="text-[#777777] font-bold">장르: </span>
                {movie.genres.map((genre, index) => {
                  let splitText = ", ";

                  if (index === Object.keys(movie.genres).length - 1) {
                    splitText = "";
                  }
                  return (
                    <span
                      key={genre.id}
                      className="text-[#777777] md:text-white"
                    >
                      {genre.name}
                      {splitText}
                    </span>
                  );
                })}
              </div>
            )}
            {movie.runtime !== 0 ? (
              <div>
                <span className="text-[#777777] font-bold">러닝타임: </span>
                <span className="text-[#777777] md:text-white">
                  {Math.floor(movie?.runtime / 60)}시간 {movie?.runtime % 60}분
                </span>
              </div>
            ) : null}
          </div>
        </div>
        {videos.length !== 0 && (
          <div className="mt-20 border-b-2 border-[#777777]">
            <div className="text-xl md:text-2xl font-bold pb-8">회차</div>
            {videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                mobile={mobile}
              />
            ))}
          </div>
        )}
        {actors.length !== 0 && (
          <div className="border-b-2 border-[#777777] mt-12 mb-20 pb-4">
            <div
              className="text-xl md:text-2xl font-bold pt-8 pb-8"
              id="actors"
            >
              출연 배우
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 justify-items-center">
              {actors.map((actor) => (
                <ActorCard key={actor.id} actor={actor} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailPage;
