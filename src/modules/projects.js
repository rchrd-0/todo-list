import _ from 'lodash';
import { taskMaster } from './tasks';

class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  taskList() {
    return taskMaster.findProject(this.id)
  }
}

// const projectFactory = (id, name) => {
//   const taskList = () => taskMaster.findProject(id);
//   return {
//     taskList,
//     get id() {
//       return id;
//     },
//     set id(newId) {
//       id = newId;
//     },
//     get name() {
//       return name;
//     },
//     set name(newName) {
//       name = newName;
//     },
//   };
// };

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

const saveToLocalStorage = () => {
  localStorage.setItem('projectList', JSON.stringify(projectMaster.read()));
};

function initializeProjects() {
  if ('projectList' in localStorage) {
    let projects = JSON.parse(localStorage.getItem('projectList'));
    projects = _.drop(projects, 1);
    projects.forEach((project) => {
      projectMaster.push(new Project(...Object.values(project)));
    });
  }
}

export {
  Project,
  projectMaster,
  saveToLocalStorage as storeProjectList,
  initializeProjects,
};
