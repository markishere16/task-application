import store from '../../store/index';
export default (to, from, next) => {
    store.dispatch('IsAuthenticated').then((res) => {
        if (res == 1) {
            next();

        } else {
            next('/login');
            return;
        }
    }).catch(() => {
        return next({
            path: "/login",
            replace: true
        });
    })
};
