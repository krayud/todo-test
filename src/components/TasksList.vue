<template>
  <div class="task-list">
      <div v-if="tasksList && tasksList.length > 0">
        <TaskCard v-for="task in sortedList" :key="task.id"
          :taskData="task"
        />
      </div>
      <div v-else class="task-list__empty-text-wrapper">
        <h3 >Список задач пуст</h3>
      </div>
  </div>
</template>

<script>
import _ from 'lodash';
import TaskCard from '@/components/TaskCard.vue';

export default {
  name: 'TasksList',
  components: {
    TaskCard,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    tasksList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    sortedList() {
      return _.sortBy(this.tasksList, ['id']).reverse();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.task-list
  &__empty-text-wrapper
    text-align: center
</style>
