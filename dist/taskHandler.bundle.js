"use strict";
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["taskHandler"],{

/***/ "./src/modules/task-handler.js":
/*!*************************************!*\
  !*** ./src/modules/task-handler.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTask": () => (/* binding */ createTask),
/* harmony export */   "editTask": () => (/* binding */ editTask),
/* harmony export */   "intializeTaskHandler": () => (/* binding */ initializeButtonEvents)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/parseISO/index.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/modules/tasks.js");
/* harmony import */ var _form_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-controller */ "./src/modules/form-controller.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display */ "./src/modules/display.js");





const createTask = () => {
  const taskId = _tasks__WEBPACK_IMPORTED_MODULE_0__.taskMaster.read().length;
  const taskName = document.querySelector('#task-name-add').value;
  const taskDescription = document.querySelector('#task-description-add').value;
  const taskDate = document.querySelector('#task-date-add').value;
  const taskProject = Number(document.querySelector('#project-add').value);
  const taskPriority = document.querySelector(
    'input[name=priority-add]:checked'
  ).value;
  const date = !taskDate ? null : (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(taskDate);
  const newTask = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task(
    taskId,
    taskName,
    taskDescription,
    date,
    taskProject,
    taskPriority
  );
  _tasks__WEBPACK_IMPORTED_MODULE_0__.taskMaster.push(newTask);

  (0,_form_controller__WEBPACK_IMPORTED_MODULE_1__.hideModal)('add-task-menu');
  (0,_display__WEBPACK_IMPORTED_MODULE_2__.reloadList)();
};

const editTask = () => {
  const editTaskForm = document.querySelector('#edit-task-form');
  const { taskId } = editTaskForm.dataset;
  const thisTask = _tasks__WEBPACK_IMPORTED_MODULE_0__.taskMaster.findTask(taskId);
  const taskName = document.querySelector('#task-name-edit').value;
  const taskDescription = document.querySelector(
    '#task-description-edit'
  ).value;
  const taskDate = document.querySelector('#task-date-edit').value;
  const taskProject = Number(document.querySelector('#project-edit').value);
  const taskPriority = [
    ...document.querySelectorAll('input[name=priority-edit]'),
  ].find((priority) => priority.checked).value;

  thisTask.name = taskName;
  thisTask.description = taskDescription;
  thisTask.date = !taskDate ? null : (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(taskDate);
  thisTask.projectId = taskProject;
  thisTask.priority = taskPriority;

  (0,_form_controller__WEBPACK_IMPORTED_MODULE_1__.hideModal)('edit-task-menu');
  (0,_display__WEBPACK_IMPORTED_MODULE_2__.reloadList)();
};

const initializeButtonEvents = () => {
  const submitAddTask = document.querySelector('#submit-add');
  const showAddTask = document.querySelector('#show-add-task');
  const submitEditTask = document.querySelector('#submit-edit');

  showAddTask.addEventListener('click', _form_controller__WEBPACK_IMPORTED_MODULE_1__.showAdd);
  submitAddTask.addEventListener('click', createTask);
  submitEditTask.addEventListener('click', editTask);
};




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["display"], () => (__webpack_exec__("./src/modules/task-handler.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza0hhbmRsZXIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBb0M7QUFDTztBQUNZO0FBQ2hCOztBQUV2QztBQUNBLGlCQUFpQixtREFBZTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxvREFBUTtBQUMxQyxzQkFBc0Isd0NBQUk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLG1EQUFlOztBQUVqQixFQUFFLDJEQUFTO0FBQ1gsRUFBRSxvREFBVTtBQUNaOztBQUVBO0FBQ0E7QUFDQSxVQUFVLFNBQVM7QUFDbkIsbUJBQW1CLHVEQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQyxvREFBUTtBQUM3QztBQUNBOztBQUVBLEVBQUUsMkRBQVM7QUFDWCxFQUFFLG9EQUFVO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDLHFEQUFPO0FBQy9DO0FBQ0E7QUFDQTs7QUFFZ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrLWhhbmRsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyc2VJU08gfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBUYXNrLCB0YXNrTWFzdGVyIH0gZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQgeyBzaG93QWRkLCBoaWRlTW9kYWwgfSBmcm9tICcuL2Zvcm0tY29udHJvbGxlcic7XG5pbXBvcnQgeyByZWxvYWRMaXN0IH0gZnJvbSAnLi9kaXNwbGF5JztcblxuY29uc3QgY3JlYXRlVGFzayA9ICgpID0+IHtcbiAgY29uc3QgdGFza0lkID0gdGFza01hc3Rlci5yZWFkKCkubGVuZ3RoO1xuICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLW5hbWUtYWRkJykudmFsdWU7XG4gIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRlc2NyaXB0aW9uLWFkZCcpLnZhbHVlO1xuICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRhdGUtYWRkJykudmFsdWU7XG4gIGNvbnN0IHRhc2tQcm9qZWN0ID0gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWFkZCcpLnZhbHVlKTtcbiAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnaW5wdXRbbmFtZT1wcmlvcml0eS1hZGRdOmNoZWNrZWQnXG4gICkudmFsdWU7XG4gIGNvbnN0IGRhdGUgPSAhdGFza0RhdGUgPyBudWxsIDogcGFyc2VJU08odGFza0RhdGUpO1xuICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2soXG4gICAgdGFza0lkLFxuICAgIHRhc2tOYW1lLFxuICAgIHRhc2tEZXNjcmlwdGlvbixcbiAgICBkYXRlLFxuICAgIHRhc2tQcm9qZWN0LFxuICAgIHRhc2tQcmlvcml0eVxuICApO1xuICB0YXNrTWFzdGVyLnB1c2gobmV3VGFzayk7XG5cbiAgaGlkZU1vZGFsKCdhZGQtdGFzay1tZW51Jyk7XG4gIHJlbG9hZExpc3QoKTtcbn07XG5cbmNvbnN0IGVkaXRUYXNrID0gKCkgPT4ge1xuICBjb25zdCBlZGl0VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLWZvcm0nKTtcbiAgY29uc3QgeyB0YXNrSWQgfSA9IGVkaXRUYXNrRm9ybS5kYXRhc2V0O1xuICBjb25zdCB0aGlzVGFzayA9IHRhc2tNYXN0ZXIuZmluZFRhc2sodGFza0lkKTtcbiAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1uYW1lLWVkaXQnKS52YWx1ZTtcbiAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnI3Rhc2stZGVzY3JpcHRpb24tZWRpdCdcbiAgKS52YWx1ZTtcbiAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kYXRlLWVkaXQnKS52YWx1ZTtcbiAgY29uc3QgdGFza1Byb2plY3QgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZWRpdCcpLnZhbHVlKTtcbiAgY29uc3QgdGFza1ByaW9yaXR5ID0gW1xuICAgIC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9cHJpb3JpdHktZWRpdF0nKSxcbiAgXS5maW5kKChwcmlvcml0eSkgPT4gcHJpb3JpdHkuY2hlY2tlZCkudmFsdWU7XG5cbiAgdGhpc1Rhc2submFtZSA9IHRhc2tOYW1lO1xuICB0aGlzVGFzay5kZXNjcmlwdGlvbiA9IHRhc2tEZXNjcmlwdGlvbjtcbiAgdGhpc1Rhc2suZGF0ZSA9ICF0YXNrRGF0ZSA/IG51bGwgOiBwYXJzZUlTTyh0YXNrRGF0ZSk7XG4gIHRoaXNUYXNrLnByb2plY3RJZCA9IHRhc2tQcm9qZWN0O1xuICB0aGlzVGFzay5wcmlvcml0eSA9IHRhc2tQcmlvcml0eTtcblxuICBoaWRlTW9kYWwoJ2VkaXQtdGFzay1tZW51Jyk7XG4gIHJlbG9hZExpc3QoKTtcbn07XG5cbmNvbnN0IGluaXRpYWxpemVCdXR0b25FdmVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IHN1Ym1pdEFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LWFkZCcpO1xuICBjb25zdCBzaG93QWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaG93LWFkZC10YXNrJyk7XG4gIGNvbnN0IHN1Ym1pdEVkaXRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1Ym1pdC1lZGl0Jyk7XG5cbiAgc2hvd0FkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93QWRkKTtcbiAgc3VibWl0QWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZVRhc2spO1xuICBzdWJtaXRFZGl0VGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRUYXNrKTtcbn07XG5cbmV4cG9ydCB7IGluaXRpYWxpemVCdXR0b25FdmVudHMgYXMgaW50aWFsaXplVGFza0hhbmRsZXIsIGNyZWF0ZVRhc2ssIGVkaXRUYXNrIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=