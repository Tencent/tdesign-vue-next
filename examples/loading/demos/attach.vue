<template>
  <div class="loading-attach-demo">
    <div id="alice" class="loading-attach-demo__title">Hello, I'm Alice.</div>
    <div id="bob" class="loading-attach-demo__title">Hi, I'm Bob.</div>
    <t-loading attach="#alice" show-overlay />
  </div>
</template>
<style scoped>
.loading-attach-demo {
  width: 15%;
}

.loading-attach-demo__title {
  position: relative;
  height: 48px;
  line-height: 48px;
}
</style>
