import React from "react";
import useCamera from "../hooks/useCamera";

const Photos = () => {
  const { videoRef, takepicture, imageURL, download } = useCamera();
  return (
    <div>
      <div className="media">
        {imageURL ? <img src={imageURL} /> : <video ref={videoRef}></video>}
        <div className="btns">
          <button className="take" onClick={takepicture}>
            {imageURL ? "Retake" : "Take"}
          </button>
          {imageURL && <button onClick={download} className="take">Download</button>}
        </div>
      </div>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Photos;
