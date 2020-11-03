<template>
  <div>
    <h1>프로필</h1>
    <v-row class="my-2" justify="center">
      <v-btn
        rounded
        color="deep-orange lighten-5"
        dark
        @click.stop="dialog_gender = true"
      >
        <p style="margin: 0px; color: #8c8c8c">성별</p>
      </v-btn>
      <v-dialog v-model="dialog_gender" max-width="290">
        <Gender />
      </v-dialog>
    </v-row>
    <v-row class="my-2" justify="center">
      <v-btn
        rounded
        color="deep-orange lighten-5"
        dark
        @click.stop="dialog_birth = true"
      >
        <p style="margin: 0px; color: #8c8c8c">생일</p>
      </v-btn>
      <v-dialog v-model="dialog_birth" max-width="290">
        <Birth />
      </v-dialog>
    </v-row>
    <v-row class="my-2" justify="center">
      <v-btn
        rounded
        color="deep-orange lighten-5"
        dark
        @click.stop="dialog_nickname = true"
      >
        <p style="margin: 0px; color: #8c8c8c">닉네임</p>
      </v-btn>
      <v-dialog v-model="dialog_nickname" max-width="290">
        <Nickname />
      </v-dialog>
    </v-row>
    <v-row class="my-2" justify="center">
      <v-btn
        rounded
        color="deep-orange lighten-5"
        dark
        @click.stop="dialog_area = true"
      >
        <p style="margin: 0px; color: #8c8c8c">지역</p>
      </v-btn>
      <v-dialog v-model="dialog_area" max-width="290">
        <Area />
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import Gender from "../../components/user/Gender.vue";
import Birth from "../../components/user/Birth.vue";
import Nickname from "../../components/user/Nickname.vue";
import Area from "../../components/user/Area.vue";
// import Height from "../../components/user/Height.vue";
// import Blood from "../../components/user/Blood.vue";
// import Religion from "../../components/user/Religion.vue";
// import Drink from "../../components/user/Drink.vue";
// import Smoke from "../../components/user/Smoke.vue";
// import Education from "../../components/user/Education.vue";
// import Hobby from "../../components/user/Hobby.vue";
// import Body from "../../components/user/Body.vue";
// import Job from "../../components/user/Job.vue";

export default {
  components: {
    Gender,
    Birth,
    Nickname,
    Area,
    // Height,
    // Blood,
    // Religion,
    // Drink,
    // Smoke,
    // Education,
    // Hobby,
    // Body,
    // Job,
  },
  name: "UserData",
  data() {
    return {
      dialog_gender: false,
      dialog_birth: false,
      dialog_nickname: false,
      dialog_area: false,
      dialog_height: false,
      dialog_blood: false,
      dialog_religion: false,
      dialog_drink: false,
      dialog_smoke: false,
      dialog_education: false,
      dialog_hobby: false,
      dialog_body: false,
      dialog_job: false,
    };
  },
};
</script>

<style>
</style>