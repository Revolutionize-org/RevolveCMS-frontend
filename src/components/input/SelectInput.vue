<template>
  <div class="input__text">
    <h3>{{ title }}</h3>
    <select class="input__text-select" :value="modelValue" @input="valueChanged">
      <option v-for="option in options" :key="option" :value="option.toLowerCase()">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  props: {
    title: {
      type: String,
      required: true
    },
    modelValue: {
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    valueChanged(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  }
}
</script>