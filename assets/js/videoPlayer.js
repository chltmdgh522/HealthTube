/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.querySelector(\"video\");\nconst playBtn = document.getElementById(\"play\");\nconst playBtnIcon = playBtn.querySelector(\"i\");\nconst muteBtn = document.getElementById(\"mute\");\nconst muteBtnIcon = muteBtn.querySelector(\"i\");\nconst volumeRange = document.getElementById(\"volume\");\nconst currenTime = document.getElementById(\"currenTime\");\nconst totalTime = document.getElementById(\"totalTime\");\nconst timeline = document.getElementById(\"timeline\");\nconst fullScreenBtn = document.getElementById(\"fullScreen\");\nconst fullScreenIcon = fullScreenBtn.querySelector(\"i\");\nconst videoContainer = document.getElementById(\"videoContainer\");\nconst videoControls = document.getElementById(\"videoControls\");\nlet controlsTimeout = null;\nlet controlsMovementTimeout = null;\nlet volumeValue = 0.5;\nvideo.volume = volumeValue;\nconst handlePlayClick = e => {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n  playBtnIcon.classList = video.paused ? \"fas fa-play\" : \"fas fa-pause\";\n};\nconst handleMuteClick = e => {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n  muteBtnIcon.classList = video.muted ? \"fas fa-volume-mute\" : \"fas fa-volume-up\";\n  volumeRange.value = video.muted ? 0 : volumeValue;\n};\nconst handleVolumeChange = evnet => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"무음\";\n  }\n  volumeValue = value;\n  video.volume = value;\n};\nconst formatTime = seconds => new Date(seconds * 1000).toISOString().substring(11, 19); //초단위 포멧\nconst handleLoadedMetadata = () => {\n  totalTime.innerText = formatTime(Math.ceil(video.duration)); //비디오의 길이\n  timeline.max = Math.floor(video.duration); //비디오 길이 반환 JS에서 브라우저에게 max 세팅 함\n};\n\nconst handleTimeUpdate = () => {\n  currenTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\nconst handleTimelineChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  video.currentTime = value;\n};\nconst handleFullscreen = () => {\n  const fullscreen = document.fullscreenElement; //널이면 전체화면아님 그래서 else가 실행됨 \n  if (fullscreen) {\n    document.exitFullscreen();\n    fullScreenIcon.classList = \"fas fa-expand\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenIcon.classList = \"fas fa-compress\";\n  }\n};\nconst hideControls = () => videoControls.classList.remove(\"showing\");\nconst handleMouseMove = () => {\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout); // 시간이 계속 안사라져서 이거 해줘야됨\n    controlsTimeout = null;\n  }\n  if (controlsMovementTimeout) {\n    // 비디오 안에서 커서 움직일때 \n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n  videoControls.classList.add(\"showing\");\n  controlsMovementTimeout = setTimeout(hideControls, 3000); //비디오 안에서 3초동안 계속 움직이는데 만약에 멈추면 바로위에 if문 실행이 안됨 \n  //그러면 3초가 지났으니간 hide 실행\n};\n\nconst handleMouseLeave = () => {\n  controlsTimeout = setTimeout(hideControls, 3000);\n};\ndocument.addEventListener(\"keyup\", event => {\n  if (event.code === \"Space\") {\n    handlePlayClick();\n  }\n}); // 스페이스바 play stop\n\nplayBtn.addEventListener(\"click\", handlePlayClick);\nmuteBtn.addEventListener(\"click\", handleMuteClick);\nvolumeRange.addEventListener(\"change\", handleVolumeChange); //소리\nvideo.addEventListener(\"loadedmetadata\", handleLoadedMetadata); // 비디오 길이 \nvideo.addEventListener(\"timeupdate\", handleTimeUpdate); //시간 업데이트\ntimeline.addEventListener(\"input\", handleTimelineChange); // 비디오 시간 연결\nfullScreenBtn.addEventListener(\"click\", handleFullscreen);\nvideoContainer.addEventListener(\"mousemove\", handleMouseMove);\nvideoContainer.addEventListener(\"mouseleave\", handleMouseLeave);\nvideo.addEventListener(\"click\", handlePlayClick); //비디오 클릭했을때 stop play\n\n//# sourceURL=webpack://healthtube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;