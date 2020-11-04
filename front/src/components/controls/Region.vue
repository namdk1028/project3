<template>
<div>
    <select class="select">
        <option selected>모든 지역</option>
        <option>서울</option>
        <option>경기도</option>
    </select>
</div>
</template>

<script>
export default {
    name: "Region",
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/controls/selectBox.scss"
</style>