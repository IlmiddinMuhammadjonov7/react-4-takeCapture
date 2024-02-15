import { useEffect, useRef, useState } from "react";

export default () => {
  const videoRef = useRef(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (!imageURL) {
        startVideo() 
    }
  }, [imageURL]);
  const startVideo = () => {
    const video = videoRef.current;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((strem) => {
        video.srcObject = strem;
        video.play();
      })
      .catch((err) => {
        console.error("Ann error occured", err);
      });
  };

  function takepicture() {
    if (imageURL) {
        setImageURL(null)
        startVideo()
        return
    }

    const canvas = document.getElementById('canvas');
    const video = videoRef.current
    const context = canvas.getContext("2d");
      canvas.width = 340;
      canvas.height = 255;
      context.drawImage(video, 0, 0, 340, 255);
  
      const data = canvas.toDataURL("image/png");
      setImageURL(data)
      const stream = video.srcObject
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop()
      })
  }

  const download =()=>{
    const link =document.createElement("a")
    link.download = "mypic.png"
    link.href = imageURL
    link.click()
  }

  return{
    videoRef,
    imageURL,
    takepicture,
    download
  }
};
