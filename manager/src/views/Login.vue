<template>
  <div class="login-container">
    <div class="main">
      <!-- logo -->

      <div class="login-box">
        <div class="login-title">登录</div>
        <el-form ref="formRef" :model="form" label-width="0" label-position="right" class="login-form" show-message validate-on-rule-change>
          <el-form-item :rules="[{ required: true, message: '用户名不能为空'}]">
            <el-input v-model="form.username" placeholder="用户名" clearable
              maxlength="15" minlength="1" validate-event
              class="form-input" />
          </el-form-item>
          <el-form-item :rules="[{ required: true, message: '密码不能为空'}]">
            <!-- 背景色： input-style="background-color: #f4f4f4" -->
            <el-input v-model="form.password" placeholder="密码" show-password
              maxlength="15" minlength="1" validate-event
              class="form-input" />
          </el-form-item>
          <el-form-item class="form-buttons">
            <el-button type="primary" @click.once="clickLogin" class="button" @keyup.enter="clickLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { RequestLogin } from '../utils/request/user'
import { ElMessage } from 'element-plus'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      form: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    // 点击登录
    clickLogin() {
      if (this.form.username == '') {
        ElMessage('用户名不能为空！')
        return
      }
      if (this.form.password == '') {
        ElMessage('密码不能为空！')
        return
      }
      let req = {
        username: this.form.username,
        password: this.form.password,
      }
      RequestLogin(req, res => {
        if (res.code != 0) {
          console.warn("requestLogin error: ", res)
          let msg = '登录失败'
          // 密码错误
          if (res.code == 20003) {
            msg = '密码错误'
          } else if (res.code == 21001) {
            // 用户名错误/不存在
            msg = '用户不存在'
          }
          ElMessage(msg)
          return
        }
        let token = res.data.token
        localStorage.setItem('token', token)
        console.log('登录成功：', token)

        ElMessage('登录成功！')

        setTimeout(() => {
          this.$router.replace('/')
        }, 1000);
      })
    },
  }
}
</script>

<style scoped>
.login-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f0f2f5 url("../assets/login_bg.png");
}

.main {
  width: 400px;
  margin: 20px 0;
}

.login-box {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-clip: padding-box;
  border-radius: 10px;
  padding: 10px 0;
  box-shadow: 0 2px 9px 0 rgb(37 43 147 / 25%);
}

.login-title {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin: 10px 0;
}

.form-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.form-input {
  width: 280px;
  border-radius: 8px;
}

.button {
  width: 280px;
}

</style>