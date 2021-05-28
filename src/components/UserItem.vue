<template>
  <div class="d-flex align-center mx-auto justify-space-between user_item-wrapper my-2 pb-2 px-5">
    <div class="d-flex">
      <v-avatar color="black">
        {{ initial }}
      </v-avatar>
      <div class="ml-3">
        <div class="font-weight-bold" style="color: slategray">{{ user.name }}</div>
        <small :class="[user.userType.toLowerCase()]" class="user_type">{{ user.userType }}</small>
      </div>
    </div>
    <div class="menu d-flex justify-center align-center pa-1">
      <svg fill="none" height="17" viewBox="0 0 17 17" width="17" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8.18717 9.19173C8.55536 9.19173 8.85384 8.89326 8.85384 8.52507C8.85384 8.15688 8.55536 7.8584 8.18717 7.8584C7.81898 7.8584 7.52051 8.15688 7.52051 8.52507C7.52051 8.89326 7.81898 9.19173 8.18717 9.19173Z"
            fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        <path
            d="M12.8542 9.19173C13.2224 9.19173 13.5208 8.89326 13.5208 8.52507C13.5208 8.15688 13.2224 7.8584 12.8542 7.8584C12.486 7.8584 12.1875 8.15688 12.1875 8.52507C12.1875 8.89326 12.486 9.19173 12.8542 9.19173Z"
            fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        <path
            d="M3.52116 9.19173C3.88935 9.19173 4.18783 8.89326 4.18783 8.52507C4.18783 8.15688 3.88935 7.8584 3.52116 7.8584C3.15297 7.8584 2.85449 8.15688 2.85449 8.52507C2.85449 8.89326 3.15297 9.19173 3.52116 9.19173Z"
            fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserItem",
  computed: {
    initial() {
      return this.user.name.substr(0, 1).toUpperCase()
    }
  },
  props: {
    user: Object
  }
}
</script>

<style lang="scss" scoped>
.user_item-wrapper {
  max-width: 500px;
  border-bottom: 1px solid #ccc;
}

.user_type {
  padding: 5px 7px;
  border-radius: 4px;
  color: antiquewhite;

  &.teacher {
    background: green;
  }

  &.student {
    background: #008eef;
  }
}

.v-avatar {
  color: white;
  font-weight: bold;
}

.menu {
  cursor: pointer;
  //transform: rotate(90deg);
  transition: all .2s ease;

  &:hover {
    background: #cccccc;
    border-radius: 4px;
  }
}
</style>