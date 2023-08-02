<template>
  <div>
    <v-card
      class="pa-3 my-2 border task-card"
      :class="cardBorderColor(task.status)"
      elevation="1"
    >
      <v-row>
        <v-col cols="12" md="3">
          <v-caption class="text-grey">Title</v-caption>
          <div class="mt-2">{{ task.title }}</div>
        </v-col>

        <v-col cols="6" sm="4" md="4">
          <v-caption class="text-grey">Description</v-caption>
          <div class="mt-2">{{ task.description }}</div>
        </v-col>

        <v-col cols="12" md="2">
          <v-caption class="text-grey">Due</v-caption>
          <div class="mt-2">{{ formatDate(task.due_date) }}</div>
        </v-col>

        <v-col cols="6" sm="4" md="2">
          <v-caption class="text-grey">Status</v-caption>
          <div>
            <v-select
              :items="['Pending', 'In Progress', 'Completed']"
              variant="text"
              density="compact"
              hide-details
              rounded
              v-model="task.status"
              @update:modelValue="updateTask"
            >
              <template #selection="{ item }">
                <v-chip
                  :color="chipColor(item.title)"
                  variant="elevated"
                  class="status-chip"
                >
                  {{ item.title }}
                </v-chip>
              </template>
            </v-select>
          </div>
        </v-col>

        <v-col cols="6" sm="4" md="1">
          <v-caption class="text-grey">Action</v-caption>
          <div>
            <TaskListActionButton :task="task" />
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
  
<script>
import TaskListActionButton from "./TaskListActionButton.vue";
import moment from "moment";
import { taskColor } from "@/mixins/task_color";
export default {
  mixins: [taskColor],
  props: ["task"],
  methods: {
    updateTask() {
      this.$store.dispatch("updateTask", this.task);
    },
    formatDate(date) {
      return moment(date).format("lll");
    },
  },
  components: {
    TaskListActionButton,
  },
};
</script>
  

<style scoped>
.status-chip {
  width: 100px;
  cursor: pointer;
}
.status-chip :deep(.v-chip__content) {
  text-align: center !important;
  margin: auto;
}

.task-card-completed {
  border-left: 7px solid #63b967 !important;
}
.task-card-pending {
  border-left: 7px solid #f55b50 !important;
}
.task-card-inprogress {
  border-left: 7px solid #f17f21 !important;
}
</style>