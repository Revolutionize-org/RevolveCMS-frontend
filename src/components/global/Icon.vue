<template>
  <svg ref="svgRef" class="icon">
    <use :xlink:href="`#${id}`" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    id: { type: String, required: true }
  }
}
</script>