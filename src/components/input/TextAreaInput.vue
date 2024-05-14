<template>
  <div class="input__text">
    <h3>{{ title }}</h3>
    <textarea rows="3" @input="AreaValueChanged" :value="modelValue"/>
  </div>
</template>

<script>
export default {
  name: "TextAreaInput",
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
    AreaValueChanged(event) {
      event.target.value === '' ? this.$emit('update:modelValue', null) : this.$emit('update:modelValue', event.target.value)
      event.target.style.height = 'auto'
      event.target.style.height = event.target.scrollHeight + 'px'
    }
  }
}
</script>