<template>
  <div class="content">
    <component :is="componentInstance"/>
  </div>
</template>

<script>
import {HeaderSection, FooterSection} from "@/components/sections";
import PageSection from "@/components/sections/PageSection.vue";
import UserSection from "@/components/sections/UserSection.vue";
import BaseSection from "@/components/sections/BaseSection.vue";
import SinglePageSection from "@/components/sections/SinglePageSection.vue";
export default {
  name: "ContentSection",
  computed: {
    componentInstance() {
      if (!this.$route.params.type) return BaseSection

      switch (this.$route.params.type) {
        case 'header':
          return HeaderSection
        case 'footer':
          return FooterSection
        case 'page':
          if (this.$route.params.id) return SinglePageSection
          return PageSection
        case 'user':
          return UserSection
        default :
            return BaseSection

      }
    }
  }
}
</script>