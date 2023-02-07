<template>
  <div class="login-page">
    <el-card>
      <template #header>
        <span>黑马面经运营后台</span>
      </template>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="tc">
          <el-button type="primary" @click="submit">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data() {
    return {
      form: {
        username: 'admin8',
        password: 'admin',
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur'],
          },
          {
            min: 5,
            max: 11,
            message: '长度在 5 到 11 个字符',
            trigger: ['blur'],
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur'],
          },
          {
            pattern: /^\w{5,11}$/,
            message: '请输入 5 到 10 位的密码',
            trigger: ['blur'],
          },
        ],
      },
    }
  },
  methods: {
    async submit() {
      try {
        const valid = await this.$refs.form.validate()
        if (valid) {
          const res = await login(this.form)
          this.$store.commit('user/setToekn', res.data.token)
        }
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },

    reset() {
      this.$refs.form.resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  .el-card {
    width: 420px;
    margin: 0 auto;
    ::v-deep .el-card__header {
      color: #fff;
      font-size: 18px;
      background-color: rgba(114, 124, 245, 1);
      text-align: center;
      height: 80px;
      line-height: 40px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>
