<template>
  <v-card class="mx-auto">
    <v-card-title class="headline"> 당신의 학력은? </v-card-title>
    <v-card-actions class="d-block">
      <div class="submit-btn">
        <button class="btn" value="고등학교 졸업" text @click="emitEducation">
          고등학교 졸업
        </button>
        <button class="btn" value="전문대학교" text @click="emitEducation;">
          전문대학교
        </button>
        <button class="btn" value="대학교" text @click="emitEducation;">
          대학교
        </button>
        <button class="btn" value="외국 대학교" text @click="emitEducation">
          외국대학교
        </button>
        <button class="btn" value="대학원" text @click="emitEducation;">
          대학원
        </button>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Education",

  data() {
    return {
      Education: "",
      dialog_education: true,
    };
  },
  methods: {
    emitEducation(event) {
      this.education = event.target.value;
      // this.dialog_education = true;
      this.$emit("getEducation", this.education);
      this.$emit("closeEducation", this.dialog_education);
    },
  },
};
</script>

<style scoped src="../../assets/scss/userinfo.scss" lang="scss">
