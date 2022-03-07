<template>
  <div class="container">
    <div class="left"></div>
    <div class="right">
      <el-dropdown>
        <el-image :src="avatarURL" class="image"></el-image>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="clickLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components';
export default {
  name: "MyHeader",
  components: {},
  data() {
    return {
      avatarURL:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  methods: {
    clickLogout() {
      localStorage.removeItem('token')
      ElMessage('已退出登录')
      this.$router.replace('/login')
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.right {
  margin: 10px 20px;
}

.image {
  height: 40px;
  width: 40px;
}
</style>