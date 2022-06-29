import MovieContainer from "../components/MovieContainer";
import { useRef } from "react";

function MovieContentBlock({ id, movies, url }) {
  const movieContainer = useRef(null);
  const popularPrevTranslate = useRef(0);
  const popularContainer = useRef(null);
  const popularNextPage = useRef(2);

  const buttonLeft = (container, prev, goLeftWidth) => {
    if (-prev.current < goLeftWidth) {
      goLeftWidth = -prev.current;
    }

    const translate = prev.current + goLeftWidth;
    movieContainer.current.setTranslatePc(container.current, translate);
    prev.current += goLeftWidth;
  };

  const buttonRight = (container, prev, goRightWidth, nextPage) => {
    const totalWidth = Number(
      container.current.style.width.slice(0, -2) - window.innerWidth
    );

    if (totalWidth + prev.current < goRightWidth) {
      goRightWidth = totalWidth + prev.current;
      movieContainer.current.fetchMoreMoviePc(
        nextPage.current,
        container.current
      );
      nextPage.current += 1;
    }

    const translate = prev.current - goRightWidth;
    movieContainer.current.setTranslatePc(container.current, translate);
    prev.current -= goRightWidth;
  };

  return (
    <>
      <div className="relative">
        <button
          className="hidden md:block opacity-0 hover:opacity-100 hover:bg-transparent/[.2] absolute z-10 top-0 left-0 h-full duration-300 transition-transform"
          onClick={() =>
            buttonLeft(popularContainer, popularPrevTranslate, 500)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 lg:w-20 lg:h-20 hover:scale-125 duration-300 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div
          id={id}
          className="p-2 transition-transform duration-100 md:duration-500 ease-out"
          ref={popularContainer}
        >
          <MovieContainer
            id={id}
            currentMovies={movies}
            ref={movieContainer}
            url={url}
          />
        </div>
        <button
          className="hidden md:block opacity-0 hover:opacity-100 hover:bg-transparent/[.2] absolute z-10 top-0 right-0 h-full duration-300 transition-transform"
          onClick={() =>
            buttonRight(
              popularContainer,
              popularPrevTranslate,
              500,
              popularNextPage
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 lg:w-20 lg:h-20 hover:scale-125 duration-300 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default MovieContentBlock;
