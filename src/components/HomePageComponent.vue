<template>
  <div>
    <h1 class="display-4">Главная страница</h1>
    <div v-if="loading" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-if="loaded" class="row align-items-start">
      <div class="col">
        <h5 class="display-6">Новые</h5>
      </div>
      <div class="col">
        <h5 class="display-6">Назначено собеседование</h5>
      </div>
      <div class="col">
        <h5 class="display-6">Принятые</h5>
      </div>
    </div>
  </div>
</template>

<script>
//import jsonp from "jsonp";

export default {
  name: "HomePageComponent",
  data() {
    return {
      loading: true,
      loaded: false,
      newResume: null,
      scheduledInterviewResume: null,
      acceptedResume: null,
    };
  },
  watch: {
    $route: "getData",
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let response = fetch("http://127.0.0.1:3333/api/cv", {
        mode: "no-cors",
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(response)
      if (response.ok) {
        // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = response.json();
        console.log(json);
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
      // jsonp(
      //   `http://127.0.0.1:3333/api/cv`,
      //   null,
      //   (err, data) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log(data.response);
      //       this.loading = false
      //       this.loaded = true
      //     }
      //   }
      // );
    },
  },
};
</script>

<style>
</style>