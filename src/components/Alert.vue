<template>
  <div class="row">
    <div
      v-if="successAlert"
      class="alert alert-success"
      :class="{ block: successAlert }"
      role="alert"
    >
      {{ successAlert }}
    </div>
    <div
      v-if="errorAlert"
      class="alert alert-danger"
      :class="{ block: errorAlert }"
      role="alert"
    >
      {{ errorAlert }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    successAlert: {
      type: String,
      default: null,
    },
    errorAlert: {
      type: String,
      default: null,
    },
  },
  async created() {
    if (successAlert) {
      this.successAlert = successAlert;
    } if (errorAlert) {
      this.errorAlert = errorAlert;
    }
  },
};
</script>