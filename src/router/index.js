import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import TaskEditor from '../views/TaskEditor.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add-task',
    name: 'AddTask',
    component: TaskEditor,
  },
  {
    path: '/task/:id',
    name: 'EditTask',
    component: TaskEditor,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
