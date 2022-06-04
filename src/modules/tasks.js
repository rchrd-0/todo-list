import _ from 'lodash';
import { parseJSON } from 'date-fns';

class Task {
  constructor(id, name, description, date, projectId, priority, completed = false) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.projectId = projectId;
    this.priority = priority;
    this.completed = completed;
  }

  toggleStatus() {
    this.completed = !this.completed
  }
}

// const taskFactory = (
//   id,
//   name,
//   description,
//   date,
//   projectId,
//   priority,
//   completed = false
// ) => {
//   return {
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
//     get description() {
//       return description;
//     },
//     set description(newDescription) {
//       description = newDescription;
//     },
//     get date() {
//       return date;
//     },
//     set date(newDate) {
//       date = newDate;
//     },
//     get projectId() {
//       return projectId;
//     },
//     set projectId(newProjectId) {
//       projectId = newProjectId;
//     },
//     get priority() {
//       return priority;
//     },
//     set priority(newPriority) {
//       priority = newPriority;
//     },
//     get completed() {
//       return completed;
//     },
//     set completed(newCompleted) {
//       completed = newCompleted;
//     },
//   };
// };

const taskMaster = (() => {
  const taskList = [];
  const push = (task) => taskList.push(task);
  const read = () => taskList;
  const findTask = (id) => {
    const idNum = Number(id);
    const thisTask = taskList.find((task) => task.id === idNum);
    return thisTask;
  };
  const findProject = (id) => {
    const projectIdNum = Number(id);
    const tasks = taskList.filter((task) => task.projectId === projectIdNum);
    return tasks;
  };
  const remove = (id) => {
    const idNum = Number(id);
    _.remove(taskList, findTask(idNum));
    taskList.forEach((task) => {
      if (task.id > idNum) {
        task.id -= 1;
      }
    });
  };

  return {
    push,
    read,
    findTask,
    findProject,
    remove,
  };
})();

function saveToLocalStorage() {
  localStorage.setItem('taskList', JSON.stringify(taskMaster.read()));
}

function initializeTasks() {
  if ('taskList' in localStorage) {
    const tasks = JSON.parse(localStorage.getItem('taskList'));
    tasks.forEach((task) => {
      task.date = task.date ? parseJSON(task.date) : null;
      taskMaster.push(new Task(...Object.values(task)));
    });
  }
}

export {
  Task,
  taskMaster,
  saveToLocalStorage as storeTaskList,
  initializeTasks,
};
