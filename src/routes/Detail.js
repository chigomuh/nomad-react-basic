import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../Config";

function Detail() {
  const { id } = useParams();
  const movieId = id[0];
  const movieSeq = id.slice(1);
  const [movie, setMovie] = useState();
  const [actors, setActors] = useState();
  const [actorCount, setActorCount] = useState(3);
  const [summary, setSummary] = useState(255);

  const getMovie = async () => {
    const json = await (
      await fetch(
        `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${API_KEY}&movieId=${movieId}&movieSeq=${movieSeq}`
      )
    ).json();

    setMovie(json.Data[0].Result[0]);
    setActors(json.Data[0].Result[0].actors.actor);
  };

  useEffect(() => {
    getMovie();
  }, []);

  function ShowActor({ actors, actorIndex }) {
    return (
      <>
        {actors.slice(0, actorIndex).map((actor, index) => (
          <span key={index}>{actor.actorNm}</span>
        ))}
      </>
    );
  }

  let plotText = "";
  let imageSrc = "";
  if (movie !== undefined) {
    plotText =
      movie.plots.plot[0].plotText.length <= summary
        ? movie.plots.plot[0].plotText
        : `${movie.plots.plot[0].plotText.slice(0, summary)}...`;
  }

  return (
    <div>
      {movie && (
        <div>
          <img src={imageSrc} alt={movie.title} />
          <div>{movie.title}</div>
          <div>
            {plotText}
            {summary <= movie.plots.plot[0].plotText.length ? (
              <button onClick={() => setSummary((summary) => summary + 255)}>
                더보기
              </button>
            ) : null}
          </div>
          {actors && <ShowActor actors={actors} actorIndex={actorCount} />}
          {actorCount <= actors.length ? (
            <button
              onClick={() => setActorCount((actorCount) => actorCount + 10)}
            >
              더보기
            </button>
          ) : null}
          <div>{movie.genre}</div>
          <div>{movie.rating}</div>
          <div>{movie.runtime}분</div>
          <div>{movie.company}</div>
          <div>{movie.directors.director[0].directorNm}</div>
          <div>{movie.keywords}</div>
          <div>{movie.repRlsDate.slice(0, 6)}</div>
        </div>
      )}
    </div>
  );
}

export default Detail;
