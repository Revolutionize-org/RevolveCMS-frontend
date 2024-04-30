<template>
  <div class="navbar__mobile-panel">
    <ul class="navbar__mobile-pages">
      <li v-for="item in menu" :key="item.name" class="navbar__mobile-page">
        <RouterLink @click="closeMenu" :to="{name: ROUTES.DASHBOARD, params: {type: item.link}}" :title="item.name" class="navbar__mobile-link">
          {{ item.name }}
        </RouterLink>
      </li>
      <li class="navbar__mobile-page">
        <span @click="logout" class="navbar__mobile-link --logout">
          Logout
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '@/components/global/Icon.vue'
import {ROUTES} from "@/helpers/index.js";

export default {
	name: 'MobileNavPanel',
  computed: {
    ROUTES() {
      return ROUTES
    }
  },
	components: {Icon},
  data() {
    return {
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
        },
        user: {
          name: 'Users',
          link: 'user'
        }
      }
    }
  },
	methods: {
		closeMenu() {
			this.$emit('closeMenu', false)
		},
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
