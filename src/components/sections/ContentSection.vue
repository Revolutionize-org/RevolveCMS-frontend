<template>
    <div class="content">
      <transition name="fade" mode="out-in">
        <component :is="componentInstance" :key="$route.params.type + $route.params.id"/>
      </transition>
    </div>
</template>

<script>
import {HeaderSection, FooterSection} from "@/components/sections";
import PageSection from "@/components/sections/PageSection.vue";
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
        default :
            return BaseSection

      }
    }
  }
}
</script>