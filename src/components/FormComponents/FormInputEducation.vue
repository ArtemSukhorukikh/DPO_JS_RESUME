<template>
  <div>
    <select class="form-select" v-model="selectedEducation">
      <option disabled value="">Выберите один из вариантов</option>
      <option v-for="item in items" v-bind:key="item">
        {{ item.value }}
      </option>
    </select>
  </div>
  <div v-if="fullEducation">
    <div class="mb-3">
      <label for="university" class="form-label">Университет</label>
      <FormInput
        id="university"
        typeInput="text"
        class="form-control"
        placeholder="Липецкий государственный технический университет"
        v-model="university"
      />
      <p v-show="showHint">Возможно вы имели ввиду...</p>
      <div class="list-group" v-show="showHint">
        <button
          @click="insertSearch"
          type="button"
          class="list-group-item list-group-item-action"
          v-for="hint in hints"
          v-bind:key="hint"
        >
          {{ hint }}
        </button>
      </div>
    </div>
    <div class="mb-3">
      <label for="faculty" class="form-label">Факультет</label>
      <FormInput
        id="faculty"
        typeInput="text"
        class="form-control"
        placeholder="ФАИ"
        v-model="faculty"
      />
    </div>
    <div class="mb-3">
      <label for="specialization" class="form-label">Специальность</label>
      <FormInput
        id="specialization"
        typeInput="text"
        class="form-control"
        placeholder="АС"
        v-model="specialization"
      />
    </div>
    <div class="mb-3">
      <label for="yearOfGraduation" class="form-label">Год окончания</label>
      <FormInput
        id="yearOfGraduation"
        typeInput="text"
        class="form-control"
        placeholder="2021"
        v-model="yearOfGraduation"
      />
    </div>
    <button @click="addNewEducation">Добавить еще одно образование</button>
    <div v-if="additionalEducationCount > 0">
      <div
        v-for="additionalEducationItem in additionalEducations"
        v-bind:key="additionalEducationItem"
      >
        <div>
          <select class="form-select" v-model="additionalEducationItem.selectedAdditionalEducation">
            <option disabled value="">Выберите один из вариантов</option>
            <option v-for="item in items" v-bind:key="item">
              {{ item.value }}
            </option>
          </select>
        </div>
        <div v-if="fullEducation">
          <div class="mb-3">
            <label for="university" class="form-label">Университет</label>
            <FormInput
              id="university"
              typeInput="text"
              class="form-control"
              placeholder="Липецкий государственный технический университет"
              v-model="additionalEducationItem.additionalUniversity"
            />
            <p v-show="showHint">Возможно вы имели ввиду...</p>
            <div class="list-group" v-show="showHint">
              <button
                @click="insertSearch"
                type="button"
                class="list-group-item list-group-item-action"
                v-for="hint in hints"
                v-bind:key="hint"
              >
                {{ hint }}
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="faculty" class="form-label">Факультет</label>
            <FormInput
              id="faculty"
              typeInput="text"
              class="form-control"
              placeholder="ФАИ"
              v-model="additionalEducationItem.additionalFaculty"
            />
          </div>
          <div class="mb-3">
            <label for="specialization" class="form-label">Специальность</label>
            <FormInput
              id="specialization"
              typeInput="text"
              class="form-control"
              placeholder="АС"
              v-model="additionalEducationItem.additionalSpecialization"
            />
          </div>
          <div class="mb-3">
            <label for="yearOfGraduation" class="form-label"
              >Год окончания</label
            >
            <FormInput
              id="yearOfGraduation"
              typeInput="text"
              class="form-control"
              placeholder="2021"
              v-model="additionalEducationItem.additionalYearOfGraduation"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormInput from "./FormInput.vue";
import jsonp from "jsonp";

export default {
  data() {
    return {
      additionalEducationCount: 0,
      additionalEducations: [],
      needCity: " ",
      showHint: false,
      hints: [],
      selectedEducation: " ",
      fullEducation: false,
      university: " ",
      faculty: " ",
      specialization: " ",
      yearOfGraduation: " ",
      items: [
        { value: "Среднее" },
        { value: "Среднее специальное" },
        { value: "Неоконченное высшее" },
        { value: "Высшее" },
      ],
    };
  },
  components: {
    FormInput,
  },
  name: "FormInputEducation",
  props: ["modelValue", "citySearch"],
  watch: {
    selectedEducation: function (value) {
      if (value != "Среднее") {
        this.fullEducation = true;
      } else {
        this.fullEducation = false;
      }
      this.$emit("update:modelValue", value);
    },
    university: function (value) {
      jsonp(
        `http://api.vk.com/method/database.getCities?country_id=1&q=${this.citySearch}&count=1&v=5.131&access_token=${process.env.VUE_APP_ACCESS_TOKEN}`,
        null,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(this.citySearch);
            this.needCity = data.response.items[0].id;
            console.log(this.needCity);
            jsonp(
              `http://api.vk.com/method/database.getUniversities?city_id=${this.needCity}&country_id=1&q=${this.university}&count=3&v=5.131&access_token=${process.env.VUE_APP_ACCESS_TOKEN}`,
              null,
              (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(data);
                  this.showHint = true;
                  this.hints = [];
                  data.response.items.forEach((element) => {
                    //console.log(element.title)
                    this.hints.push(element.title);
                  });
                }
              }
            );
          }
        }
      );
      this.$emit("update:modelValue", this.selectedEducation + ": " + value);
    },
    specialization: function (value) {
      this.$emit(
        "update:modelValue",
        this.selectedEducation + ": " + this.university + " " + value
      );
    },
    faculty: function (value) {
      this.$emit(
        "update:modelValue",
        this.selectedEducation + ": " + this.university + " " + value
      );
    },
    yearOfGraduation: function (value) {
      this.$emit(
        "update:modelValue",
        this.selectedEducation +
          ": " +
          this.university +
          " " +
          this.faculty +
          " " +
          value
      );
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.selectedEducation;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    addNewEducation() {
      this.additionalEducationCount += 1;
      this.additionalEducation.push([
        {
          selectedAdditionalEducation: "",
          additionalUniversity: "",
          additionalFaculty: " ",
          additionalSpecialization: " ",
          additionalYearOfGraduation: " ",
        },
      ]);
    },
    insertSearch(event) {
      this.university = event.target.innerHTML;
      this.$emit(
        "update:modelValue",
        this.selectedEducation + ": " + event.target.innerHTML
      );
    },
  },
};
</script>

<style>
</style>