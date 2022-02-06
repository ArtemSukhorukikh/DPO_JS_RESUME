<template>
  <div>
    <select class="form-select" v-model="educationFull.selectedEducation">
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
        v-model="educationFull.university"
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
        v-model="educationFull.faculty"
      />
    </div>
    <div class="mb-3">
      <label for="specialization" class="form-label">Специальность</label>
      <FormInput
        id="specialization"
        typeInput="text"
        class="form-control"
        placeholder="АС"
        v-model="educationFull.specialization"
      />
    </div>
    <div class="mb-3">
      <label for="yearOfGraduation" class="form-label">Год окончания</label>
      <FormInput
        id="yearOfGraduation"
        typeInput="text"
        class="form-control"
        placeholder="2021"
        v-model="educationFull.yearOfGraduation"
      />
    </div>
    <button class="btn btn-primary mb-2" @click="addNewEducation">
      Добавить еще одно образование
    </button>
    <div v-if="educationFull.additionalEducationCount > 0">
      <div
        v-for="additionalEducationItem in educationFull.additionalEducations"
        v-bind:key="additionalEducationItem"
      >
        <div>
          <select
            class="form-select"
            v-model="additionalEducationItem.selectedAdditionalEducation"
          >
            <option disabled value="">Выберите один из вариантов</option>
            <option v-for="item in items" v-bind:key="item">
              {{ item.value }}
            </option>
          </select>
        </div>
        <div
          v-if="
            additionalEducationItem.selectedAdditionalEducation != 'Среднее'
          "
        >
          <div class="mb-3">
            <label for="yearOfGraduation" class="form-label">Город</label>
            <FormInput
              id="city"
              typeInput="text"
              class="form-control"
              placeholder="Липецк"
              v-model="additionalEducationItem.city"
            />
          </div>
          <div class="mb-3">
            <label for="university" class="form-label">Университет</label>
            <FormInput
              id="university"
              typeInput="text"
              class="form-control"
              placeholder="Липецкий государственный технический университет"
              v-model="additionalEducationItem.additionalUniversity"
            />
            <!-- <p v-show="showHint">Возможно вы имели ввиду...</p>
            <div class="list-group" v-show="showHint">
              <button
                @click="
                  insertSearchadditionalEducation(
                    additionalEducationItem.number - 1, $event
                  )
                "
                type="button"
                class="list-group-item list-group-item-action"
                v-for="hint in hints"
                v-bind:key="hint"
              >
                {{ hint }}
              </button>
            </div> -->
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
          <button
            @click="deleteEducation(additionalEducationItem.number - 1)"
            type="button"
            class="btn btn-danger"
          >
            Удалить
          </button>
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
      educationFull: {
        selectedEducation: " ",
        university: " ",
        faculty: " ",
        specialization: " ",
        yearOfGraduation: " ",
        additionalEducationCount: 0,
        additionalEducations: [],
      },
      needCity: " ",
      showHint: false,
      hints: [],

      fullEducation: false,

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
  props: ["modelValue", "citySearch", "educationFromDB"],
  created() {
    console.log(this.educationFromDB)
    if (this.educationFromDB != {}) {
      this.educationFull = this.educationFromDB;
      if (this.educationFull.selectedEducation != "Среднее") {
        this.fullEducation = true;
      } else {
        this.fullEducation = false;
      }
    }
  },
  watch: {
    educationFull: {
      handler(val, oldVal) {
        console.log(val.university);
        console.log(oldVal.university);
        if (val.selectedEducation != "Среднее") {
          this.fullEducation = true;
        } else {
          this.fullEducation = false;
        }
        if (this.educationFromDB == {}) {
          jsonp(
            `http://api.vk.com/method/database.getCities?country_id=1&q=${this.citySearch}&count=1&v=5.131&access_token=${process.env.VUE_APP_ACCESS_TOKEN}`,
            null,
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
                //console.log(this.citySearch);
                this.needCity = data.response.items[0].id;
                //console.log(this.needCity);
                jsonp(
                  `http://api.vk.com/method/database.getUniversities?city_id=${this.needCity}&country_id=1&q=${this.educationFull.university}&count=3&v=5.131&access_token=${process.env.VUE_APP_ACCESS_TOKEN}`,
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
        }

        this.educationFull.university = val.university;
        this.educationFull.faculty = val.faculty;
        this.educationFull.specialization = val.specialization;
        this.educationFull.yearOfGraduation = val.yearOfGraduation;
        this.$emit("update:modelValue", this.educationFull);
        //this.$emit("update:modelValue", value);
        // if (this.educationFull.additionalEducationCount > 0) {
        //   jsonp(
        //   `http://api.vk.com/method/database.getCities?country_id=1&q=${this.educationFull.additionalEducations[this.educationFull.additionalEducationCount - 1].city}&count=1&v=5.131&access_token=${process.env.VUE_APP_ACCESS_TOKEN}`,
        //   null,
        //   (err, data) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       //console.log(this.citySearch);
        //       this.needCity = data.response.items[0].id;
        //       //console.log(this.needCity);
        //       jsonp(
        //         `http://api.vk.com/method/database.getUniversities?city_id=${data.response.items[0].id}&country_id=1&q=${this.educationFull.additionalEducations[this.educationFull.additionalEducationCount - 1].university}&count=3&v=5.131&access_token=${process.env.VUE_APP_ACCESS_TOKEN}`,
        //         null,
        //         (err, data) => {
        //           if (err) {
        //             console.log(err);
        //           } else {
        //             console.log(data);
        //             this.showHint = true;
        //             this.hints = [];
        //             data.response.items.forEach((element) => {
        //               //console.log(element.title)
        //               this.hints.push(element.title);
        //             });
        //           }
        //         }
        //       );
        //     }
        //   }
        // );
        // }
      },
      deep: true,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.educationFull;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    deleteEducation(index) {
      this.educationFull.additionalEducationCount--;
      this.educationFull.additionalEducations.splice(index, 1);
    },
    addNewEducation() {
      this.educationFull.additionalEducationCount += 1;
      this.educationFull.additionalEducations.push({
        number: this.educationFull.additionalEducationCount,
        city: " ",
        selectedAdditionalEducation: " ",
        additionalUniversity: " ",
        additionalFaculty: " ",
        additionalSpecialization: " ",
        additionalYearOfGraduation: " ",
      });
    },
    insertSearch(event) {
      this.educationFull.university = event.target.innerHTML;
    },
    insertSearchadditionalEducation(index, event) {
      this.educationFull.additionalEducations[index].university =
        event.target.innerHTML;
    },
  },
};
</script>

<style>
</style>