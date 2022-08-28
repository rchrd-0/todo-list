"use strict";
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["projectHandler"],{

/***/ "./src/modules/project-handler.js":
/*!****************************************!*\
  !*** ./src/modules/project-handler.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initializeProjectHandler": () => (/* binding */ initializeProjectHandler)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");
/* harmony import */ var _form_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-controller */ "./src/modules/form-controller.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display */ "./src/modules/display.js");




const findInList = (id) => {
  const projectItems = document.querySelectorAll('.project-item');
  const thisItem = [...projectItems].find(
    (item) => item.dataset.projectId === id
  );
  return thisItem;
};

const createProject = () => {
  const projectId = _projects__WEBPACK_IMPORTED_MODULE_0__.projectMaster.read().length + 3;
  const projectName = document.querySelector('#project-name-add').value;

  const newProject = new _projects__WEBPACK_IMPORTED_MODULE_0__.Project(projectId, projectName);
  _projects__WEBPACK_IMPORTED_MODULE_0__.projectMaster.push(newProject);
  (0,_form_controller__WEBPACK_IMPORTED_MODULE_1__.hideMenu)('add-project-menu');
  (0,_display__WEBPACK_IMPORTED_MODULE_2__.addProjectToList)(newProject);
};

const renameProject = () => {
  const { renameId } = document.querySelector('#rename-project-form').dataset;
  const project = _projects__WEBPACK_IMPORTED_MODULE_0__.projectMaster.findProject(renameId);
  const newName = document.querySelector('#project-name-edit').value;
  const projectTitle = findInList(renameId).querySelector('span');
  project.name = newName;
  projectTitle.textContent = newName;
  // project.taskList().forEach((task) => squashEdit(task.id));
  (0,_form_controller__WEBPACK_IMPORTED_MODULE_1__.updateSelectOptions)();
  (0,_display__WEBPACK_IMPORTED_MODULE_2__.reloadList)();

  (0,_form_controller__WEBPACK_IMPORTED_MODULE_1__.hideMenu)('rename-project-menu');
};

const initializeButtonEvents = () => {
  const showAddProjectBtn = document.querySelector('#show-add-project');
  const submitAddProject = document.querySelector('#submit-add-project');
  const submitRenameProject = document.querySelector('#submit-rename-project');
  showAddProjectBtn.addEventListener('click', _form_controller__WEBPACK_IMPORTED_MODULE_1__.showAddProject);
  submitAddProject.addEventListener('click', createProject);
  submitRenameProject.addEventListener('click', renameProject);
};

const initializeInbox = () => {
  const inbox = new _projects__WEBPACK_IMPORTED_MODULE_0__.Project(3, 'Inbox');
  _projects__WEBPACK_IMPORTED_MODULE_0__.projectMaster.push(inbox);
};

function initializeProjectHandler() {
  initializeButtonEvents();
  initializeInbox();
}




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["display"], () => (__webpack_exec__("./src/modules/project-handler.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdEhhbmRsZXIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBb0Q7QUFNekI7QUFDOEI7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLHlEQUFrQjtBQUN0Qzs7QUFFQSx5QkFBeUIsOENBQU87QUFDaEMsRUFBRSx5REFBa0I7QUFDcEIsRUFBRSwwREFBUTtBQUNWLEVBQUUsMERBQWdCO0FBQ2xCOztBQUVBO0FBQ0EsVUFBVSxXQUFXO0FBQ3JCLGtCQUFrQixnRUFBeUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUscUVBQW1CO0FBQ3JCLEVBQUUsb0RBQVU7O0FBRVosRUFBRSwwREFBUTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLDREQUFjO0FBQzVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQiw4Q0FBTztBQUMzQixFQUFFLHlEQUFrQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LWhhbmRsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvamVjdCwgcHJvamVjdE1hc3RlciB9IGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHtcbiAgaGlkZU1lbnUsXG4gIHNob3dBZGRQcm9qZWN0LFxuICAvLyBzcXVhc2hFZGl0LFxuICB1cGRhdGVTZWxlY3RPcHRpb25zLFxufSBmcm9tICcuL2Zvcm0tY29udHJvbGxlcic7XG5pbXBvcnQgeyByZWxvYWRMaXN0LCBhZGRQcm9qZWN0VG9MaXN0IH0gZnJvbSAnLi9kaXNwbGF5JztcblxuY29uc3QgZmluZEluTGlzdCA9IChpZCkgPT4ge1xuICBjb25zdCBwcm9qZWN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1pdGVtJyk7XG4gIGNvbnN0IHRoaXNJdGVtID0gWy4uLnByb2plY3RJdGVtc10uZmluZChcbiAgICAoaXRlbSkgPT4gaXRlbS5kYXRhc2V0LnByb2plY3RJZCA9PT0gaWRcbiAgKTtcbiAgcmV0dXJuIHRoaXNJdGVtO1xufTtcblxuY29uc3QgY3JlYXRlUHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgcHJvamVjdElkID0gcHJvamVjdE1hc3Rlci5yZWFkKCkubGVuZ3RoICsgMztcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWFkZCcpLnZhbHVlO1xuXG4gIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0SWQsIHByb2plY3ROYW1lKTtcbiAgcHJvamVjdE1hc3Rlci5wdXNoKG5ld1Byb2plY3QpO1xuICBoaWRlTWVudSgnYWRkLXByb2plY3QtbWVudScpO1xuICBhZGRQcm9qZWN0VG9MaXN0KG5ld1Byb2plY3QpO1xufTtcblxuY29uc3QgcmVuYW1lUHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgeyByZW5hbWVJZCB9ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlbmFtZS1wcm9qZWN0LWZvcm0nKS5kYXRhc2V0O1xuICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdE1hc3Rlci5maW5kUHJvamVjdChyZW5hbWVJZCk7XG4gIGNvbnN0IG5ld05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWVkaXQnKS52YWx1ZTtcbiAgY29uc3QgcHJvamVjdFRpdGxlID0gZmluZEluTGlzdChyZW5hbWVJZCkucXVlcnlTZWxlY3Rvcignc3BhbicpO1xuICBwcm9qZWN0Lm5hbWUgPSBuZXdOYW1lO1xuICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBuZXdOYW1lO1xuICAvLyBwcm9qZWN0LnRhc2tMaXN0KCkuZm9yRWFjaCgodGFzaykgPT4gc3F1YXNoRWRpdCh0YXNrLmlkKSk7XG4gIHVwZGF0ZVNlbGVjdE9wdGlvbnMoKTtcbiAgcmVsb2FkTGlzdCgpO1xuXG4gIGhpZGVNZW51KCdyZW5hbWUtcHJvamVjdC1tZW51Jyk7XG59O1xuXG5jb25zdCBpbml0aWFsaXplQnV0dG9uRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBzaG93QWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaG93LWFkZC1wcm9qZWN0Jyk7XG4gIGNvbnN0IHN1Ym1pdEFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LWFkZC1wcm9qZWN0Jyk7XG4gIGNvbnN0IHN1Ym1pdFJlbmFtZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LXJlbmFtZS1wcm9qZWN0Jyk7XG4gIHNob3dBZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0FkZFByb2plY3QpO1xuICBzdWJtaXRBZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlUHJvamVjdCk7XG4gIHN1Ym1pdFJlbmFtZVByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW5hbWVQcm9qZWN0KTtcbn07XG5cbmNvbnN0IGluaXRpYWxpemVJbmJveCA9ICgpID0+IHtcbiAgY29uc3QgaW5ib3ggPSBuZXcgUHJvamVjdCgzLCAnSW5ib3gnKTtcbiAgcHJvamVjdE1hc3Rlci5wdXNoKGluYm94KTtcbn07XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQcm9qZWN0SGFuZGxlcigpIHtcbiAgaW5pdGlhbGl6ZUJ1dHRvbkV2ZW50cygpO1xuICBpbml0aWFsaXplSW5ib3goKTtcbn1cblxuZXhwb3J0IHsgaW5pdGlhbGl6ZVByb2plY3RIYW5kbGVyIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=