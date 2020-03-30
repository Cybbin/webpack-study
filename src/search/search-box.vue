<template>
  <div class="search-box">
    1
    <!--<img :src="kv" alt="kv">-->
    <i class="ico ico-brand-2020"></i>
  </div>
</template>

<script>
  // import kv from './images/kv-black-left.png'

  export default {
    data () {
      return {
        // kv
      }
    },
    mounted () {
      console.log(123)
    }
  }
</script>


<style lang="scss">
  @import './search-box.scss';

  .search-box {
    display: flex;
    font-size: 100px;
  }
</style>
