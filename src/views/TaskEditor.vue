<template>
  <div class="tast-editor">
    <div v-if="isLoadingTask">
      <Spinner/>
    </div>
    <div v-else>
      <div v-if="isEditMode && taskData.id === undefined">
        <h1>Задача с таким ID не найдена</h1>
      </div>
      <div v-else>
        <h1>{{ !isEditMode ? 'Добавить задачу' : 'Редактировать задачу' }}</h1>
        <input v-model="taskData.name" type="text" placeholder="Название">
        <select v-model="taskData.state">
          <option v-for="item in statesList" :key="item.id" :value="item.id">
            {{item.title}}
          </option>
        </select>
        <textarea v-model="taskData.description" placeholder="Описание"></textarea>
        <br/>
        <div v-if="!isSaving" class="buttons-section">
          <Button style="margin-right: 5px;" @click="saveTask">
            {{ 'Сохранить' }}
          </Button>
          <Button style="margin-left: 5px;" v-if="isEditMode" @click="removeTask" type="danger">
            {{ 'Удалить' }}
          </Button>
        </div>
        <Spinner v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import notification from '@/helpers/notification';
import Button from '@/components/Button.vue';
import Spinner from '@/components/Spinner.vue';
import api from '@/api/';

export default {
  name: 'TaskEditor',
  components: {
    Button,
    Spinner,
  },
  data() {
    return {
      taskData: {
        id: undefined,
        state: undefined,
        name: '',
        description: '',
      },
      isEditMode: false,
      isLoadingTask: false,
      isSaving: false,
    };
  },
  computed: {
    ...mapGetters({
      statesList: 'task/taskStates',
    }),
  },
  created() {
    const editTaskId = this.$route.params.id;
    if (editTaskId) {
      this.isEditMode = true;
      this.getTaskDataForEdit(editTaskId);
    } else {
      this.taskData = {
        id: 0,
        state: 1,
      };
    }
  },
  methods: {
    getTaskDataForEdit(taskId) {
      this.isLoadingTask = true;
      api.getTaskById(taskId)
        .then((result) => {
          if (result.length > 0) {
            const task = result[0];
            this.taskData = {
              ...task,
            };
          }
        })
        .catch(() => {
          notification('Ну удалось загрузить задачу на редактирование');
        })
        .finally(() => {
          this.isLoadingTask = false;
        });
    },
    removeTask() {
      this.isSaving = true;
      this.$store.dispatch('task/removeTask', this.taskData.id)
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch(() => {
          notification('Не удалось удалить задачу');
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    saveTask() {
      if (this.taskData.name
        && this.taskData.description
        && this.taskData.state
      ) {
        this.isSaving = true;
        this.$store.dispatch('task/saveTask', { ...this.taskData })
          .then(() => {
            this.$router.push({ name: 'Home' });
          })
          .catch(() => {
            notification('Не удалось сохранить задачу');
          })
          .finally(() => {
            this.isSaving = false;
          });
      } else {
        notification('Заполните все поля');
      }
    },
  },
};
</script>
<style scoped lang="sass">
@import "@/assets/css/colors"

.tast-editor
  max-width: 800px
  margin: 0px auto
  padding: 0px 10px
  //background-color: green
  text-align: center
  input, textarea, select
    background: $c-white
    border: 1px solid $c-dark-gray
    box-sizing: border-box
    color: $c-text-gray
    border-radius: 3px
    outline: 0
    display: block
    margin: 6px 0px
    font-size: 16px
    line-height: 28px
    padding: 10px
    max-width: 100%
    min-width: 100%
  input[type=text]
    height: 46px
  textarea
    height: 150px
</style>
