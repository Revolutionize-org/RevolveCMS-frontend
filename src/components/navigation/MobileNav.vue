<template>
  <nav class="navbar__mobile">
    <div class="navbar__mobile-top">
      <img @click="this.$router.push('/dashboard')" :src="imageSrc" alt="logo">
      <div class="navbar__mobile-buttons">
        <h2 class="navbar__mobile-username">{{ username }}</h2>
        <button :class="['hamburger', {'--opened': isMenuOpen}]" @click="isMenuOpen = !isMenuOpen"
                :title="isMenuOpen ? 'close' : 'open'">
          <span class="bar" v-for="i in 3" :key="i"></span>
        </button>
      </div>
    </div>
    <DropDown :is-open="isMenuOpen">
      <MobileNavPanel @closeMenu="handleClickedLink"/>
    </DropDown>
  </nav>
</template>

<script>
import DropDown from "@/components/global/DropDown.vue";
import {bodyHelpers} from "@/helpers/index.js";
import MobileNavPanel from "@/components/navigation/MobileNavPanel.vue";
import logo from '@/assets/logo.png'

export default {
  name: "MobileNav",
  components: {MobileNavPanel, DropDown},
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imageSrc: logo,
      isMenuOpen: false
    }
  },
  methods: {
    handleClickedLink(value) {
      this.isMenuOpen = value
    }
  },
  watch: {
    isMenuOpen() {
      this.isMenuOpen ? bodyHelpers.lock() : bodyHelpers.unlock()
    },
    '$route'() {
      if (this.isMenuOpen) this.isMenuOpen = false
    }
  }
}
</script>