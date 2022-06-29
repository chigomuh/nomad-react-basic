function VideoCard({ video }) {
  if (video) {
    return (
      <div>
        <a
          href={`https://www.youtube.com/embed/${video.key}`}
          className="w-12 h-12"
        >
          <div
            className="w-40 h-40 bg-cover"
            style={{
              backgroundImage: `url(https://img.youtube.com/vi/${video.key}/0.jpg)`,
            }}
          ></div>
        </a>
        <div>
          <span>{video.published_at.slice(0, 10)}</span>
          <span>{video.name}</span>
        </div>
      </div>
    );
  }
}

export default VideoCard;
