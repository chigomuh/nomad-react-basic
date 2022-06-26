import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IMAGE_API_PATH } from "../Config";

function Movie({ id, posters, title }) {
  const poster_path = `${IMAGE_API_PATH}/w500${posters}`;

  return (
    <Link to={`/movie/${id}`}>
      <div className="w-full px-1">
        <img className="rounded-lg" src={poster_path} alt={title} />
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
