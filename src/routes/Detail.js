import { useNavigate, useParams } from "react-router-dom";
import { API_KEY, MOVIE_API_PATH } from "../Config";
import { useQuery } from "react-query";
import DetailPage from "../components/DetailPage";
import DetailPopUpPage from "../components/DetailPopUpPage";
import { useState } from "react";

function Detail() {
  let isMobile = false;
  const [isPopUp, setIsPopUp] = useState(true);

  if (window.screen.availWidth <= 500) {
    isMobile = true;
  }
  const navigate = useNavigate();
  const params = useParams();

  const getDetailMovie = async () => {
    const response = await fetch(
      `${MOVIE_API_PATH}/movie/${params.id}?api_key=${API_KEY}&language=ko`
    );
    const json = await response.json();

    return json;
  };

  const getVideos = async () => {
    const response = await fetch(
      `${MOVIE_API_PATH}/movie/${params.id}/videos?api_key=${API_KEY}&language=ko`
    );
    const json = await response.json();

    return json.results;
  };

  const getActors = async () => {
    const response = await fetch(
      `${MOVIE_API_PATH}/movie/${params.id}/credits?api_key=${API_KEY}&language=ko`
    );
    const json = await response.json();

    return json.cast;
  };

  const movie = useQuery("movie", getDetailMovie);
  const videos = useQuery("videos", getVideos);
  const actors = useQuery("actors", getActors);

  const navigateHome = () => {
    navigate("/");
  };

  const moveDetailPage = () => {
    setIsPopUp(false);
  };

  const isLoading = movie.isLoading || videos.isLoading || actors.isLoading;
  const isError = movie.isError || videos.isError || actors.isError;

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러...</div>;

  return (
    <>
      {isMobile ? (
        <>
          {isPopUp ? (
            <DetailPopUpPage
              movie={movie.data}
              videos={videos.data}
              moveDetailPage={moveDetailPage}
            />
          ) : (
            <div className="w-full h-auto min-h-screen absolute bg-black text-white">
              <DetailPage
                movie={movie.data}
                videos={videos.data}
                actors={actors.data}
                navigateHome={navigateHome}
                mobile={true}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div
            className="absolute w-screen h-screen top-0 left-0 flex justify-center items-center z-[100] bg-[#181818]/[.7]"
            onClick={navigateHome}
          ></div>
          <div className="absolute w-[70%] h-[90%] top-[5%] left-1/2 max-w-[1250px] bg-[#181818] z-[101] -translate-x-1/2 rounded-lg scrollbar-hide overflow-y-scroll text-white">
            <DetailPage
              movie={movie.data}
              videos={videos.data}
              actors={actors.data}
              navigateHome={navigateHome}
              mobile={false}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Detail;
