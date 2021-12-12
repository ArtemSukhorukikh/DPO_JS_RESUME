<template>
  <select v-model="selectedEducation">
    <option disabled value="">Выберите один из вариантов</option>
    <option v-for="item in items" v-bind:key="item">
        {{ item.value }}
     </option>
</select>
<div v-show="fullEducation">
    <div class="mb-3">
          <label for="university" class="form-label">Университет</label>
          <FormInput
            id="university"
            typeInput="text"
            class="form-control"
            placeholder="Липецк"
            v-model="university"
          />
    </div>
    <div class="mb-3">
          <label for="city" class="form-label">Город проживания</label>
          <FormInput
            id="University"
            typeInput="text"
            class="form-control"
            placeholder="Липецк"
            v-model="city"
          />
    </div>
    <div class="mb-3">
          <label for="city" class="form-label">Город проживания</label>
          <FormInput
            id="city"
            typeInput="text"
            class="form-control"
            placeholder="Липецк"
            v-model="city"
          />
    </div>
</div>
</template>

<script>
export default {
    data() {
        return{
            selectedEducation: ' ',
            fullEducation : false,
            university: ' ',
            faculty: ' ',
            specialization: ' ',
            
            items: [
                {value: 'Среднее'},
                {value: 'Среднее специальное'},
                {value: 'Неоконченное высшее'},
                {value: 'Высшее'},
            ] 
            
        };
    },
    name:"FormInput",
    props:['modelValue'],
    watch:{
        selectedEducation: function (value){
            if (value != 'Среднее') {
                fullEducation = true
            }
            this.$emit('update:modelValue', value)
        }
    },
    computed:{
        inputValue: {
            get() {
               return this.selectedEducation
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    }
}
</script>

<style>

</style>