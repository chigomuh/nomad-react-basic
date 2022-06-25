import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import noImage from "../img/noImage.jpg";
import { IMAGE_API_PATH } from "../Config";

function Movie({ id, posters, title }) {
  let poster;
  if (posters) {
    poster = `${IMAGE_API_PATH}/w500${posters}`;
  } else {
    poster = noImage;
  }

  return (
    <div>
      <div>
        <img src={poster} alt={title} />
        <h2>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  posters: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Movie;
