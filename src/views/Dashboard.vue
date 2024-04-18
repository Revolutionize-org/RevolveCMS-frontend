<template>
  <SiteNav :username="username" v-if="isLoggedIn"/>
  <ContentSection v-if="isLoggedIn"/>
</template>

<script>
import SiteNav from "@/components/navigation/SiteNav.vue";
import ContentSection from "@/components/sections/ContentSection.vue";

export default {
  name: "Dashboard",
  components: {ContentSection, SiteNav},
  data() {
    return {
      isLoggedIn: false,
      username: null
    }
  },
  beforeCreate() {
    this.$store.dispatch('userName')
        .then(({error, message, isLogged, username}) => {
          if (!error) {
            this.isLoggedIn = isLogged
            this.username = username
          }else {
            this.$store.dispatch('refreshToken')
                .then(({error, message}) => {
                  if (!error) {
                    this.$store.dispatch('userName')
                        .then(({error, message, isLogged, username}) => {
                          if (!error) {
                            this.isLoggedIn = isLogged
                            this.username = username
                          }
                        })
                  }else {
                    this.$router.push('/')
                  }
                })
          }
        })
  },
}
</script>