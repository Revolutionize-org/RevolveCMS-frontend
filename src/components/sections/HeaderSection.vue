<template>
  <div class="base">
    <div class="base__container">
      <h2>Header section</h2>
    </div>
    <form class="base__form">
      <div class="base__container">
        <h2 class="base__page-title">Logo</h2>
        <TextInput title="Image (URL)" v-model="header.image" />
      </div>
      <div  class="base__container">
        <div v-for="(page, index) in Object.keys(header.menu.pages)">
          <h2 class="base__page-title">{{ "Page " + (index + 1) }}</h2>
          <TextInput title="Page title" v-model="header.menu.pages[page].title" />
          <TextInput title="Page link (/...)" v-model="header.menu.pages[page].link" />
          <hr v-if="index !== Object.keys(header.menu.pages).length - 1" class="base__page-separator">
        </div>
      </div>
      <div class="base__container">
        <h2 class="base__page-title">Contact</h2>
        <TextInput title="Contact title" v-model="header.menu.contact.title" />
        <TextInput title="Contact link (/...)" v-model="header.menu.contact.link" />
      </div>
      <FormButton @click="saveHeader" :disabled="has_errors" class="base__form-button" label="Save" />
    </form>
  </div>
</template>

<script>
import ImageInput from "@/components/input/ImageInput.vue";
import TextInput from "@/components/input/TextInput.vue";
import FormButton from "@/components/form/FormButton.vue";

export default {
  name: "HeaderSection",
  components: {FormButton, TextInput, ImageInput},
  data() {
    return {
      currentHeader: null,
      has_errors: true,
      header: {
        image: null,
        menu: {
          pages: {
            1: {
              title: null,
              link: null
            },
            2: {
              title: null,
              link: null
            },
            3: {
              title: null,
              link: null
            },
            4: {
              title: null,
              link: null
            },
          },
          contact: {
            title: null,
            link: null
          }
        }
      }
    }
  },
  mounted() {
      this.getHeaderData().then(() => {
        this.header = JSON.parse(this.currentHeader.data);
      });

  },
  methods: {
    checkErrors() {
      return JSON.stringify(JSON.parse(this.currentHeader.data)) === JSON.stringify(this.header);
    },
    getHeaderData(){
      return this.$store.dispatch('getHeader')
          .then(({error, message, data}) => {
            if (!error) {
              this.currentHeader = data;
            }
          })
    },
    saveHeader(){
      if (this.has_errors) return;

      const data = {
        id: this.currentHeader.id,
        name: this.currentHeader.name,
        data: JSON.stringify(this.header)
      }
      this.$store.dispatch('modifyHeader', data)
          .then(({error, message}) => {
            if (!error) {
            }
          })
    }
  },
  watch: {
    header: {
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