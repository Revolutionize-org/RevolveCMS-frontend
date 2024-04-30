<template>
  <div  class="input__text">
    <h3>{{ title }}</h3>
    <input type="text" @input="valueChanged" :value="modelValue"/>
  </div>
</template>

<script>

export default {
  name: "TextInput",
  props: {
    title: {
      type: String,
      required: true
    },
    modelValue: {
      required: true
    }
  },
  methods: {
    valueChanged(event) {
      event.target.value === ''
          ? this.$emit('update:modelValue', null)
          : this.$emit('update:modelValue', event.target.value)
    },
  }
}
</script>