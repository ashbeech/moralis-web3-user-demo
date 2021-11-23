import React from "react";

const BackgroundVideo = ({ videoSources, posterSource, children, blur }) => {
  // const video = React.useRef(null);
  // React.useEffect(() => {
  //   console.log(video.current.style);
  //   video.current.style.filter = "blur(10px)";
  // }, []);

  /*   let desktopVideo = false;
  let tabletVideo = false;
  let mobileVideo = false;

  const getVideoSrc = (width) => {
    if (width >= 1080) return (desktopVideo = true);
    if (width >= 720) return (tabletVideo = true);
    return (mobileVideo = true);
  }; */

  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  //const src = getVideoSrc(window.innerWidth);
  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };

  // todo: allow for mobile and tablet targeted videos
  /*   if (desktopVideo == true) {
    videoSources = videoSources;
    posterSource = posterSource;
  } */

  return (
    <>
      <div className="video-container">
        <img
          src={posterSource}
          className="video-thumb tiny"
          alt="thumb"
          style={{ display: isVideoLoaded ? "none" : "block" }} // { opacity: isVideoLoaded ? 0 : 1 },
        />
        <video
          autoPlay="autoplay"
          loop="loop"
          muted
          playsInline
          // ref={video}
          id="video-id"
          className="video"
          poster={posterSource}
          onLoadedData={onLoadedData}
          style={{
            filter: `blur(${blur}px)`,
            WebkitFilter: `blur(${blur}px)`,
            opacity: isVideoLoaded ? 1 : 0,
          }}
        >
          {/* TODO make it accept multiple media types */}
          <source src={videoSources.webm} type="video/webm" />
          <source src={videoSources.mp4} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {children}
      </div>
      {/* <span id="video-bottom"></span> */}
    </>
  );
};

export default BackgroundVideo;
