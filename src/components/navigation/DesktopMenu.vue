<template>
  <div class="menu__container">
      <div class="menu__desktop">
        <div>
        <div class="menu__desktop-img">
          <RouterLink :to="{name: ROUTES.DASHBOARD}">
            <img :src="imageSrc" alt="">
          </RouterLink>
          <hr>
        </div>
        <ul v-for="item in menu" :key="item.name">
          <RouterLink :to="{name: ROUTES.DASHBOARD, params: {type: item.link}}" :title="item.name">
            {{ item.name }}
          </RouterLink>
        </ul>
      </div>
        <span style="cursor: pointer" @click="logout">
          Logout
        </span>
    </div>
  </div>
</template>

<script>
import {ROUTES} from "@/helpers/index.js";
import logo from "@/assets/logo.png";

export default {
  name: "DesktopMenu",
  computed: {
    ROUTES() {
      return ROUTES
    }
  },
  data() {
    return {
      imageSrc: logo,
      menu: {
        header: {
          name: 'Header',
          link: 'header'
        },
        footer: {
          name: 'Footer',
          link: 'footer'
        },
        page: {
          name: 'Page',
          link: 'page'
        }
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
          .then(({error, message}) => {
            if (!error) {
              this.$router.push('/')
            }else {
              console.error(message)
            }
          })
    }
  }
}
</script>