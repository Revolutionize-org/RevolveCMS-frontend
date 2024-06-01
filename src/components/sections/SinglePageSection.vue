<template>
  <div class="base" v-if="page">
    <div class="base__container">
      <h2>{{ page.name + " Page" }}</h2>
    </div>
    <div class="base__container">
      <TextInput title="Page Name" v-model="data.name"/>
      <TextInput title="Page Slug" v-model="data.slug"/>
    </div>
    <form class="base__container">
      <div v-for="(block, index) in data.content.blocks" :key="index">
        <div class="base__container-block">
          <h2>Block {{ index + 1 }}</h2>
          <button @click="removeBlock(index)" class="form__button --delete">Delete Block</button>
        </div>
        <TextInput title="Image (URL)" v-model="data.content.blocks[index].image"/>
        <TextInput title="Title" v-model="data.content.blocks[index].title"/>
        <TextAreaInput title="Content" v-model="data.content.blocks[index].content"/>
        <TextInput title="Button Name (optional)" v-model="data.content.blocks[index].button"/>
        <TextInput title="Button Redirect (optional)" v-model="data.content.blocks[index].redirect"/>
        <SelectInput title="Alignment" :options="alignmentOptions" v-model="data.content.blocks[index].align"/>
        <hr v-if="index !== data.content.blocks.length - 1" class="base__page-separator">
      </div>
      <FormButton @click="addBlock" class="base__form-button --page" label="Add Block"/>
    </form>
    <FormButton :disabled="has_errors" @click="savePageData" class="base__form-button" label="Save Page"/>
    <FormButton @click="showDeleteModal" class="base__form-button --red" label="Delete Page"/>

    <ConfirmModal :visible="showModal" @confirm="deletePage" @cancel="hideDeleteModal"/>
  </div>
</template>
<script>
import TextInput from "@/components/input/TextInput.vue";
import FormButton from "@/components/form/FormButton.vue";
import TextAreaInput from "@/components/input/TextAreaInput.vue";
import SelectInput from "@/components/input/SelectInput.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import {bodyHelpers} from "@/helpers/index.js";

export default {
  name: "SinglePageSection",
  components: {ConfirmModal, SelectInput, TextAreaInput, FormButton, TextInput},
  data() {
    return {
      alignmentOptions: ['Left', 'Center', 'Right'],
      page: null,
      data: {
        content: [],
        name: null,
        slug: null
      },
      has_errors: true,
      showModal: false
    }
  },
  created() {
    this.getPagesData().then(() => {
      this.data.content = JSON.parse(this.page.data)
    })
  },
  methods: {
    showDeleteModal() {
      this.showModal = true;
    },
    hideDeleteModal() {
      this.showModal = false;
    },
    checkErrors() {
      // Check if the page name or slug is null
      if (this.data.name === null || this.data.slug === null) return true;

      // Check if any block content is null
      for (let block of this.data.content.blocks) {
        if (block.image === null || block.title === null || block.content === null) {
          return true;
        }
      }

      // Check if the data is unchanged
      return JSON.stringify(JSON.parse(this.page.data)) === JSON.stringify(this.data.content) &&
          this.data.name === this.page.name &&
          this.data.slug === this.page.slug;
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
        button: null,
        redirect: null,
        align: 'left'
      })
    },
    removeBlock(index) {
      this.data.content.blocks.splice(index, 1);
    },
    deletePage() {
      this.$store.dispatch('deletePage', this.page.id)
          .then(({error, message}) => {
            if (!error) {
              this.$router.push('/dashboard/page')
            }
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
    },
    'showModal'() {
      this.showModal ? bodyHelpers.lock() : bodyHelpers.unlock()
    }
  }
}
</script>