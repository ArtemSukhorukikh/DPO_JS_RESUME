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
    </div>
</template>

<script>
import FormInput from "./FormInput.vue";

export default {
  data() {
    return {
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
    FormInput
  },
  name: "FormInputEducation",
  props: ["modelValue"],
  watch: {
    selectedEducation: function (value) {
      if (value != "Среднее") {
        this.fullEducation = true
      }
      else {
          this.fullEducation = false
      }
      this.$emit("update:modelValue", value);
    },
    university: function (value) {
      this.$emit("update:modelValue", this.selectedEducation + value);
    },
    specialization: function (value) {
      this.$emit("update:modelValue", this.selectedEducation + this.university + " " + value);
    },
    faculty: function (value) {
      this.$emit("update:modelValue", this.selectedEducation + this.university+ " " + value);
    },
    yearOfGraduation: function (value) {
     this.$emit("update:modelValue", this.selectedEducation + this.university + " " + this.faculty + " " + value);
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
};
</script>

<style>
</style>