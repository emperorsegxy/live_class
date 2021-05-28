<template>
  <ul>
    <li v-for="(user, i) in users" :key="i">
      <user-item :user="user"/>
    </li>
  </ul>
</template>

<script>
import UserItem from "@/components/UserItem";
export default {
  name: "UsersList",
  components: {UserItem},
  props: {
    users: Array
  }
}
</script>

<style scoped lang="scss">
  ul {
    list-style: none;
  }
</style>