const newTask = (id, name, desc, date, project, priority, completed) => {
  return {
    id,
    name,
    desc,
    date,
    project,
    priority,
    completed,
  };
};

const taskMaster = (() => {
  const taskList = [];
  const push = (task) => taskList.push(task);
  const read = () => taskList;

  return {
    push,
    read
  }
})();

export { newTask, taskMaster };
