<template>
  <v-card>
    <v-card-title class="headline"> 당신의 성별은? </v-card-title>
    <v-card-actions>
      <v-divider></v-divider>
      <div>
        <v-btn color="pink lighten-1" text @click="dialog_gender = false">
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
  data() {
    return {
      dialog_gender: false,
    };
  },
};
</script>

<style>
</style>