<template lang="html">
  <div class="main-wrapper">
    <router-view name="header"></router-view>
    <router-view name="content"></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .main-wrapper {
    width: 100%;
    height: 100%;
    padding-top: 56px;
    min-width: 768px;
    font-size: 17px;
  }
</style>
