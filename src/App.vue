<template>
  <p>
    <router-link to="/">Главная</router-link> |
    <router-link to="/new">Новое резюме</router-link>
  </p>
  <router-view></router-view>
  <div class="container-xl ">
    <!-- <FormComponent/> -->
  </div>
</template>
  
<script>
//import FormComponent from "./components/FormComponent";

export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
