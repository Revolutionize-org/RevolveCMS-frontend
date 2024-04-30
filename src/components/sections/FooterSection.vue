<template>
  <div class="base">
    <div class="base__container">
      <h2>Footer section</h2>
    </div>
    <form class="base__form">
      <div class="base__container">
        <h2 class="base__page-title">Logo</h2>
        <TextInput title="Image (URL)" v-model="footer.image" />
      </div>
      <div  class="base__container">
        <div v-for="(page, index) in Object.keys(footer.menu.pages)">
          <h2 class="base__page-title">{{ "Page " + (index + 1) }}</h2>
          <TextInput title="Page title" v-model="footer.menu.pages[page].title" />
          <TextInput title="Page link (/...)" v-model="footer.menu.pages[page].link" />
          <hr v-if="index !== Object.keys(footer.menu.pages).length - 1" class="base__page-separator">
        </div>
      </div>
      <div class="base__container">
        <h2 class="base__page-title">Credits</h2>
        <TextInput title="Credits" v-model="footer.menu.credits" />
      </div>
      <FormButton @click="saveFooter" :disabled="has_errors" class="base__form-button" label="Save" />
    </form>
  </div>
</template>

<script>
import FormButton from "@/components/form/FormButton.vue";
import TextInput from "@/components/input/TextInput.vue";

export default {
  name: "FooterSection",
  components: {TextInput, FormButton},
  data() {
    return {
      currentFooter: null,
      has_errors: true,
      footer: {
        logo: null,
        menu: {
          pages: [
            {
              title: null,
              link: null
            },
            {
              title: null,
              link: null
            },
            {
              title: null,
              link: null
            }
          ],
          credits: null
        }
      }
    }
  },
  mounted() {
    this.getFooterData().then(() => {
      this.footer = JSON.parse(this.currentFooter.data);
    });
  },
  methods: {
    checkErrors() {
      return JSON.stringify(JSON.parse(this.currentFooter.data)) === JSON.stringify(this.footer);
    },
    getFooterData(){
      return this.$store.dispatch('getFooter')
          .then(({error, message, data}) => {
            if (!error) {
              this.currentFooter = data;
            }
          })
    },
    saveFooter(){
      if (this.has_errors) return;

      const data = {
        id: this.currentFooter.id,
        name: this.currentFooter.name,
        data: JSON.stringify(this.footer)
      }
      this.$store.dispatch('modifyFooter', data)
          .then(({error, message}) => {
            if (!error) {
              console.log('Footer saved')
            }
          })
    }
  },
  watch: {
    footer: {
      deep: true,
      handler() {
        setTimeout(() => {
          this.has_errors = this.checkErrors();
        }, 100)
      }
    }
  }
}
</script>