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

/***/ "./src/client/js/recorder.js":
/*!***********************************!*\
  !*** ./src/client/js/recorder.js ***!
  \***********************************/
/***/ (() => {

eval("const startBtn = document.getElementById(\"startBtn\");\nconst video = document.getElementById(\"preview\");\nlet stream;\nlet recorder;\nlet videoFile;\nconst handleDownload = () => {\n  const a = document.createElement(\"a\");\n  a.href = videoFile;\n  a.download = \"녹화 다운로드\";\n  document.body.appendChild(a); //가짜 url 생성 \n  a.click();\n};\nconst handleStop = () => {\n  startBtn.innerText = \"다운로드\";\n  startBtn.removeEventListener(\"click\", handleStop);\n  startBtn.addEventListener(\"click\", handleDownload);\n  recorder.stop();\n};\nconst handleStart = () => {\n  startBtn.innerText = \"녹화 중지\";\n  startBtn.removeEventListener(\"click\", handleStart); //반복되는 것을 막을려고\n  startBtn.addEventListener(\"click\", handleStop);\n  recorder = new window.MediaRecorder(stream);\n  recorder.ondataavailable = event => {\n    // 녹화가 멈추면 발생하는 이벤트이다. \n    videoFile = URL.createObjectURL(event.data); //녹화된 비디오 url 주기  즉 \n    video.srcObject = null;\n    video.src = videoFile;\n    video.loop = true;\n    video.play();\n  };\n  recorder.start();\n};\nconst init = async () => {\n  stream = await navigator.mediaDevices.getUserMedia({\n    audio: false,\n    video: {\n      width: 200,\n      height: 200\n    }\n  });\n  video.srcObject = stream;\n  video.play();\n};\ninit();\nstartBtn.addEventListener(\"click\", handleStart);\n\n//# sourceURL=webpack://healthtube/./src/client/js/recorder.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/recorder.js"]();
/******/ 	
/******/ })()
;