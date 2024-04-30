<template>
  <li>
    <span>
      {{ user.id }}
    </span>
    <span>
      {{ user.name }}
    </span>
    <span>
      {{ user.email }}
    </span>
  </li>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>