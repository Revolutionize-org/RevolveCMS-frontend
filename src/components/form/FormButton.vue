<template>
  <p class="form__button">
    <label>
      {{ label }}
    </label>
  </p>
</template>

<script>
import Icon from "@/components/global/Icon.vue";

export default {
  name: "FormButton",
  components: {Icon},
  props: {
    label: null
  }
}
</script>