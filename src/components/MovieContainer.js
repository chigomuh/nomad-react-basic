import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Movie from "./Movie";

const MovieContainer = forwardRef(({ id, currentMovies, url }, ref) => {
  const [movies, setMovies] = useState(currentMovies);
  let element = null;
  let cardWidth = 130;
  let URL = url.slice(0, -1);

  if (window.innerWidth > 1536) {
    cardWidth = 300;
  }

  useImperativeHandle(ref, () => ({
    setTranslatePc,
    fetchMoreMoviePc,
  }));

  function setTranslatePc(element, translate) {
    element.style.transform = `translateX(${translate}px)`;
  }

  function fetchMoreMoviePc(nextPage, element) {
    getMovies(nextPage, element);
  }

  useEffect(() => {
    element = document.querySelector(`#${id}`);

    element.style.width = `${cardWidth * movies.length}px`;

    // 터치 이벤트
    element.addEventListener("touchstart", touchStart(element));
    element.addEventListener("touchend", touchEnd);
    element.addEventListener("touchmove", touchMove);
  }, []);

  const getMovies = async (pages, element) => {
    const json = await (await fetch(`${URL}${pages}`)).json();

    if (json.results.length !== 0) {
      const filterMovies = json.results.filter((movie) => {
        return movie.poster_path;
      });
      element.style.width = `${
        Number(element.style.width.slice(0, -2)) +
        cardWidth * filterMovies.length
      }px`;

      setMovies((prev) => [...prev, ...filterMovies]);
    }
  };

  const fetchMoreMovie = (nextPage, maxWidth) => {
    getMovies(nextPage, element);
    prev.current = -maxWidth;
  };

  // 변수
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let animationID = 0;
  const prev = useRef(0);
  let totalTranslate = 0;

  // 오른쪽 클릭 방지
  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  function touchStart(element) {
    return function (event) {
      startPos = getPositionX(event);
      isDragging = true;
      animationID = requestAnimationFrame(() => animation(element));
    };
  }

  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    prev.current += currentTranslate;
  }
  let page = 2;

  function touchMove(event) {
    const maxWidth = Number(this.style.width.slice(0, -2) - window.innerWidth);
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = currentPosition - startPos;
      totalTranslate = prev.current + currentTranslate;

      if (totalTranslate >= 0) {
        totalTranslate = 0;
        prev.current = 0;
      } else if (totalTranslate <= -maxWidth) {
        totalTranslate = -maxWidth;
        prev.current = -maxWidth;
        setTimeout(() => {
          fetchMoreMovie(page, maxWidth);
          page += 1;
        }, 1000);
      }
    }
  }

  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }

  function animation(element) {
    setTranslate(element);

    if (isDragging) {
      requestAnimationFrame(() => animation(element));
    }
  }

  function setTranslate(element) {
    element.style.transform = `translateX(${totalTranslate}px)`;
  }

  return (
    <div className={`flex h-full`}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          posters={movie.poster_path}
          title={movie.title}
          width={cardWidth}
        />
      ))}
    </div>
  );
});

export default MovieContainer;
