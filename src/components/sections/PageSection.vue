<template>
  <div class="base">
    <div class="base__container">
      <h2>Page Section</h2>
    </div>
    <div class="base__container">
      <ul class="base__pages-label">
        <li>Name</li>
        <li>Slug</li>
        <li>Modify</li>
      </ul>
      <hr class="base__container-hr">
      <ul class="base__pages --card" v-for="page in pages" :key="page.id">
        <li class="base__pages-label">
          <span>{{ page.name }}</span>
          <span>{{ page.slug }}</span>
          <span class="base__pages-modify">
            <button>
            <Icon id="arrow"/>
          </button>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/global/Icon.vue";

export default {
  name: "PageSection",
  components: {Icon},
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
  }
}
</script>