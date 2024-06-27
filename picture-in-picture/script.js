const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// prompt to select media stream, pass to video element then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log("error getting that media", error);
  }
}

button.addEventListener("click", async () => {
  //disable btn
  button.disabled = true;

  //start picture in picture
  await videoElement.requestPictureInPicture();

  //reset btn
  button.disabled = false;
});

//on load
selectMediaStream();
