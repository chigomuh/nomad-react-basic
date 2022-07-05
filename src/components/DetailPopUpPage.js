import infoIcon from "../img/infoIcon.png";
import { IMAGE_API_PATH } from "../Config";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const DetailPopUpPage = ({ movie, videos, moveDetailPage, content }) => {
  const navigate = useNavigate();
  const popupRoot = useRef(null);

  const navigateHome = () => {
    popupRoot.current.classList.add("translate-y-full");
    setTimeout(() => {
      navigate(-1);
    }, 400);
  };

  return (
    <>
      <div
        className="fixed w-screen h-screen z-50 bottom-0"
        onClick={navigateHome}
      ></div>
      <div
        className="fixed bg-[#333333] bottom-0 w-screen h-1/3 rounded-xl z-[101] text-white duration-500 animate-popup"
        ref={popupRoot}
      >
        <div className="p-4 relative">
          <div className="w-full h-auto flex">
            <img
              src={`${IMAGE_API_PATH}/w500${movie.poster_path}`}
              alt={content === "movie" ? movie.title : movie.name}
              className="rounded-md w-24"
            />
            <div className="px-2">
              <div className="text-sm font-bold pb-1">
                {content === "movie" ? movie.title : movie.name}
              </div>
              <div className="flex text-xs pb-1 text-[#777777] space-x-2">
                <div>
                  {content === "movie"
                    ? movie.release_date?.slice(0, 4)
                    : movie.first_air_date.slice(0, 4)}
                </div>
                {movie.production_countries.length !== 0 && (
                  <div>{movie.production_countries[0]?.iso_3166_1}</div>
                )}
                {content === "movie" ? (
                  videos.length !== 0 && <div>에피소드 {videos.length}개</div>
                ) : (
                  <div>에피소드 {movie.number_of_episodes}개</div>
                )}
                {movie.vote_average !== 0 && (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div>{movie.vote_average}</div>
                  </div>
                )}
              </div>
              <div className="text-xs">
                {movie.overview.length <= 100
                  ? movie.overview
                  : `${movie.overview.slice(0, 100)}...`}
              </div>
            </div>
          </div>
          <div
            className="absolute top-0 right-0 m-2 bg-[#777777] w-6 h-6 flex items-center rounded-full justify-center"
            onClick={navigateHome}
          >
            <div className="absolute rotate-45 w-5 h-[2px] bg-white"></div>
            <div className="absolute -rotate-45 w-5 h-[2px] bg-white"></div>
          </div>
        </div>
        <div
          className="absolute w-full p-4 bottom-2 flex justify-between items-center border-t border-[#777777]"
          onClick={moveDetailPage}
        >
          <div className="flex justify-center items-center">
            <img src={infoIcon} alt="infoIcon" className="w-4 h-4 mr-2" />
            <div>회차 및 상세 정보</div>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPopUpPage;
