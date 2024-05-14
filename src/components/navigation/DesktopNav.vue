<template>
  <nav class="navbar__desktop">
    <div class="navbar__desktop-time">
      <span>{{ currentDate }}</span>
    </div>
    <div class="navbar__desktop-user">
      <span>{{ username }}</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "DesktopNav",
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentDate: new Date().toLocaleString()
    }
  },
  created() {
    setInterval(() => {
      this.currentDate = new Date().toLocaleString();
    }, 1000);
  }
}
</script>