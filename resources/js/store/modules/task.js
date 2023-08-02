import axios from "../../plugins/axios";
// state
export const state = () => ({
    tasks: [],
});

// getters
export const getters = {
    tasks: (state) => state.tasks,
    total_task: (state) => state.tasks.length,
    total_pending: (state) => state.tasks.filter(item=>item.status == 'Pending').length,
    taskHeader: (state) => {
      let totalTask = state.tasks.length;
      let totalPending = state.tasks.filter(item=>item.status == 'Pending').length;
      let inProgress = state.tasks.filter(item=>item.status == 'in Progress').length;
      let totalCompleted = state.tasks.filter(item=>item.status == 'Completed').length;

      return  [
        {
          title: "Total ",
          count: totalTask,
          color: "primary",
        },
        {
          title: "Pending",
          count: totalPending,
          color: "red",
        },
        {
          title: "In Progress",
          count: inProgress,
          color: "#f17f21",
        },
        {
          title: "Completed",
          count: totalCompleted,
          color: "green",
        },
      ];
  },
};


// actions
export const actions = {
    fetchTasks({ commit }) {
        axios
          .get('/api/tasks') 
          .then((response) => {
            commit('SET_TASKS', response.data);
          })
          .catch((error) => {
            console.error('Error fetching tasks:', error);
          });
      },
      createTask({ commit }, taskData) {
        return new Promise((resolve, reject) => {
            axios
            .post('/api/tasks', taskData) 
            .then((response) => {
              commit('ADD_TASK', response.data.data);
              resolve(response);
            })
            .catch((error) => {
                reject(error.response.data.errors)
            });
        });
     
      },
      updateTask({ commit }, taskData) {
        axios
          .put(`/api/tasks/${taskData.id}`, taskData) 
          .then((response) => {
            commit('UPDATE_TASK', response.data.task);
          })
          .catch((error) => {
            console.error('Error updating task:', error);
          });
      },
      deleteTask({ commit }, taskId) {
        axios
          .delete(`/api/tasks/${taskId}`) 
          .then(() => {
            commit('DELETE_TASK', taskId);
          })
          .catch((error) => {
            console.error('Error deleting task:', error);
          });
      },
};

// mutations
export const mutations = {
    SET_TASKS(state, tasks) {
        state.tasks = tasks;
    },
    ADD_TASK(state, task) {
        state.tasks.push(task);
    },
    UPDATE_TASK(state, updatedTask) {
        const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
            state.tasks.splice(index, 1, updatedTask);
        }
    },
    DELETE_TASK(state, taskId) {
        state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
