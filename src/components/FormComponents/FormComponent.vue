<template>
  <div  class="row row-cols-2">
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
          <FormInputCity placeholder="Липецк" v-model="city" />
        </div>
        <div v-if="loaded" class="mb-3">
          <label for="education" class="form-label">Образование</label>
          <FormInputEducation
            :citySearch="city"
            id="education"
            class="form-control"
            v-model="education"
            :educationFromDB="education"
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
          <FormInput
            class="form-control"
            typeInput="text"
            id="formFile"
            v-model="url"
          />
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
        <button @click="sendData" class="btn btn-primary" type="submit">
          Отправить
        </button>
      </form>
    </div>
    <div class="col">
      <img id="formFoto" src="" />
      <h1>Ваше резюме</h1>
      <p>ФИО:{{ fullName() }}</p>
      <p>Дата рождения:{{ dateBirth }}</p>
      <p>Город проживания:{{ city }}</p>
      <p>Образование:{{ outPutDataEducation }}</p>
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
import axios from "axios"

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
      education: {},
      profession: "",
      desiredSalary: "",
      keySkills: "",
      city: "",
      about: "",
      url: "",
      statusResume: "Новый",
      outPutDataEducation: " ",
      sendDataToAPI: {},
      loaded : false
    };
  },
  components: {
    FormInput,
    FormInputEducation,
    FormInputPhone,
    FormInputCity,
  },
  created() {
    console.log(this.$router)
    if (this.$router.currentRoute._value.params.id != undefined ) {
      console.log(this.$router.currentRoute._value.params.id);
      axios
        .get("http://localhost:8080/api/cv/"+this.$router.currentRoute._value.params.id)
        .then((response) => {
          console.log(response);
          this.firstName = response.data.full_name.split(' ')[0]
          this.secondName = response.data.full_name.split(' ')[1]
          this.patronymic = response.data.full_name.split(' ')[2]
          this.phone = response.data.phone
          this.email = response.data.email
          this.dateBirth = response.data.date_of_birth.substr(0, 16)
          this.education = {
              selectedEducation: response.data.education.selectedEducation,
              university: response.data.education.university,
              faculty: response.data.education.faculty,
              specialization: response.data.education.specialization,
              yearOfGraduation: response.data.education.yearOfGraduation,
              additionalEducationCount: response.data.education.additionalEducationCount,
              additionalEducations: response.data.education.additionalEducations,
          },
          this.profession = response.data.profession
          this.city = response.data.city
          this.desiredSalary = response.data.desired_salary
          this.keySkills = response.data.key_skills
          this.about = response.data.about_yourself
          this.url = response.data.url_photo
          this.statusResume =  response.data.status_of_resume
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => ((this.loaded = true)));
    }
    this.loaded = true
  },
  watch: {
    url: function (value) {
      document.getElementById("formFoto").src = value;
    },
    education: {
      handler() {
        this.fullEducation()
      },
      deep:true
    }
    
  },
  methods: {
    fullName() {
      return this.secondName + " " + this.firstName + " " + this.patronymic;
    },
    sendData() {
      console.log(this.$router.currentRoute);
      console.log(this.sendDataToAPI)
      if (this.$router.currentRoute._value.path == "/new" ) {
        axios
          .post("http://localhost:8080/api/cv/add", {
            full_name: this.fullName(),
            phone: this.phone,
            email: this.email,
            date_of_birth: this.dateBirth,
            education: {
              selectedEducation: this.education.selectedEducation,
              university: this.education.university,
              faculty: this.education.faculty,
              specialization: this.education.specialization,
              yearOfGraduation: this.education.yearOfGraduation,
              additionalEducationCount: this.education.additionalEducationCount,
              additionalEducations: (this.education.additionalEducations),
            },
            profession: this.profession,
            city: this.city,
            desired_salary: this.desiredSalary,
            key_skills: this.keySkills,
            about_yourself: this.about,
            url_photo: this.url,
            status_of_resume: this.statusResume,
          })
          .then((response) => {
            console.log('ok');
            console.log(response);
          })
          .catch((error) => {
            console.log('err');
            console.log(error);
            this.errored = true;
          })
      } else {
        axios
          .put("http://localhost:8080/api/cv/"+this.$router.currentRoute._value.params.id+"/edit", {
            id: this.$router.currentRoute._value.params.id,
            full_name: this.fullName(),
            phone: this.phone,
            email: this.email,
            date_of_birth: this.dateBirth,
            education: {
              selectedEducation: this.education.selectedEducation,
              university: this.education.university,
              faculty: this.education.faculty,
              specialization: this.education.specialization,
              yearOfGraduation: this.education.yearOfGraduation,
              additionalEducationCount: this.education.additionalEducationCount,
              additionalEducations: (this.education.additionalEducations),
            },
            profession: this.profession,
            city: this.city,
            desired_salary: this.desiredSalary,
            key_skills: this.keySkills,
            about_yourself: this.about,
            url_photo: this.url,
            status_of_resume: this.statusResume,
          })
          .then((response) => {
            console.log('ok');
            console.log(response);
          })
          .catch((error) => {
            console.log('err');
            console.log(error);
            this.errored = true;
          })
      } 
    },
    fullEducation() {
      this.outPutDataEducation = ""
      if (this.education.yearOfGraduation != undefined) {
        this.outPutDataEducation += this.education.selectedEducation + " " + this.education.university + " " + this.education.faculty + " " + this.education.specialization + " " + this.education.yearOfGraduation + " ."
      }
      if (this.education.additionalEducationCount > 0) {
        this.education.additionalEducations.forEach(additionalEducation => {
          if (additionalEducation.selectedAdditionalEducation != "Среднее") {
            if (additionalEducation.city != " " && additionalEducation.university != " " && additionalEducation.faculty != " " && additionalEducation.specialization != " " && additionalEducation.yearOfGraduation!= " ") {
              this.outPutDataEducation += additionalEducation.city + " " +  additionalEducation.selectedAdditionalEducation + " " + additionalEducation.additionalUniversity + " " + additionalEducation.additionalFaculty + " " + additionalEducation.additionalSpecialization + " " + additionalEducation.additionalYearOfGraduation + " ."
            }
          }else {
            this.outPutDataEducation += additionalEducation.selectedAdditionalEducation
          }
        })
      }
      return this.outPutDataEducation
    }
  },
};
</script>

<style>
  img {
    height: 8em;
    width: 6em;
  }
</style>