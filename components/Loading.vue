<template>
  <b-modal
    centered
    hide-header
    hide-footer
    no-close-on-backdrop
    :visible="visible"
    v-if="visible"
    class="loading"
  >
    <div class="content">
      <b-spinner class="mr-2"></b-spinner>
      <h5>{{ message }}...</h5>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: 'Loading',
    },
  },
}
</script>

<style scoped>
.loading {
  min-height: 100vh;
  width: 100vw;
  background: rgb(128, 128, 128, 85%);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 2px;
}
h5 {
  margin: 0;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
