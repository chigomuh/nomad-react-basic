import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IMAGE_API_PATH } from "../Config";
import { useRef } from "react";

function Movie({ id, posters, title, width }) {
  const poster_path = `${IMAGE_API_PATH}/w500${posters}`;
  const height = useRef(160);

  window
    .matchMedia("(min-width: 1537px)")
    .addEventListener("change", () => (height.current = 360));

  return (
    <Link to={`/movie/${id}`}>
      <div className="px-1 hover:scale-150 hover:z-10 transition-all ease-out hover:mx-6 duration-300">
        <img
          className="rounded-lg transition-none"
          style={{
            height: `${height}px`,
            width: `${width}px`,
          }}
          src={poster_path}
          alt={title}
        />
      </div>
    </Link>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  posters: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Movie;
