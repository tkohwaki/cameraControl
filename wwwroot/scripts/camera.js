var localStream;
var localVideo;
function startCamera(video,face,width,height,msg) {
    localVideo = document.getElementById(video);
    var msgarea = document.getElementById(msg);
    var constraint = {
        video: {
            facingMode: {exact: face}, 
            width: {ideal: width}, 
            height: {ideal: height}
        }, 
        audio: false
    };
    navigator.mediaDevices.getUserMedia(constraint)
        .then(function(stream) {
            localStream = stream;
            localVideo.srcObject = stream;
        }).catch(function(err) {
            msgarea.innerHtml = 'カメラが接続されていないか、操作エラーが発生しました。' + err;
        });
    return {Width: localVideo.videoWidth, Height: localVideo.videoHeight};
}
function stopCamera() {
    for(track of localStream.getTracks()) {
        track.stop();
    }
    localStream = null;
    localVideo.pause();
    window.URL.revokeObjectURL(localVideo.src);
}
function captureImage(canvasId) {
    var canvas = document.getElementById(canvasId);
    var w = localVideo.offsetWidth;
    var h = localVideo.offsetHeight;
    canvas.setAttribute("width",w);
    canvas.setAttribute("height",h);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(localVideo,0,0,w,h);
    var url = canvas.toDataURL('image/png');
    return {Url: url, Width: w, Height: h, VideoWidth: localVideo.videoWidth, VideoHeight: localVideo.videoHeight};
}