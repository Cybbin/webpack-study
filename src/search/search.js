import Vue from 'vue'
import searchBox from './search-box.vue'

new Vue({
  data: {
    test: 'test msg'
  },
  components: {
    searchBox
  }
}).$mount('#app')
