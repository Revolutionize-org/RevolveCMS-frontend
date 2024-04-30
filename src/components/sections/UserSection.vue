<template>
  <div class="base">
    <div class="base__container">
      <h2>User Section</h2>
    </div>
    <div class="base__container">
      <ul class="base__user">
        <li>ID</li>
        <li>Name</li>
        <li>Email</li>
      </ul>
      <hr>
      <ul>
<!--        <UserCard user=""/>-->
      </ul>
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/cards/UserCard.vue";

export default {
  name: "UserSection",
  components: {UserCard},
  data() {
    return {
      user: {
        id: null,
        name: null,
        email: null
      }
    }
  },
}
</script>