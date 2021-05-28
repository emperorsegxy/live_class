<template>
  <div class="fill-height">
    <v-row class="fill-height pa-3">
      <v-col cols="12" md="8">
        <div class="presentation_screen d-flex justify-center align-center fill-height">
         <div v-show="presenting" >
           <div>
             <v-btn class="mb-4" color="#FF2E2E" @click="stopCapture" depressed :disabled="!presenting">Stop share</v-btn>
           </div>
            <video id="video" ref="video" autoplay/>
         </div>
          <div v-show="!presenting">
            <div>
              <v-avatar color="red" size="260">
                <span style="font-size: 200px; color: white">{{user.name.substr(0, 1).toUpperCase()}}</span>
              </v-avatar>
            </div>
            <div v-if="user.userType === TEACHER" class="mt-5">
              <v-btn @click="startCapture" depressed color="#008eef" class="mr-3">Share screen</v-btn>
              <v-btn depressed :disabled="!presenting">Stop share</v-btn>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex">
          <h2>Welcome, {{user.name}}!</h2>
          <v-spacer/>
          <v-btn color="red" depressed>Leave</v-btn>
        </div>
        <users-list :users="users"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import USER_TYPES from "@/enums/userTypes";
import UsersList from "@/components/UsersList";

export default {
  name: "Authorized",
  components: {UsersList},
  data: () => ({
    TEACHER: USER_TYPES.TEACHER,
    STUDENT: USER_TYPES.STUDENT,
    presenting: false,
    displayMediaOptions: {
      video: {
        cursor: "always"
      },
      audio: false
    }
  }),
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'))
    },
    users() {
      return JSON.parse(localStorage.getItem('active_users'))
    }
  },
  methods: {
    async startCapture() {
      console.log(this.$refs.video)
      try {
        this.$refs.video.srcObject = await navigator.mediaDevices.getDisplayMedia(this.displayMediaOptions)
        this.presenting = true
      } catch (e) {
        console.log(e)
        this.presenting = false
      }
    },
    stopCapture() {
      this.$refs.video.srcObject.getTracks().forEach(track => track.stop())
      this.presenting = false
      this.$refs.video.srcObject = null
    }
  }
}
</script>

<style scoped lang="scss">
  .presentation_screen {
    border: black solid 1px;
    border-radius: 4px;
  }

  .v-btn {
    color: white;
  }

  #video {
    border: 1px solid #999;
    width: 98%;
    max-width: 860px;
  }
</style>