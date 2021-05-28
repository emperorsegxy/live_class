<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">
        <h2>Online Class</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        v-if="$route.name === 'Register' || $route.name === 'Login'"
        :to="$route.name === 'Register' ? '/login' : '/'"
        text
      >
        {{ $route.name === 'Register' ? 'Login' : 'Register' }}
      </v-btn>
      <v-btn v-else text @click="logout">
        Log out
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    logout() {
      localStorage.removeItem('user')
      const users = JSON.parse(localStorage.getItem('active_users'))
      users.pop()
      localStorage.setItem('active_users', JSON.stringify(users))
      this.$router.push({name: 'Login'})
    }
  }
};
</script>
