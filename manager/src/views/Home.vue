<template>
  <el-container>
    <el-aside width="200px">
      <Menu></Menu>
    </el-aside>

    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./home/Menu.vue";

export default {
  name: "Home",
  components: {
    Menu,
  },
};
</script>

<style scoped>
.el-container,
.el-side {
  height: 100%;
  padding: 0;
}

.el-header {
  background-color: white;
}

.el-container {
  height: 100%;
}

.el-main {
  height: 100%;
}
</style>