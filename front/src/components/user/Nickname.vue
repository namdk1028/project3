<template>
  <v-card>
    <v-card-title class="headline"> 당신의 닉네임은? </v-card-title>
    <v-card-actions>
      <div>
        <v-row class="mx-0">
          <v-col>
            <v-text-field
              filled
              placeholder="닉네임을 입력하세요 :)"
              solo
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="red lighten-3" dark @click="dialog_gender = false">
          입력완료
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Nickname",
  data() {
    return {
      dialog_nickname: false,
    };
  },
};
</script>

<style>
</style>