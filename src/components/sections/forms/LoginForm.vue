<template>
  <section class="login">
    <div class="login__container">
      <div class="login__image">
        <img :src="imageSrc" alt="logo">
        <h2>Revolve CMS</h2>
      </div>
      <div class="login__separator">
        <hr>
      </div>
      <form class="form">
        <h2 class="form__title">Log into your account</h2>
        <FormInput name="username" v-model="form.fields.username" label="Your email"/>
        <FormInput type="password" name="password" v-model="form.fields.password" label="Your password"/>
        <div class="form__login">
          <FormButton @click="login" label="Sign in"/>
          <div>
            <transition name="fade">
              <span v-if="form.errorMessage">{{ form.errorMessage }}</span>
            </transition>

          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import logo from '@/assets/logo.png'
import FormInput from "@/components/form/FormInput.vue";
import FormButton from "@/components/form/FormButton.vue";
import gql from "graphql-tag";

export default {
  name: "LoginForm",
  components: {FormButton, FormInput},
  data() {
    return {
      imageSrc: logo,
      form: {
        fields: {
          username: null,
          password: null
        },
        errorMessage: null,
      },
      storeDispatchMethod: 'loginUser'
    }
  },
  methods: {
    login() {
      this.$store.dispatch(this.storeDispatchMethod, this.form.fields)
          .then(({error, message}) => {
            if (!error) {
              this.$router.push('/dashboard')
            }else {
              this.form.errorMessage = message
            }
          })
    }
  },
  watch: {
    'form.errorMessage'(to) {
      if (to) {
        setTimeout(() => {
          this.form.errorMessage = null
        }, 5000)
      }
    }
  }
}
</script>