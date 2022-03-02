<template>
  <el-menu
        router
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#ffffff"
      >
        <h1 class="title">控制台</h1>
        <el-menu-item index="/product">
          <!-- <el-icon><icon-menu /></el-icon> -->
          <span>图书管理</span>
        </el-menu-item>
        <el-menu-item index="/coupon">
          <!-- <el-icon><box /></el-icon> -->
          <span>促销中心</span>
        </el-menu-item>
        <el-menu-item index="/feedback">
          <span>用户反馈</span>
        </el-menu-item>
        <el-menu-item index="/logistics">
          <span>物流管理</span>
        </el-menu-item>
      </el-menu>
</template>

<script>

export default {
  name: "Menu",
  components: {},
  data() {
    return {};
  },
};
</script>

<style>
.title {
  margin: 0;
  color: white;
  text-align: center;
  padding: 20px;
}

.el-menu {
  height: 100%;
  margin: 0;
}
</style>