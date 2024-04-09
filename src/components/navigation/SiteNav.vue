<template>
  <header class="navbar">
    <DesktopNav/>
  </header>
</template>

<script>
import DesktopNav from "@/components/navigation/DesktopNav.vue";

export default {
  name: "SiteNav",
  components: {DesktopNav}
}
</script>