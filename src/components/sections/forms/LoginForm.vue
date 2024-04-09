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
        <FormInput name="username" :model-value="form.fields.username" label="Your username"/>
        <FormInput type="password" name="password" :model-value="form.fields.password" label="Your password"/>
        <div class="form__login">
          <FormButton label="Sign in"/>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import logo from '@/assets/logo.png'
import FormInput from "@/components/form/FormInput.vue";
import FormButton from "@/components/form/FormButton.vue";

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
        }
      }
    }
  }
}
</script>