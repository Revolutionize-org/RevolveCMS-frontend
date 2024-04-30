<template>
  <p :class="['form__button', {'--disabled' : disabled}]">
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
    label: null,
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>