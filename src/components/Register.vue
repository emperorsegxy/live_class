<template>
  <div class="pt-10">
    <div class="d-flex justify-center mb-3">
      <span class="error--text">{{error}}</span>
    </div>
    <v-form ref="form" class="mx-auto" @submit.prevent="registerUser" v-model="valid" lazy-validation>
      <v-text-field
          label="Name"
          v-model="name"
          outlined
          :rules="[v => !!v || 'Name field should not be empty', v => v.length > 2 || 'Name should be more than three (2) characters']"
      />
      <v-text-field
          label="Password"
          v-model="password"
          :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          :rules="[v => !!v || 'Password field should not be empty', v => v.length > 4 || 'Password should be more than 4 characters']"
          outlined/>
      <v-radio-group v-model="userType" class="mt-0 mb-2" :rules="[v => !!v || 'You must choose one of the options']">
        <v-radio :value="TEACHER" :label="TEACHER" color="black"/>
        <v-radio :value="STUDENT" :label="STUDENT" color="black"/>
      </v-radio-group>
      <div class="d-flex justify-center">
        <v-btn type="submit" depressed color="black" block>
          Register
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import USER_TYPES from "@/enums/userTypes"
export default {
  name: "Register",
  data: () => ({
    name: '',
    password: '',
    userType: '',
    valid: true,
    show: false,
    error: '',
    TEACHER: USER_TYPES.TEACHER,
    STUDENT: USER_TYPES.STUDENT
  }),
  methods: {
    registerUser() {
      if (!this.$refs.form.validate()) return
      const {name, password, userType} = this
      let users = localStorage.getItem('registered_users')
      if (!users) users = []
      else users = JSON.parse(users)
      if (users.some(user => user.name === name && user.password === password)) {
        this.error = 'User is already registered'
        return
      }
      users.push({name, password, userType})
      localStorage.setItem('registered_users', JSON.stringify(users))
      this.$router.push('/login')
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