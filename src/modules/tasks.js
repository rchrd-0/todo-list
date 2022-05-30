import _ from 'lodash';

const taskFactory = (
  id,
  name,
  description,
  date,
  projectId,
  priority,
  completed = false
) => {
  return {
    get id() {
      return id;
    },
    set id(newId) {
      id = newId;
    },
    get name() {
      return name;
    },
    set name(newName) {
      name = newName;
    },
    get description() {
      return description;
    },
    set description(newDescription) {
      description = newDescription;
    },
    get date() {
      return date;
    },
    set date(newDate) {
      date = newDate;
    },
    get projectId() {
      return projectId;
    },
    set projectId(newProjectId) {
      projectId = newProjectId;
    },
    get priority() {
      return priority;
    },
    set priority(newPriority) {
      priority = newPriority;
    },
    get completed() {
      return completed;
    },
    set completed(newCompleted) {
      completed = newCompleted;
    },
  };
};

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

export { taskFactory, taskMaster };
