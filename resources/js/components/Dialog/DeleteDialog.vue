<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-title class="text-h5 text-center">
        Are you sure you want to <br />
        delete this Task?
      </v-card-title>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red-darken-1"
          variant="text"
          @click="$emit('closeDialog')"
        >
          No
        </v-btn>
        <v-btn
          color="green-darken-1"
          variant="text"
          @click="deleteTask()"
          :loading="isLoading"
        >
          Yes, Delete it
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: ["taskId"],
  data() {
    return {
      dialog: true,
      isLoading: false,
    };
  },
  methods: {
    deleteTask() {
      this.isLoading = true;
      this.$store
        .dispatch("deleteTask", this.taskId)
        .then(() => {
          this.isLoading = false;
          this.$emit("closeDialog");
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>