import { Link } from "react-router-dom";
import { IMAGE_API_PATH } from "../Config";
import { useRef } from "react";
import noImage from "../img/noImage.png";

function Movie({ id, posters, title, width, type, searchTitle, content }) {
  let poster_path;
  if (posters) {
    poster_path = `${IMAGE_API_PATH}/w500${posters}`;
  } else {
    poster_path = noImage;
  }

  const height = useRef(160);
  const is3xl = useRef(false);

  window.matchMedia("(min-width: 1537px)").addEventListener("change", () => {
    height.current = 360;
    is3xl.current = true;
  });

  return (
    <Link
      to={
        type === "search" ? `/search/${searchTitle}/${id}` : `/${content}/${id}`
      }
      className="flex justify-center"
    >
      <div
        className={
          type === "search"
            ? `px-1 hover:scale-110 py-4`
            : `px-1 md:hover:scale-150 md:hover:z-10 transition-all ease-out md:hover:mx-8 duration-300 2xl:hover:scale-110 2xl:hover:mx-4`
        }
      >
        <img
          className="rounded-lg transition-none"
          style={{
            height: `${height}px`,
            width: `${width}px`,
          }}
          src={poster_path}
          alt={title}
        />
        {!posters && (
          <div className="text-white text-xs flex justify-center">
            {title.slice(0, 15)}
          </div>
        )}
      </div>
    </Link>
  );
}

export default Movie;
