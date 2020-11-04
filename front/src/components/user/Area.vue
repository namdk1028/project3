<template>
  <v-card>
    <v-card-title class="headline"> 활동 지역은 어디인가요? </v-card-title>
    <v-card-actions>
      <v-container>
        <div>
          <v-row>
            <v-col>
              <v-select :items="area" label="활동 지역" outlined></v-select>
            </v-col>
          </v-row>
          <v-btn color="red lighten-3" dark @click="dialog_area = false">
            입력완료
          </v-btn>
        </div>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Birth",
  data() {
    return {
      dialog_area: false,
      area: [
        "서울",
        "경기",
        "부산",
        "인천",
        "대구",
        "대전",
        "광주",
        "울산",
        "세종시",
        "충청남도",
        "충청북도",
        "경상남도",
        "경상북도",
        "전라남도",
        "전라북도",
        "강원도",
        "제주도",
      ],
    };
  },
};
</script>

<style>
.v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active {
  width: 200px;
}
</style>