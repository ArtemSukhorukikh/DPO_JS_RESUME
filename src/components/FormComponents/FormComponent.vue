<template>
  <div class="row row-cols-2">
    <div class="col form d-flex align-items-start flex-fill">
      <form class="form-control-lg">
        <h1 class="display-5">Основная информация</h1>
        <div class="d-flex flex-row justify-content-evenly">
          <div class="mb-3">
            <label for="surname" class="form-label">Фамилия</label>
            <FormInput
              id="surname"
              typeInput="text"
              class="form-control"
              placeholder="Иванов"
              v-model="secondName"
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Имя</label>
            <FormInput
              id="name"
              typeInput="text"
              class="form-control"
              placeholder="Иван"
              v-model="firstName"
            />
          </div>
          <div class="mb-3">
            <label for="patronymic" class="form-label">Отчество</label>
            <FormInput
              id="patronymic"
              typeInput="text"
              class="form-control"
              placeholder="Иванович"
              v-model="patronymic"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="dateBirth" class="form-label">Дата рождения</label>
          <FormInput
            id="dateBirth"
            typeInput="datetime-local"
            class="form-control"
            v-model="dateBirth"
          />
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">Город проживания</label>
          <FormInputCity
            placeholder="Липецк"
            v-model="city"
          />
        </div>
        <div class="mb-3">
          <label for="education" class="form-label">Образование</label>
          <FormInputEducation
            :citySearch = "city"
            id="education"
            class="form-control"
            v-model="education"
          />
        </div>
        <h1 class="display-5 mt-3">Контактная информация</h1>
        <div class="mb-3">
          <label for="email" class="form-label">Электронная почта</label>
          <FormInput
            id="email"
            typeInput="email"
            class="form-control"
            placeholder="name@example.com"
            v-model="email"
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Телефон</label>
          <FormInputPhone
            id="phone"
            typeInput="tel"
            class="form-control"
            placeholder="89998887766"
            v-model="phone"
          />
        </div>
        <h1 class="display-5 mt-3">Информация о работе</h1>
        <div class="mb-3">
          <label for="profession" class="form-label">Профессия</label>
          <FormInput
            id="profession"
            typeInput="text"
            class="form-control"
            placeholder="Программист"
            v-model="profession"
          />
        </div>
        <div class="mb-3">
          <label for="desiredSalary" class="form-label"
            >Желаемая зарплата в руб.</label
          >
          <FormInput
            id="desiredSalary"
            typeInput="number"
            class="form-control"
            placeholder="10000"
            v-model="desiredSalary"
          />
        </div>
        <div class="mb-3">
          <label for="keySkills" class="form-label">Ключеные навыки</label>
          <textarea
            id="keySkills"
            class="form-control"
            rows="3"
            v-model="keySkills"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="about" class="form-label">О себе</label>
          <textarea
            id="about"
            class="form-control"
            rows="3"
            v-model="about"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">Фото</label>
          <FormInput class="form-control" typeInput="text" id="formFile" v-model="url"/>
        </div>
        <div class="mb-3">
          <label for="statusResume" class="form-label">Статус резюме</label>
          <div id="v-model-select">
            <select class="form-select" v-model="statusResume">
              <option selected>Новый</option>
              <option>Назначено собеседование</option>
              <option>Принят</option>
              <option>Отказ</option>
            </select>
          </div>
        </div>
      </form>
    </div>
    <div class="col">
      <img id="formFoto" src=""/>
      <h1>Ваше резюме</h1>
      <p>ФИО:{{ fullName() }}</p>
      <p>Дата рождения:{{ dateBirth }}</p>
      <p>Город проживания:{{ city }}</p>
      <p>Образование:{{ education }}</p>
      <p>Эл. почта:{{ email }}</p>
      <p>Номер телефона:{{ phone }}</p>
      <p>Профессия:{{ profession }}</p>
      <p>Желаемая ЗП:{{ desiredSalary }}</p>
      <p>Ключевые навыки:{{ keySkills }}</p>
      <p>О себе:{{ about }}</p>
      <p></p>
    </div>
  </div>
</template>

<script>
import FormInput from "./FormInput.vue";
import FormInputEducation from "./FormInputEducation.vue";
import FormInputPhone from "./FormInputPhone.vue";
import FormInputCity from "./FormInputCity.vue";

export default {
  name: "FormComponent",
  data() {
    return {
      firstName: " ",
      secondName: " ",
      patronymic: " ",
      phone: "",
      email: "",
      dateBirth: "",
      education: "",
      profession: "",
      desiredSalary: "",
      keySkills: "",
      city: "",
      about: "",
      url: "",
      statusResume: "Новый",
    };
  },
  components: {
    FormInput,
    FormInputEducation,
    FormInputPhone,
    FormInputCity,
  },
  watch: {
    url: function (value) {
      document.getElementById("formFoto").src = value;
    },
  },
  methods: {
    fullName() {
      return this.secondName + " " + this.firstName + " " + this.patronymic;
    },
  },
};
</script>

<style>
</style>