<template>
  <nav class="navbar__desktop">
  </nav>
</template>

<script>
import logo from '@/assets/logo.png'
export default {
  name: "DesktopNav",
  data() {
    return {
      imageSrc: logo
    }
  },
  props: {
    username: {
      type: String,
      required: true
    }
  }
}
</script>