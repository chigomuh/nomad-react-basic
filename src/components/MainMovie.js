import { useEffect, useState } from "react";
import { API_KEY, IMAGE_API_PATH, MOVIE_API_PATH } from "../Config";
import infoIcon from "../img/infoIcon.png";

function MainMovie({ movie }) {
  let mainImage;
  if (movie.backdrop_path) {
    mainImage = `${IMAGE_API_PATH}/original${movie.backdrop_path}`;
  }
  return (
    <div className="w-full h-3/5">
      <img className="brightness-75" src={mainImage} alt={movie.title} />
      <div
        className="absolute text-white max-w-xl h-auto top-24 sm:top-1/3 md:top-1/4"
        style={{
          left: "4%",
        }}
      >
        <div className="text-xl py-3 font-bold text-[1.2vw]">{movie.title}</div>
        <div className="hidden md:block py-3 text-[1vw]">{movie.overview}</div>
        <button className="flex bg-zinc-500 opacity-80 font-bold hover:bg-zinc-600 rounded-md py-2 px-5">
          <img className="w-6 h-6 mr-3" src={infoIcon} alt="infoIcon" />
          <span>상세정보</span>
        </button>
        <div>동영상</div>
      </div>
    </div>
  );
}

export default MainMovie;
