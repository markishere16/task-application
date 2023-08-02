export const taskColor = {
    methods: {
        chipColor(status) {
            if (status == "Completed") {
              return "green";
            } else if (status == "In Progress") {
              return "orange-darken-3";
            } else {
              return "red";
            }
          },
          cardBorderColor(status) {
            if (status == "Completed") {
              return "task-card-completed";
            } else if (status == "In Progress") {
              return "task-card-inprogress";
            } else {
              return "task-card-pending";
            }
          },
    },
}