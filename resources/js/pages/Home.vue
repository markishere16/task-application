<template>
  <div>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-toolbar-title>My Task</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn @click="logout()">
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="bottom" temporary>
        <v-list :items="items"></v-list>
      </v-navigation-drawer>

      <v-main style="height: 500px">
        <Task />
      </v-main>
      <v-footer style="position: absolute; bottom: 0; right: 0;text-align: center;">
        <b> Task Management by: Mark Joshua Elimar R. Mandigma</b>
      </v-footer>
    </v-layout>
  </div>
</template>
    
  <script>
import Task from "./Task.vue";

export default {
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    },
  },
  components: { Task },
};
</script>