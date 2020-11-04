<template>
  <v-card>
    <v-card-title class="headline"> 당신의 성별은? </v-card-title>
    <v-card-actions>
      <v-divider></v-divider>
      <div>
        <v-btn
          value="여자"
          color="pink lighten-1"
          text
          @click="emitGender(value)"
        >
          여자
        </v-btn>
        <v-btn color="blue darken-1" text @click="dialog_gender = false">
          남자
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
    emitGender(value) {
      this.$emit("getGender", value);
    },
  },
};
</script>

<style>
</style>