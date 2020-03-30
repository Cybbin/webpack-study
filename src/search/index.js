import Vue from 'vue'
import searchBox from './search-box.vue'
// import largeNumber from 'webpack_study_chen'
// import { a } from './tree-shaking'

import common from '../../common'

console.log(common)
// console.log(largeNumber)

new Vue({
  data: {
    text: '123'
    // number: largeNumber('99999', '1')
  },
  components: {
    searchBox
  },
  mounted () {
  },
  methods: {
    dynamicImport () {
      import('./text.js').then((text) => {
        this.text = text.default()
      })
    }
  }
}).$mount('#app')
