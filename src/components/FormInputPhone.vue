<template>
  <input type="number"   v-model="inputValue"/>
</template>

<script>
export default {
    name:"FormInputPhone",
    props:['modelValue'],
    computed:{
        inputValue: {
            get() {
               return this.modelValue
            },
            set(value) {
                if (value.length >= 6 && value.length <= 11) {
                    document.getElementById('phone').classList.remove("is-invalid")
                    this.$emit('update:modelValue', value)
                }
                else
                {
                    document.getElementById('phone').classList.add("is-invalid")
                    this.$emit('update:modelValue', value)
                }
                
            }
        }
    }
}
</script>

<style>

</style>