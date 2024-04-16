<template>
  <LoginForm v-if="!isLoggedIn"/>
</template>

<script>
import {LoginForm} from "@/components/sections/forms";
import gql from "graphql-tag";

export default {
  name: "Login",
  components: {LoginForm},
  data() {
    return {
      isLoggedIn: true
    }
  },
  async beforeCreate() {
    try {
      const req = await this.$apollo.mutate({
        mutation: gql`
        mutation RefreshToken {
            refreshToken
        }
      `,
      })

      if (req.data) {
        localStorage.setItem('accessToken', req.data.refreshToken)
        this.$router.push('/dashboard')
      }

    }catch (error) {
      this.isLoggedIn = false
    }
  }
}
</script>