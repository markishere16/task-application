<template>
  <v-dialog v-model="formDialog">
    <v-card width="800" class="mx-auto">
      <v-card-title class="d-flex justify-space-between px-3">
        <div class="flex-grow-1">
          <div class="d-inline-block">New Task</div>
        </div>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col cols="12" md="12" lg="12" class="pb-0">
            <label for="status">Title</label>
            <v-text-field
              v-model="form.title"
              :error-messages="errorMessage.title"
              variant="outlined"
              density="compact"
            />
          </v-col>

          <v-col cols="12" md="12" lg="12" class="pb-0">
            <label for="status">Description</label>
            <v-textarea
              v-model="form.description"
              :error-messages="errorMessage.description"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" lg="6" class="pb-0">
            <label for="status">Status</label>
            <v-select
              v-model="form.status"
              :items="status"
              :error-messages="errorMessage.status"
              variant="outlined"
              item-value="value"
            />
          </v-col>

          <v-col cols="12" md="6" lg="6" class="pb-0">
            <label for="duedate">Due Date</label>
            <input
              type="datetime-local"
              name="datetime"
              class="date-picker"
              v-model="form.due_date"
            />
            <small class="text-red">{{ errorMessage.due_date[0] }}</small>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />

        <v-btn
          text
          type="button"
          :disabled="isLoading"
          @click="$emit('closeDialog')"
        >
          <strong>Cancel</strong>
        </v-btn>

        <v-btn
          color="green"
          text
          @click="type == 'create' ? createTask() : updateTask()"
          :loading="isLoading"
          :disabled="isLoading"
        >
          <strong>Save</strong>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import moment from "moment";

export default {
  props: ["task", "type"],
  components: { VueDatePicker },
  data() {
    return {
      isLoading: false,
      formDialog: true,
      form: {
        id: null,
        title: "",
        description: "",
        due_date: "",
        status: "",
      },
      status: ["Pending", "In Progress", "Completed"],
      errorMessage: {
        title: "",
        description: "",
        due_date: "",
        status: "",
      },
    };
  },
  methods: {
    createTask() {
      this.isLoading = true;
      this.form.date = moment(this.form.date).format("MM-DD-YYYY h:mm:ss");

      this.$store
        .dispatch("createTask", this.form)
        .then((res) => {
          this.isLoading = false;
          this.$emit("closeDialog");
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorMessage = err;
        });
    },
    updateTask() {
      this.isLoading = true;

      this.$store
        .dispatch("updateTask", this.form)
        .then((res) => {
          this.isLoading = false;
          this.$emit("closeDialog");
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorMessage = err;
        });
    },
  },
  mounted() {
    this.form = { ...this.task };
  },
};
</script>

<style scoped>
.date-picker {
  height: 58px !important;
  width: 100%;
  border: 1px solid rgb(132, 132, 132);
  border-radius: 5px;
  padding: 10px;
}
</style>