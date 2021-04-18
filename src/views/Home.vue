<template>
  <div class="home">
    <div class="spinner-wrapper" v-if="isLoadingTasksList">
      <Spinner/>
    </div>
    <div class="tasks-grid" v-else>
      <div class="tasks-new">
        <div class="column-title"><h2>Новые</h2></div>
        <TasksList
          :tasksList="newTasks"
        />
      </div>
      <div class="tasks-in-progress">
        <h2 class="column-title">В работе</h2>
        <TasksList
          :tasksList="inProgressTasks"
        />
      </div>
      <div class="tasks-completed">
        <h2 class="column-title">Выполнены</h2>
        <TasksList
          :tasksList="completedTasks"
        />
      </div>
    </div>
    <div class="button-section">
      <router-link :to="{ name: 'AddTask' }">
        <Button>Добавить задачу</Button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Button from '@/components/Button.vue';
import TasksList from '@/components/TasksList.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'Home',
  components: {
    Button,
    TasksList,
    Spinner,
  },
  computed: {
    ...mapGetters({
      taskList: 'task/taskList',
      isLoadingTasksList: 'task/isLoadingTasksList',
    }),
    newTasks() {
      return this.taskList.filter((item) => item.state === 1);
    },
    inProgressTasks() {
      return this.taskList.filter((item) => item.state === 2);
    },
    completedTasks() {
      return this.taskList.filter((item) => item.state === 3);
    },
  },
  created() {
    this.$store.dispatch('task/loadTasksList');
  },
};
</script>
<style scoped lang="sass">
.home
  padding: 0px 40px
.tasks-grid
  display: grid
  grid-template-columns: 30% 30% 30%
  grid-gap: 40px
  justify-content: center
  @media (max-width: 960px)
    grid-template-columns: 100%

.column-title
  text-align: center
  text-transform: uppercase

.spinner-wrapper
  text-align: center

.button-section
  text-align: center
  margin: 30px
</style>
