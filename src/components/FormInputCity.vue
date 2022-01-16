<template>
  <input id="city" class="form-control" type="text" v-model="inputValue"/>
  <ul v-show="showHint">
      <p class="lead">Возможно вы имели ввиду...</p>
      <li class="lead" v-for="hint in hints" v-bind:key="hint">
          {{hint}}
      </li>
  </ul>
</template>

<script>
import  jsonp  from 'jsonp'
//const axios = require('axios').default;
export default {
    name:"FormInputCity",
    data() {
        return {
            showHint: false,
            hints: [],
        }
    },
    props:['modelValue'],
    watch: {
        inputValue: function () {
            jsonp(`http://api.vk.com/method/database.getCities?country_id=1&q=${this.inputValue}&count=3&v=5.131&access_token=915622cfb7b869e574e0d1831ed3f5fabca461b3198fc277089e09357b508ebca531cef25cdae5dc72014`, null, (err, data) => {
                if (err) 
                {
                    console.log(err)
                }
                else
                {
                    console.log(data)
                    this.showHint = true
                    this.hints = []
                    data.response.items.forEach(element => {
                        console.log(element.title)
                        this.hints.push(element.title)
                    });
                }
            })
            // VK.api.call('database.getCities', {
            //     country_id: 1,
            //     q: `${this.inputValue}`,
            //     count: 3,
            //     v: 5.131,
            //     access_token: `915622cfb7b869e574e0d1831ed3f5fabca461b3198fc277089e09357b508ebca531cef25cdae5dc72014`
            // }, function (r) {
            //     console.log(r)
            // })
            // axios
            // .get(`http://api.vk.com/method/database.getCities?country_id=1&q=${this.inputValue}&count=3&v=5.131&access_token=915622cfb7b869e574e0d1831ed3f5fabca461b3198fc277089e09357b508ebca531cef25cdae5dc72014`)
            // .then(console.log(response => (console.log(response))))
        }
    },
    computed:{
        inputValue: {
            get() {
               return this.modelValue
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