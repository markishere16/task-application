

<template>
  <div>
    <TaskHeaderCounter />
    <v-card-title
      class="bg-grey-lighten-2 d-flex justify-space-between align-center pa-4"
    >
      <div>Tasks</div>

      <v-btn color="primary" @click="formDialog = true">
        <v-icon left> mdi-plus-thick </v-icon>
        Add task
      </v-btn>
    </v-card-title>

    <div v-if="tasks.length > 0">
      <TaskList v-for="(task, index) in tasks" :key="index" :task="task" />
    </div>

    <NoTask v-else class="text-center mt-15" />

    <DialogForm
      v-if="formDialog"
      @closeDialog="formDialog = false"
      :type="'create'"
    />
  </div>
</template>
  
<script>
import { mapGetters } from "vuex";
import TaskList from "./TaskList.vue";
import NoTask from "./NoTask.vue";
import DialogForm from "../Dialog/FormDialog.vue";
import TaskHeaderCounter from "./TaskHeaderCounter.vue";
export default {
  name: "Task",
  computed: mapGetters(["tasks"]),
  data() {
    return {
      formDialog: false,
    };
  },
  components: {
    TaskList,
    NoTask,
    DialogForm,
    TaskHeaderCounter,
  },
  mounted() {
    this.$store.dispatch("fetchTasks");
  },
};
</script>