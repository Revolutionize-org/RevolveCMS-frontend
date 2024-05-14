<template>
  <div class="base" v-if="page">
    <div class="base__container">
      <h2>{{ page.name + " Page" }}</h2>
    </div>
    <div class="base__container">
      <h2 class="base__page-title">Page Name</h2>
      <TextInput title="Name" v-model="data.name"/>
      <h2 class="base__page-title">Page Slug</h2>
      <TextInput title="Slug" v-model="data.slug"/>
    </div>
    <form class="base__container">
      <div v-for="(block, index) in data.content.blocks" :key="index">
        <h2 class="base__page-title">Block Image</h2>
        <TextInput title="Image (URL)" v-model="data.content.blocks[index].image"/>
        <h2 class="base__page-title">Block Title</h2>
        <TextInput title="Title" v-model="data.content.blocks[index].title"/>
        <h2 class="base__page-title">Block Content</h2>
        <TextAreaInput title="Content" v-model="data.content.blocks[index].content"/>
        <h2 class="base__page-title">Block Button</h2>
        <TextInput title="Redirect (optional)" v-model="data.content.blocks[index].button"/>
        <hr v-if="index !== data.content.blocks.length - 1" class="base__page-separator">
      </div>
      <FormButton @click="addBlock" class="base__form-button --page" label="Add Block"/>
    </form>
    <FormButton :disabled="has_errors" @click="savePageData" class="base__form-button" label="Save Page"/>
  </div>
</template>
<script>
import TextInput from "@/components/input/TextInput.vue";
import FormButton from "@/components/form/FormButton.vue";
import TextAreaInput from "@/components/input/TextAreaInput.vue";

export default {
  name: "SinglePageSection",
  components: {TextAreaInput, FormButton, TextInput},
  data() {
    return {
      page: null,
      data: {
        content: [],
        name: null,
        slug: null
      },
      has_errors: true,
    }
  },
  created() {
    this.getPagesData().then(() => {
      this.data.content = JSON.parse(this.page.data)
    })
  },
  methods: {
    checkErrors() {
      if (this.data.name === null || this.data.slug === null) return true
      return JSON.stringify(JSON.parse(this.page.data)) === JSON.stringify(this.data.content) && this.data.name === this.page.name && this.data.slug === this.page.slug
    },
    getPagesData() {
      return this.$store.dispatch('getPages')
          .then(({error, message, data}) => {
            if (!error) {
              this.page = data.find(page => page.id === this.$route.params.id)
              this.data.name = this.page.name
              this.data.slug = this.page.slug
            }
          })
    },
    addBlock() {
      this.data.content.blocks.push({
        image: null,
        title: null,
        content: null,
        button: null
      })
    },
    savePageData() {
      if (this.has_errors) return;

      const data = {
        id: this.page.id,
        name: this.data.name,
        slug: this.data.slug,
        data: JSON.stringify(this.data.content)
      }

      this.$store.dispatch('modifyPage', data)
          .then(({error, message}) => {
            if (!error) {
              console.log('Page saved')
            }
          })
    }
  },
  watch: {
    data: {
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