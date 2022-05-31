import { initializeUI } from './modules/display';
import { initializeProjectHandler } from './modules/project-handler';
import { intializeTaskHandler } from './modules/task-handler';

intializeTaskHandler();
initializeProjectHandler();
initializeUI();
