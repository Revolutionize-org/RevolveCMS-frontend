<template>
  <p v-if="error" class="input__error">
    <label>
      {{ error }}
    </label>
  </p>
</template>

<script>
export default {
  name: "ErrorInput",
  props: {
    error: {
      required: true,
      type: String
    }
  }
}
</script>