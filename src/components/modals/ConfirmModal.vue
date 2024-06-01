<template>
  <transition name="fade">
    <div class="modal" v-if="visible">
      <div class="modal__content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this page?</p>
        <button @click="confirmDelete">Yes</button>
        <button @click="cancelDelete">No</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    confirmDelete() {
      this.$emit('confirm');
    },
    cancelDelete() {
      this.$emit('cancel');
    }
  }
}
</script>
