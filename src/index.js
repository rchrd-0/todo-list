import { initializeUI } from './modules/display';
import { initializeProjectHandler } from './modules/project-handler';
import { intializeTaskHandler } from './modules/task-handler';

// import { taskMaster } from './modules/tasks';
// import { projectMaster } from './modules/projects';

// const debug = document.querySelector('#debug');
// debug.addEventListener('click', () => {
//   console.log(taskMaster.read());
//   console.log(projectMaster.read());
// });

intializeTaskHandler();
initializeProjectHandler();
initializeUI();
