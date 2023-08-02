
import axios from "../../plugins/axios";
// state
export const state = () => ({
    currentUser: null,
    IsAuthenticated: false,

  });
  
  // getters
  export const getters = {
    currentUser: (state) => state.currentUser,
  };
  
  
  // actions
  export const actions = {
    async IsAuthenticated({ commit }) {
      const res = await axios.get(`/api/authenticated`)
      .catch(() => {
          commit('SET_AUTHENTICATED', false);
      })
     
      if (res.data == 1) {
          window.localStorage.setItem('is_authenticated', true);
      }
  
      return res.data;
    },
    
    async loginUser({commit} , userForm) {
     return new Promise((resolve, reject) => {
      axios.post("/api/auth/login", userForm)
        .then((response) => {
          if(response.data.success) {
            localStorage.setItem('token', response.data.token)
            location.replace('')
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error.response.data.errors)
        })
      });

    },
    
    async logoutUser({}) {
      axios.post('/api/auth/logout')
         .then((response) => {
          localStorage.clear();
          location.replace('/login')
        })
        .catch((error) => {
         console.log({error})
        })
    }
  };
  
  // mutations
  export const mutations = {
   
    SET_USER: (state, data) => state.currentUser = data,
    SET_AUTHENTICATED: (state, IsAuthenticated) => state.IsAuthenticated = IsAuthenticated,

   
  };
  
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  