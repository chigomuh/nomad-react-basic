import { IMAGE_API_PATH } from "../Config";
import placeholderImage from "../img/placeholderImage.png";

const ActorCard = ({ actor }) => {
  return (
    <div className="py-4">
      <img
        src={
          actor.profile_path === null
            ? placeholderImage
            : `${IMAGE_API_PATH}/w500${actor.profile_path}`
        }
        alt={actor.name}
        className="w-32 h-40 rounded-md"
      />
      <div>
        <div className="w-32 text-sm">{actor.name}</div>
        <div className="text-xs md:text-sm text-[#d2d2d2] w-32">
          {actor.character} 역
        </div>
      </div>
    </div>
  );
};

export default ActorCard;
