<template>
  <el-container>
    <el-aside width="200px">
      <Menu></Menu>
    </el-aside>

    <el-container>
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./home/Menu.vue";
import MyHeader from "../components/MyHeader.vue"

export default {
  name: "Home",
  components: {
    Menu,
    MyHeader,
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