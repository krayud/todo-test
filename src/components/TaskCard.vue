<template>
  <div :class="['task-card', getCardTypeClass ]">
    <div v-if="isRemoving" class="task-card_removing">
      <Spinner/>
    </div>
    <div class="task-card__content">
      <div class="task-card__header">
        <div class="task-card__meta">
          {{ taskData.id }} | {{ getStatusTitmeById }} | {{ timestampToDate }}
        </div>
        <div class="task-card__actions">
          <router-link :to="{ name: 'EditTask', params: { id: taskData.id }}">
            <img src="@/assets/imgs/edit.svg"/>
          </router-link>
          <img @click="removeHandler" src="@/assets/imgs/delete.svg"/>
        </div>
      </div>
      <div class="task-card__body">
        <h2>{{ taskData.name }}</h2>
        <p>{{ taskData.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import notification from '@/helpers/notification';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'TaskCard',
  components: {
    Spinner,
  },
  props: {
    taskData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isRemoving: false,
    };
  },
  computed: {
    ...mapGetters({
      statesList: 'task/taskStates',
    }),
    timestampToDate() {
      // const date = moment(this.taskData.createTime);
      return moment(this.taskData.createTime).format('DD.MM.YYYY HH:mm');
    },
    getStatusTitmeById() {
      return this.statesList.filter((item) => item.id === this.taskData.state)[0].title;
    },
    getCardTypeClass() {
      switch (this.taskData.state) {
        case 1: return 'task-card_new';
        case 2: return 'task-card_in-progress';
        case 3: return 'task-card_completed';
        default: return null;
      }
    },
  },
  methods: {
    removeHandler() {
      this.isRemoving = true;
      this.$store.dispatch('task/removeTask', this.taskData.id)
        .catch(() => {
          notification('Не удалось удалить задачу');
        })
        .finally(() => {
          this.isRemoving = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/css/colors"

.task-card
  border-radius: 12px
  margin: 15px 0px
  background-color: white
  box-shadow: 4px 4px 8px rgba(44, 44, 44, 0.3)
  color: white
  position: relative

  &__content
    padding: 20px

  &_removing
    position: absolute
    width: 100%
    height: 100%
    border-radius: 12px
    background-color: rgba(0, 0, 0, .8)
    display: flex
    justify-content: center
    align-items: center

  &_new
    background-color: #1E1F25 !important

  &_in-progress
    background-color: $c-blue !important

  &_completed
    background-color: $c-green !important

  &__header
    display: flex
    justify-content: space-between
  &__meta
    display: flex
    font-size: 12px
    color: white
    text-transform: uppercase
  &__actions
    min-width: 69px
    img
      margin-left: 10px
      opacity: .3
      transition: opacity .2s ease
      &:hover
        opacity: 1
        cursor: pointer
  &__body
    h2
      font-size: 24px
      margin: 6px 0px
    p
      font-size: 14px
</style>
