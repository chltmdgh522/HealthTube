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

/***/ "./src/client/js/commentSection.js":
/*!*****************************************!*\
  !*** ./src/client/js/commentSection.js ***!
  \*****************************************/
/***/ (() => {

eval("const videoContainer = document.getElementById(\"videoContainer\");\nconst form = document.getElementById(\"commentForm\");\nconst videoComments = document.querySelector(\".video__comments ul\");\nconst deleteIcon = document.querySelectorAll(\".deleteBtn\");\nconst addComment = (text, id) => {\n  const videoComments = document.querySelector(\".video__comments ul\");\n  const newComment = document.createElement(\"li\");\n  newComment.dataset.id = id;\n  const icon = document.createElement(\"i\");\n  const span = document.createElement(\"span\");\n  const deleteIcon = document.createElement(\"span\");\n  newComment.className = \"video__comment\";\n  icon.className = \"fas fa-comment\";\n  deleteIcon.className = \"delete__icon\";\n  newComment.appendChild(icon);\n  span.innerText = ` ${text}`;\n  deleteIcon.innerText = \"❌\";\n  newComment.appendChild(span);\n  newComment.appendChild(deleteIcon);\n  videoComments.prepend(newComment);\n  deleteIcon.addEventListener(\"click\", handleDelete);\n};\nconst handleSubmit = async event => {\n  event.preventDefault();\n  const textarea = form.querySelector(\"textarea\");\n  const text = textarea.value;\n  const videoId = videoContainer.dataset.id;\n  if (text === \"\") {\n    return;\n  }\n  const response = await fetch(`/api/videos/${videoId}/comments`, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text\n    }) // {text} 그냥 이런식으로 하면 서버가 string으로 인식함 그래서 저렇게 해줌\n  });\n\n  if (response.status === 201) {\n    textarea.value = \"\";\n    const {\n      newCommentId\n    } = await response.json();\n    addComment(text, newCommentId);\n  }\n};\nconst handleDelete = async event => {\n  const deleteComment = event.target.parentElement;\n  const {\n    dataset: {\n      id\n    }\n  } = event.target.parentElement;\n  const videoId = videoContainer.dataset.id;\n  const response = await fetch(`/api/videos/${videoId}/comments/delete`, {\n    method: \"DELETE\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      commentId: id\n    })\n  });\n  if (response.status === 200) {\n    deleteComment.remove();\n  }\n};\nif (form) {\n  form.addEventListener(\"submit\", handleSubmit); //click 쓰면 클릭하는것만 감지하기 때문,,, 우리는 form 제출을 감지해야함 \n}\n\nif (deleteIcon) {\n  deleteIcon.forEach(icon => icon.addEventListener(\"click\", handleDelete));\n}\n\n//# sourceURL=webpack://healthtube/./src/client/js/commentSection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/commentSection.js"]();
/******/ 	
/******/ })()
;