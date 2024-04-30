<template>
  <div class="input__image">
    <h3>Image</h3>
    <label>{{ selectedImage }}</label>
    <label class="input__label" for="image">Add image</label>
    <input class="input__image-button" type="file" id="image" accept="image/*" @input="valueChange">
    <ErrorInput :error="currentError"/>
  </div>
</template>

<script>
import ErrorInput from "@/components/input/ErrorInput.vue";

export default {
  name: "ImageInput",
  components: {ErrorInput},
  data() {
    return {
      currentError: ''
    }
  },
  props: {
    modelValue: {
      required: true
    }
  },
  computed: {
    selectedImage() {
      if (!this.modelValue) return 'No image selected'

      return this.modelValue.name
    }
  },
  methods: {
    valueChange(event) {
      const maxSize = 2 * 1024 * 1024
      if (event.target.files[0].size < maxSize) {
        this.$emit('update:modelValue', event.target.files[0])
        this.currentError = ''
      } else {
        this.currentError = 'File size is too big. Max size is 2MB.'
      }

    }
  }
}
</script>