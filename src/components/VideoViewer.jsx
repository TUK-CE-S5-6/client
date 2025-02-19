// VideoViewer.js
import React, { useState, useContext, useEffect } from 'react';
import { VideoContext } from './VideoContext';

function VideoViewer() {
  const [videoFile, setVideoFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const {
    videoData,
    setVideoData,
    videoURL,
    setVideoURL,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    videoRef,
  } = useContext(VideoContext);

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // 서버 업로드 함수 (기존 기능)
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      alert('파일을 선택하세요!');
      return;
    }
    const formData = new FormData();
    formData.append('file', videoFile);

    try {
      const uploadResponse = await fetch('http://localhost:8000/upload-video', {
        method: 'POST',
        body: formData,
      });
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        setResponseMessage(`업로드 실패: ${errorData.detail}`);
        return;
      }
      const uploadResult = await uploadResponse.json();
      setResponseMessage('서버 업로드 성공!');
      // 서버에서 받은 영상 정보를 저장 (필요시)
      setVideoData(uploadResult);
      // video 객체의 file_name을 이용해 영상 URL 생성
      const url = `http://localhost:8000/videos/${uploadResult.video.file_name}`;
      setVideoURL(url);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('서버 업로드 오류 발생.');
    }
  };

  // 클라이언트 업로드 함수: 서버에 전송하지 않고, Blob URL을 생성하여 VideoContext에 업데이트
  const handleClientUpload = (e) => {
    e.preventDefault();
    if (!videoFile) {
      alert('파일을 선택하세요!');
      return;
    }
    const localUrl = URL.createObjectURL(videoFile);
    setVideoURL(localUrl);
    setVideoData({ video: { file_name: videoFile.name } });
    setResponseMessage('클라이언트 업로드 성공!');
    // URL이 변경되면 강제로 video 요소를 다시 로드하여 loadedmetadata 이벤트를 트리거
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  // onLoadedMetadata와 onTimeUpdate 이벤트를 <video> 요소에 직접 적용
  const handleLoadedMetadata = (e) => {
    console.log("loadedmetadata 이벤트 발생, duration:", e.target.duration);
    setDuration(e.target.duration);
  };

  const handleTimeUpdate = (e) => {
    console.log("timeupdate 이벤트 발생, currentTime:", e.target.currentTime);
    setCurrentTime(e.target.currentTime);
  };

  return (
    <div>
      <h1>VideoViewer (영상 업로드 및 표시)</h1>
      <form>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit" onClick={handleUpload}>서버 업로드</button>
        <button type="button" onClick={handleClientUpload}>클라이언트 업로드</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      {videoURL && (
        <div>
          <h2>업로드된 영상</h2>
          <video
            ref={videoRef}
            width="600"
            controls
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={videoURL} type="video/mp4" />
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
        </div>
      )}
    </div>
  );
}

export default VideoViewer;
