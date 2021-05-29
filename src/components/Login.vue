<template>
  <div class="pt-10">
    <div class="d-flex justify-center">
      <span class="error--text">{{error}}</span>
    </div>
    <v-form ref="form" v-model="valid" class="mx-auto" lazy-validation @submit.prevent="login">
      <v-text-field
          v-model="name"
          :rules="[v => !!v || 'Name field should not be empty', v => v.length > 2 || 'Name should be more than three (2) characters']"
          label="Name"
          outlined
      />
      <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          :rules="[v => !!v || 'Password field should not be empty', v => v.length > 4 || 'Password should be more than four (4) characters']"
          :type="show ? 'text' : 'password'"
          label="Password"
          outlined
          @click:append="show = !show"/>
      <v-radio-group v-model="userType" class="mt-0">
        <v-radio value="Teacher" label="Teacher" color="black"/>
        <v-radio value="Student" label="Student" color="black"/>
      </v-radio-group>
      <div class="d-flex justify-center">
        <v-btn block color="black" depressed type="submit">
          Login
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import USER_TYPES from "@/enums/userTypes";

export default {
  name: "Login",
  data: () => ({
    valid: true,
    name: '',
    password: '',
    show: false,
    userType: '',
    error: ''
  }),
  watch: {
    error() {
      setTimeout(() => this.error = '', 4000)
    }
  },
  methods: {
    login() {
      if (!this.$refs.form.validate()) return
      const {name, password, userType} = this
      let registeredUsers = localStorage.getItem('registered_users')
      if (!registeredUsers) {
        this.error = 'Please register before you try to login';
        return
      }
      else registeredUsers = JSON.parse(registeredUsers)
      let activeUsers = localStorage.getItem('active_users')
      if (!activeUsers) activeUsers = []
      else activeUsers = JSON.parse(activeUsers)
      if (registeredUsers.some(user => user.name === name && user.password === password)) {
        if (userType === USER_TYPES.TEACHER && activeUsers.some(user => user.userType === USER_TYPES.TEACHER && user.name !== name && user.password !== password)) {
          this.error = 'There is already a teacher in the room'
          return
        }
        !activeUsers.some(user => user.name === name && user.password === password) && activeUsers.push({name, password, userType})
        localStorage.setItem('user', JSON.stringify({name, password, userType}))
        localStorage.setItem('active_users', JSON.stringify(activeUsers))
        this.$router.push('/authorized')
      } else {
        this.error = 'Please register before you try to login';
      }
    }
  }
}
</script>

<style scoped lang="scss">
.v-btn {
  color: white;
}

form {
  max-width: 350px;
}
</style>