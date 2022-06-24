import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import noImage from "../img/noImage.jpg";

function Movie({ id, posters, title, plotText, genre }) {
  let imageSrc = "";

  if (posters !== "") {
    imageSrc = posters.split("|")[0];
  } else {
    imageSrc = noImage;
  }

  return (
    <div>
      <div>
        <img src={imageSrc} alt={title} />
        <h2>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.string.isRequired,
  posters: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  plotText: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
};

export default Movie;
