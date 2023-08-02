<template>
  <div class="mb-4">
    <v-row class="space-around" space-around>
      <v-col v-for="(item, index) in taskHeader" :key="index">
        <v-card
          :color="item.color"
          class="pr-1 rounded white--text text-white"
          width="auto"
          height="100"
        >
          <v-card-title class="text-center">
            <h3 class="mb-3">{{ item.title }}</h3>
            <h1>{{ item.count }}</h1>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["taskHeader", "total_pending"]),
  data() {
    this.taskHeader;
  },
};
</script>

<style scoped>
.header-actions button {
  margin-left: 10px;
}
</style>