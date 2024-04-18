<template>
  <header class="navbar">
    <DesktopNav :username="username" v-if="mq.mdPlus"/>
    <MobileNav :username="username" v-if="!mq.mdPlus"/>
  </header>
</template>

<script>
import DesktopNav from "@/components/navigation/DesktopNav.vue";
import MobileNav from "@/components/navigation/MobileNav.vue";

export default {
  name: "SiteNav",
  inject: ['mq'],
  components: {MobileNav, DesktopNav},
  props: {
    username: {
      type: String,
      required: true
    }
  }
}
</script>