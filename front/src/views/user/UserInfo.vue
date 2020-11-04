<template>
  <div>
    <Title :title="title" />
    <div class="my-4 mx-auto" style="max-width: 300px">
      <h3>프로필</h3>
      <v-row class="my-2" justify="center">
        <v-btn
          width="300px"
          rounded
          color="deep-orange lighten-5"
          dark
          @click.stop="dialog_gender = true"
        >
          <div class="info-key">성별</div>
          <div class="info-value">
            {{ this.gender }}
          </div>
        </v-btn>
        <v-dialog v-model="dialog_gender" max-width="280">
          <Gender @closeGender="closeGender" @getGender="getGender" />
        </v-dialog>
      </v-row>
      <v-row class="my-2" justify="center">
        <v-btn
          style="margin: 0 auto"
          width="300px"
          rounded
          color="deep-orange lighten-5"
          dark
          @click.stop="dialog_birth = true"
        >
          <div class="info-key">생일</div>
          <div class="info-value">
            {{ this.birth }}
          </div>
        </v-btn>
        <v-dialog v-model="dialog_birth" max-width="280">
          <Birth @closeBirth="closeBirth" @getBirth="getBirth" />
        </v-dialog>
      </v-row>
      <v-row class="my-2" justify="center">
        <v-btn
          width="300px"
          rounded
          color="deep-orange lighten-5"
          dark
          @click.stop="dialog_nickname = true"
        >
          <div class="info-key">닉네임</div>
          <div class="info-value">
            {{ this.nickname }}
          </div>
        </v-btn>
        <v-dialog v-model="dialog_nickname" max-width="280">
          <Nickname @closeNickname="closeNickname" @getNickname="getNickname" />
        </v-dialog>
      </v-row>
      <v-row class="my-2" justify="center">
        <v-btn
          width="300px"
          rounded
          color="deep-orange lighten-5"
          dark
          @click.stop="dialog_area = true"
        >
          <div class="info-key">관심지역</div>
          <div class="info-value">
            {{ this.area }}
          </div>
        </v-btn>
        <v-dialog v-model="dialog_area" max-width="280">
          <Area />
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script>
import Title from "../../components/common/Title";

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
    Title,
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
      title: "프로필등록",
      gender: "",
      birth: "",
      nickname: "",
      area: "",
      height: "",
      blood: "",
      religion: "",
      drink: "",
      smoke: "",
      education: "",
      hoby: "",
      body: "",
      job: "",
      dialog_gender: true,
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
  methods: {
    getGender(gender) {
      this.gender = gender;
    },
    closeGender() {
      this.dialog_gender = false;
      this.dialog_birth = true;
    },
    getBirth(birth) {
      this.birth = birth;
    },
    closeBirth() {
      this.dialog_birth = false;
      this.dialog_nickname = true;
    },
    getNickname(nickname) {
      this.nickname = nickname;
    },
    closeNickname() {
      this.dialog_nickname = false;
      this.dialog_area = true;
    },
  },
  watch: {},
};
</script>

<style scoped src="../../assets/scss/userinfo.scss" lang="scss">
