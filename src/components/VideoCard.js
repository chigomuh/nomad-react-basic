function VideoCard({ video, index }) {
  if (video) {
    return (
      <a
        className="flex w-full h-40 items-center rounded-md border-[#333333] border-b px-6"
        style={{
          backgroundColor: index === 0 ? "#333333" : "transparent",
        }}
        href={`https://www.youtube.com/embed/${video.key}`}
      >
        <div className="px-2 text-2xl">{index + 1}</div>
        <div className="flex justify-center items-center w-60 mx-4">
          <img
            src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
            alt={video.name}
            className="rounded-md"
          />
        </div>
        <div className="px-2 w-full">
          <div className="mb-4 text-lg">{video.published_at.slice(0, 10)}</div>
          <div className="text-[#777777]">{video.name}</div>
        </div>
      </a>
    );
  }
}

export default VideoCard;
