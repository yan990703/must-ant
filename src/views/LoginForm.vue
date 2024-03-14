<script>
import Vcode from "vue-puzzle-vcode";

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      remember: false,
      isShow: false,
    }
  },
  components: {
    Vcode
  },
  mounted() {
    console.log('this.$route.params.data', this.$route.params.data); // 输出：yourData
    if (this.$route.params.data === '1') {
      this.errorNotification('您还未登录，请先登录！')
    }
  },
  methods: {
    onSuccess(params) {
      this.isShow = false;
      try {
        this.$axios.post('/login', {
          username: this.username,
          password: this.password,
          remember: this.remember
        }).then(res => {
          console.log('login的响应', res);
          if (res.status === 200) {
            let data = res.data
            if (data.state === 'Success') {
              console.log(this.$socket)
              this.$socket.auth = {
                role: 'user',
                uid: this.username,
                key: this.password
              }
              console.log(this.$socket)
              this.$socket.connect()
              this.$router.push('/')
              this.$store.dispatch('updateUserInfo', {
                username: data.username,
                email: data.email,
              });
              this.$socket.emit('createRoom', data.email)
            } else if (data.state === 'PasswordError') {
              this.errorNotification('用户名或密码错误！')
            } else if (data.state === 'IncompleteError') {
              this.errorNotification('用户名或密码不能为空！')
            } else if (data.state === 'UserNotExistsError') {
              console.log('onSuccess this', this)
              this.errorNotification('用户不存在！')
            } else {
              this.errorNotification('未知错误！')
            }
          } else {
            this.errorNotification(res.statusText)
          }
        }).catch(error => {
          this.errorNotification(error.toString())
        })
      } catch (error) {
        this.errorNotification(error.toString())
      }
    },
    onClose() {
      console.log('onClose');
      this.isShow = false;
    },
    errorNotification(description) {
      console.log('description', description);
      console.log('errorNotification this', this)
      this.$notification.error({
        message: "错误！",
        description: description,
        duration: 0,
        class: "error_notification",
        style: {
          backgroundColor: 'rgba(168, 47, 45, 0.3)',
        },
        getContainer: () => this.$refs.notificationContainer,
      })
    },
    successNotification(description) {
      this.$notification.success({
        message: '成功',
        description: description,
        duration: 6,
        class: "success_notification",
        style: {
          backgroundColor: 'rgba(6, 168, 0, 0.3)',
        },
        getContainer: () => this.$refs.notificationContainer,
      });
    },
  }
}
</script>

<template>
  <div class="login-page" ref="notificationContainer">

    <a-tooltip placement="right"
               overlayClassName="popover"
               :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
      <template slot="title">
        <span>返回首页</span>
      </template>
      <div class="backup" @click="$router.push('/')">
        <i class='bx bx-arrow-back'></i>
      </div>
    </a-tooltip>

    <form class="login-form">
      <h1 class="login-title">登录</h1>
      <div class="input-box">
        <i class='bx bxs-user'></i>
        <input type="text" placeholder="用户名" v-model="username">
      </div>
      <div class="input-box">
        <i class='bx bxs-lock-alt'></i>
        <input type="password" placeholder="密码" v-model='password'>
      </div>

      <div class="remember-forgot-box">
        <label for="remember">
          <input type="checkbox" id="remember" v-model="remember">
          记住密码
        </label>
        <a href="#">忘记密码？</a>
      </div>
      <Vcode :show="isShow" @success="onSuccess" @close="onClose"/>
      <button class="login-btn" @click="isShow=true">登录</button>
      <p class="register">
        没有帐户？
        <a @click="$router.push('/sign-up')">注册一个</a>
      </p>
    </form>
  </div>
</template>

<style scoped lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}


/deep/ .ant-tooltip-inner {
  background-color: #99CEED;
  color: #ffffff;
}

/deep/ .ant-tooltip-arrow::before {
  background-color: #99CEED;
}

.backup {
  position: fixed;
  top: 10px;
  left: 10px;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;
  width: 46px;
  height: 46px;
}

.backup i {
  width: 100%;
  height: 100%;
  font-size: 36px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}


.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(../assets/bg.jpg);
  background-size: cover;
  background-position: center;
}

.login-form {
  background: rgba(64, 64, 64, 0.15);
  border: 3px solid rgba(255, 255, 255, 0.3);
  padding: 30px;
  border-radius: 16px;
  backdrop-filter: blur(25px);
  text-align: center;
  color: white;
  width: 400px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.15);
}

.login-title {
  font-size: 40px;
  margin-bottom: 40px;
}

.input-box {
  margin: 20px 0;
  position: relative;
}

.input-box input {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 12px 12px 12px 45px;
  border-radius: 99px;
  outline: 3px solid transparent;
  transition: 0.3s;
  font-size: 17px;
  color: white;
  font-weight: 600;
}

.input-box input::placeholder {
  color: rgba(255, 255, 255, 0.8);
  font-size: 17px;
  font-weight: 500;
}

.input-box input:focus {
  outline: 3px solid rgba(255, 255, 255, 0.3);
}

.input-box input::-ms-reveal {
  filter: invert(100%);
}

.input-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
}

.remember-forgot-box {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 15px;
}

.remember-forgot-box label {
  display: flex;
  gap: 8px;
  cursor: pointer;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}

.remember-forgot-box input {
  accent-color: white;
  cursor: pointer;
}

.remember-forgot-box a {
  color: white;
  text-decoration: none;
}

.remember-forgot-box a:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 10px 0;
  background: #2F9CF4;
  border: none;
  border-radius: 99px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.login-btn:hover {
  background: #0B87EC;
}

.register {
  margin-top: 15px;
  font-size: 15px;
}

.register a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.register a:hover {
  text-decoration: underline;
}

.error_notification {
  background-color: rgba(168, 47, 45, 0.3);
  color: rgba(168, 0, 6, 1);
}


/deep/ .error_notification .ant-notification-notice-content .ant-notification-notice-with-icon .ant-notification-notice-message {
  background-color: transparent;
  color: rgba(168, 0, 6, 1) !important;
}


/deep/ .error_notification .ant-notification-notice-content .ant-notification-notice-with-icon .ant-notification-notice-description {
  color: rgba(168, 0, 6, 1) !important;
}

.success_notification {
  background-color: rgba(6, 168, 0, 0.3);
  color: rgba(6, 168, 0, 1);
}


/deep/ .success_notification .ant-notification-notice-content .ant-notification-notice-with-icon .ant-notification-notice-message {
  background-color: transparent;
  color: rgba(6, 168, 0, 1) !important;
}


/deep/ .success_notification .ant-notification-notice-content .ant-notification-notice-with-icon .ant-notification-notice-description {
  color: rgba(6, 168, 0, 1) !important;
}
</style>