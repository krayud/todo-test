import _ from 'lodash';

const LOCALSTORAGE_DATA_NAME = 'todoTasksList';

function getTasksList() {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_DATA_NAME)) || [];
}

function getTaskById(id) {
  const currentTasks = getTasksList();
  return currentTasks.filter((item) => item.id === parseInt(id, 10));
}

function saveTask(task) {
  const currentTasks = getTasksList();

  if (task.id === 0) { // Add new task
    let idCounter = 1;

    if (currentTasks.length > 0) {
      idCounter = _.maxBy(currentTasks, 'id').id + 1;
    }

    currentTasks.push({
      ...task,
      id: idCounter,
      createTime: new Date().getTime(),
    });
  } else { // Update task
    const taskForUpdateIndex = _.findIndex(currentTasks, { id: task.id });
    currentTasks[taskForUpdateIndex] = {
      ...currentTasks[taskForUpdateIndex],
      state: task.state,
      name: task.name,
      description: task.description,
    };
  }

  localStorage.setItem(LOCALSTORAGE_DATA_NAME, JSON.stringify(currentTasks));
  return currentTasks;
}

function removeTask(taskId) {
  const currentTasks = getTasksList();
  const newTasksList = currentTasks.filter((item) => item.id !== taskId);
  localStorage.setItem(LOCALSTORAGE_DATA_NAME, JSON.stringify(newTasksList));
  return newTasksList;
}

export {
  getTasksList,
  saveTask,
  getTaskById,
  removeTask,
};
