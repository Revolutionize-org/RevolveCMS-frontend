<template>
  <LoginForm v-if="!isLoggedIn"/>
</template>

<script>
import {LoginForm} from "@/components/sections/forms";

export default {
  name: "Login",
  components: {LoginForm},
  data() {
    return {
      isLoggedIn: true
    }
  },
  beforeCreate() {
    this.$store.dispatch('refreshToken')
        .then(({error, message}) => {
          if (!error) {
            this.$router.push('/dashboard')
          }
          else {
            this.isLoggedIn = false
          }
        })
  }
}
</script>