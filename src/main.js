import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js';
import FormComponent from "./components/FormComponents/FormComponent";
import HomePage from "./components/HomePageComponent"
import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
    {path: '/new', component: FormComponent},
    {path: '/', component: HomePage},
    {path: '/edit/:id', component: FormComponent}
  ]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })


createApp(App).use(router).mount('#app')
