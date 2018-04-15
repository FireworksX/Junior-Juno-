// y

import 'particles.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from './components/Form.vue'
import Dashboard from './components/Dashboard.vue'
import VueResource from 'vue-resource'

particlesJS.load('form__overlay', 'particlesjs-config.json', () => console.log('Particles enabled'));



Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
    { path: '/sign', component: Form },
    { path: '/dashboard', component: Dashboard },
];

const router = new VueRouter({
    routes,
    // mode: 'history'
});

let vm = new Vue({
    el: '#app',
    router,
    data: {

    },
    methods: {
        getSession () {
            this.$http.post("http://localhost:2000/profile").then( (res) => {
                if(res.data !== false && typeof res.data === 'object'){
                    console.log(res)
                    this.$router.replace('dashboard')
                }else{
                    this.$router.replace('sign')
                }
            }, (err) => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.getSession();
    }
});

