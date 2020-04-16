<template lang="html">
  <form accept-charset="UTF-8" action="/so/search" method="get">
    <input
    type="text" class="search-query" name="keywords" v-model="keywords"
    autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false"
    aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;">
    <pre
    aria-hidden="true"
    style="position: absolute; visibility: hidden; white-space: pre; font-family: system-ui; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre>
    <a href="javascript:void(0)" class="search-btn">
      嘿嘿
    </a>
  </form>

</template>

<script>
export default {
  name: 'AnimateInput',
  props: {}
}
</script>

<style lang="scss" scoped>
form {
  position: relative;
  // top: 9px;
  margin: 0 0 20px;
  .search-query {
    padding: 0 40px 0 20px;
    width: 160px;
    height: 38px;
    font-size: 14px;
    border: 1px solid #eee;
    border-radius: 40px;
    background: #eee;
    transition: width .5s;
    -moz-transition: width .5s;
    -webkit-transition: width .5s;
    -o-transition: width .5s;
    transition-delay: .1s;
    -moz-transition-delay: .1s;
    -webkit-transition-delay: .1s;
    -o-transition-delay: .1s;
  }
  .search-query:focus {
    transition-delay: 0s;
    -moz-transition-delay: 0s;
    -webkit-transition-delay: 0s;
    -o-transition-delay: 0s;
    width: 240px;
    outline: none;
  }
  .search-btn {

  }
  @media (min-width: 1439px) {
    .search-input:focus {
        width: 320px;
    }
  }
}
</style>
