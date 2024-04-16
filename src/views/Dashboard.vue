<template>
  <SiteNav/>
  <ContentSection/>
</template>

<script>
import SiteNav from "@/components/navigation/SiteNav.vue";
import ContentSection from "@/components/sections/ContentSection.vue";

export default {
  name: "Dashboard",
  components: {ContentSection, SiteNav}
}
</script>