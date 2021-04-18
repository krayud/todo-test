import {
  getTasksList,
  getTaskById,
  saveTask,
  removeTask,
} from '@/helpers/data';

const delayFunc = (func) => new Promise((resolve, reject) => {
  setTimeout(func, 500, resolve, reject);
});

export default {
  getTasksList: () => delayFunc((resolve) => {
    resolve(getTasksList());
  }),

  getTaskById: (id) => delayFunc((resolve) => {
    resolve(getTaskById(id));
  }),

  saveTask: (task) => delayFunc((resolve) => {
    resolve(saveTask(task));
  }),

  removeTask: (taskId) => delayFunc((resolve) => {
    resolve(removeTask(taskId));
  }),
};
