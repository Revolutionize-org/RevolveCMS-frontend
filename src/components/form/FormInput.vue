<template>
  <div class="form__field">
    <label :for="name" class="form__label">
      <span>{{ label }}</span>
    </label>
    <input :type="type" :id="name" :name="name" class="form__input" @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      required: true
    },
    optional: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>