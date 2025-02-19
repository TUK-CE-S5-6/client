// VideoPlaybackControl.js
import React, { useContext, useState, useEffect, useRef } from 'react';
import { VideoContext } from './VideoContext';

function VideoPlaybackControl() {
  const { videoURL, currentTime, duration, videoRef, setCurrentTime } = useContext(VideoContext);
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  // 슬라이더가 렌더링된 후 슬라이더의 너비를 측정
  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  }, [sliderRef, videoURL, duration]);

  // 진행률 (0~1)
  const progress = duration > 0 ? currentTime / duration : 0;
  // 기존 vertical-bar의 left 계산 (더 이상 사용하지 않음)
  // const finalLeft = progress * sliderWidth + 7;

  // 슬라이더 값 변경 시 비디오 currentTime 업데이트
  const handleSliderChange = (e) => {
    const newTime = parseFloat(e.target.value);
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // 재생/일시정지 토글 버튼
  const togglePlayPause = () => {
    const videoEl = videoRef.current;
    if (videoEl) {
      if (videoEl.paused) {
        videoEl.play();
      } else {
        videoEl.pause();
      }
    }
  };

  if (!videoURL) return <p>영상이 업로드되지 않았습니다.</p>;

  return (
    <>
      {/* 내부 스타일 (슬라이더 너비를 66.67%로 지정, vertical-bar 관련 스타일 제거) */}
      <style>
        {`
          .hidden-track-range {
            -webkit-appearance: none;
            width: 66.67%; /* 슬라이더 너비를 2/3로 줄임 */
            background: transparent;
            margin: 10px 0;
          }
          .hidden-track-range::-webkit-slider-runnable-track {
            background: transparent;
            border: none;
          }
          .hidden-track-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #f00;
            margin-top: -5px;
            cursor: pointer;
          }
          .hidden-track-range::-moz-range-track {
            background: transparent;
            border: none;
          }
          .hidden-track-range::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #f00;
            cursor: pointer;
          }
          .hidden-track-range::-ms-track {
            background: transparent;
            border: none;
          }
          .hidden-track-range::-ms-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #f00;
            cursor: pointer;
          }
          /* 슬라이더 컨테이너는 상대 위치 */
          .slider-container {
            position: relative;
            width: 100%;
          }
          /* 재생/일시정지 버튼 스타일 */
          .play-pause-btn {
            margin-bottom: 10px;
            padding: 5px 10px;
            font-size: 14px;
            cursor: pointer;
          }
        `}
      </style>

      <div>
        <h2>Video Playback Control</h2>
        <button className="play-pause-btn" onClick={togglePlayPause}>Play/Pause</button>
        <div className="slider-container">
          <input
            ref={sliderRef}
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSliderChange}
            className="hidden-track-range"
          />
        </div>
        <div>
          {currentTime.toFixed(1)} / {duration.toFixed(1)} sec
        </div>
      </div>
    </>
  );
}

export default VideoPlaybackControl;
