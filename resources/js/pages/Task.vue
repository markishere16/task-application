<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto" style="min-height: 300px;" elevation="0">
          <TaskComponent />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TaskComponent from "../components/Task/TaskComponent.vue";

export default {
  components: {
    TaskComponent,
  },
};
</script>