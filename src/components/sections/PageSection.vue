<template>
  <div class="base">
    <div class="base__container">
      <h2>Page Section</h2>
    </div>
    <div class="base__container">
      <ul class="base__pages-label">
        <li>Name</li>
        <li>Slug</li>
        <li>ID</li>
      </ul>
      <hr class="base__container-hr">
      <ul class="base__pages --card" v-for="(page, index) in pages" :key="page.id">
        <RouterLink :to="pageLink(page.id)">
        <li class="base__pages-label">
            <span>{{ page.name }}</span>
            <span>{{ page.slug }}</span>
            <span>{{ index+1 }}</span>
        </li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<script>
import {ROUTES} from "@/helpers/index.js";

export default {
  name: "PageSection",
  data() {
    return {
      pages: []
    }
  },
  mounted() {
    this.getPagesData()
  },
  methods: {
    getPagesData(){
      return this.$store.dispatch('getPages')
          .then(({error, message, data}) => {
            if (!error) {
              this.pages = data;
              console.log(this.pages)
            }
          })
    },
    pageLink(index) {
      return {name: ROUTES.DASHBOARD, params: {type: 'page', id: index}}
    }
  }
}
</script>