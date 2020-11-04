<template>
  <v-card>
    <v-card-title class="headline"> 당신의 성별은? </v-card-title>
    <v-card-actions>
      <v-divider></v-divider>
      <div>
        <v-btn color="#F3CAC7" class="my-1">
          <button value="여자" text @click="emitGender">여자</button>
          <!-- 여자 -->
        </v-btn>
        <v-btn color="#B4DEEC" class="my-1">
          <button value="남자" text @click="emitGender">남자</button>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Gender",
  // props: {
  //   emitgender: "",
  // },
  data() {
    return {
      gender: "",
      dialog_gender: false,
    };
  },
  methods: {
    emitGender(event) {
      // console.log(event.target.value);
      this.gender = event.target.value;
      this.dialog_gender = true;
      // console.log(gender);
      // this.gender = this.attrs("value");
      this.$emit("getGender", this.gender);
      this.$emit("closeGender", this.dialog_gender);
    },
  },
};
</script>

<style>
</style>