<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-dots-horizontal"
          color="primary"
          size="small"
          elevation="0"
          class="mt-1"
        ></v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-title>
            <v-icon left> {{ item.icon }}</v-icon>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <FormDialog
      v-if="dialog.edit"
      @closeDialog="dialog.edit = false"
      :task="task"
      :type="'edit'"
    />

    <DeleteDialog
      v-if="dialog.delete"
      @closeDialog="dialog.delete = false"
      :taskId="task.id"
    />
  </div>
</template>
  
<script>
import FormDialog from "../Dialog/FormDialog.vue";
import DeleteDialog from "../Dialog/DeleteDialog.vue";
export default {
  props: ["task"],
  components: {
    FormDialog,
    DeleteDialog,
  },
  data: () => ({
    dialog: {
      delete: false,
      edit: false,
    },
    items: [
      {
        icon: "mdi-pencil",
        title: "Edit",
        click() {
          this.dialog.edit = true;
        },
      },
      {
        icon: "mdi-delete",
        title: "Delete",
        click() {
          this.dialog.delete = true;
        },
      },
    ],
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    },
  },
};
</script>