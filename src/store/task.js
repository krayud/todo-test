import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/';
import notification from '../helpers/notification';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    taskList: undefined,
    taskStates: [
      { id: 1, title: 'Новая' },
      { id: 2, title: 'В работе' },
      { id: 3, title: 'Выполнена' },
    ],
    isLoadingTasksList: false,
    isSavingTask: false,
  },
  getters: {
    isLoadingTasksList: (state) => state.isLoadingTasksList,
    taskList: (state) => state.taskList,
    taskStates: (state) => state.taskStates,
  },
  mutations: {
    setLoadingTasksState: (state, payload) => {
      state.isLoadingTasksList = payload;
    },
    setTasksList: (state, payload) => {
      state.taskList = payload;
    },
  },
  actions: {
    loadTasksList: (store) => {
      if (store.state.taskList === undefined) {
        store.commit('setLoadingTasksState', true);
        api.getTasksList()
          .then((result) => {
            store.commit('setTasksList', result);
          })
          .catch(() => {
            notification('Ошибка загрузки данных');
          })
          .finally(() => {
            store.commit('setLoadingTasksState', false);
          });
      }
    },

    saveTask: (store, task) => new Promise((resolve, reject) => {
      api.saveTask(task)
        .then((result) => {
          store.commit('setTasksList', result);
          resolve();
        })
        .catch(() => {
          reject();
        });
    }),

    removeTask: (store, taskId) => new Promise((resolve, reject) => {
      api.removeTask(taskId)
        .then((result) => {
          store.commit('setTasksList', result);
          resolve();
        })
        .catch(() => {
          reject();
        });
    }),
  },
  modules: {
  },
};
