import _ from 'lodash';
import { taskMaster } from './tasks';

const projectFactory = (id, name) => {
  const taskList = () => taskMaster.findProject(id);
  return {
    taskList,
    get id() {
      return id
    },
    set id(newId) {
      id = newId;
    },
    get name() {
      return name
    },
    set name(newName) {
      name = newName
    }
  }
};

const projectMaster = (() => {
  const projectList = [];
  const push = (project) => projectList.push(project);
  const read = () => projectList;
  const findProject = (id) => {
    const idNum = Number(id);
    return projectList.find((project) => project.id === idNum);
  };
  const remove = (id) => {
    const idNum = Number(id);
    _.remove(projectList, findProject(id));
    projectList.forEach((project) => {
      if (project.id > idNum) {
        project.taskList().forEach((task) => {
          task.projectId -= 1;
        });
        project.id -= 1;
      }
    });
  };

  return {
    push,
    read,
    findProject,
    remove,
  };
})();

export { projectFactory, projectMaster };