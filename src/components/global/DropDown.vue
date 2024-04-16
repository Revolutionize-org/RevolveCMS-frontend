<template>
  <Component :is="tag" class="dropdown" :style="style" @transitionend="emitter.emit('transition-end')">
    <Component :is="contentTag" ref="content" :class="className">
      <slot />
    </Component>
  </Component>
</template>

<script>
export default {
  name: 'DropDown',
  inject: ['emitter'],
  props: {
    isOpen: { type: Boolean, required: true },
    tag: { type: String, default: 'div' },
    contentTag: { type: String, default: 'div' },
    contentClass: { type: [String, Array, Object], default: Array },
    transitionKey: { type: [String, Number, Array, Object], default: null }
  },
  data() {
    return { height: this.isOpen ? 'auto' : 0 }
  },
  computed: {
    className() {
      const contentClass = Array.isArray(this.contentClass) ? this.contentClass : [this.contentClass]
      return ['dropdown__content', { '-open': this.isOpen }, ...contentClass]
    },
    style() {
      return {
        height: !Number(this.height) ? this.height : `${this.height}px`
      }
    }
  },
  watch: {
    isOpen(isOpen, wasOpen) {
      if (isOpen === wasOpen) return
      if (wasOpen) this.height = this.$refs.content.clientHeight
      else this.resetAfterTransition()

      this.$nextTick(() => {
        setTimeout(() => {
          this.height = this.isOpen ? this.$refs.content.clientHeight : 0
        }, 10)
      })
    },
    transitionKey(to, from) {
      if (to === from || !this.isOpen) return
      this.height = this.$refs.content.clientHeight
      this.resetAfterTransition()

      this.$nextTick(() => {
        setTimeout(() => {
          this.height = this.isOpen ? this.$refs.content.clientHeight : 0
        }, 10)
      })
    }
  },
  methods: {
    resetAfterTransition() {
      this.emitter.on('transition-end', () => {
        if (this.isOpen) this.height = 'auto'
      })
    }
  }
}
</script>

<style lang="scss">
.dropdown {
  overflow: hidden;
  backface-visibility: hidden;
  transition: height 425ms cubic-bezier(0.6, 0.05, 0.01, 0.99);

  &__content {
    margin-top: 0;
    margin-bottom: 0;
    opacity: 0;
    transform: translate3d(0, -1.25rem, 0);
    pointer-events: none;
    transition: transform 400ms cubic-bezier(0.6, 0.05, 0.01, 0.99), opacity 250ms linear;

    &::before,
    &::after {
      content: '';
      display: table;
    }

    &.-open {
      opacity: 1;
      transform: translateZ(0);
      pointer-events: auto;
      z-index: 0;
      transition: transform 425ms cubic-bezier(0.6, 0.05, 0.01, 0.99), opacity 250ms linear 150ms;
    }
  }
}
</style>
