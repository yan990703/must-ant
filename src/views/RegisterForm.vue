<script>
import Vcode from "vue-puzzle-vcode";

function isValidEmail(email) {
  console.log(email);
  // 正则表达式来匹配合法的电子邮件地址
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  console.log(emailRegex.test(email))
  // 使用正则表达式的 test 方法检查电子邮件地址是否匹配
  return emailRegex.test(email);
}

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      code: '',
      codeShow: false,
      code_wait: false,
      remainingTime: 120,
      serverCode: '',
    }
  },
  components: {
    Vcode,
  },
  methods: {
    errorNotification(description) {
      console.log('description', description);
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
    startCountdown(rTime = 120) {
      this.remainingTime = rTime;
      const intervalId = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          clearInterval(intervalId);
          this.remainingTime = 120;
          // 在这里执行倒计时结束后的操作，例如显示提示信息或调用其他方法
          this.code_wait = false;
        }
      }, 1000);
    },
    onCodeSuccess(params) {
      if (this.email === '') {
        this.errorNotification('请输入邮箱！');
        this.codeShow = false;
      } else if (!isValidEmail(this.email)) {
        this.errorNotification('请输入正确的邮箱格式！');
        this.codeShow = false;
      } else {
        this.codeShow = false;
        this.code_wait = true;
        try {
          this.$axios.post('/send_code',
              {
                email: this.email
              },
              {
                timeout: 3000
              }).then(res => {
            console.log('reg的响应', res);
            let data = res.data
            if (res.status === 200) {
              if (data.state === 'Success') {
                this.serverCode = data.code
                this.startCountdown()
                this.successNotification('验证码发送成功！120秒内有效。')
              } else if (data.state === 'remainingTime') {
                this.serverCode = data.code
                this.startCountdown(data.remainingTime)
                this.successNotification('上一个验证码未使用，还有' + data.remainingTime + '秒有效。')
              } else if (data.state === 'EmailExists') {
                this.code_wait = false;
                this.errorNotification('该邮箱已注册!')
              } else {
                this.errorNotification('')
              }
            } else {
              this.errorNotification(res.statusText)
            }
          }).catch(error => {
            this.code_wait = false;
            this.errorNotification(error.toString())
          })
        } catch (error) {
          this.errorNotification(error.toString())
        }
      }
    },
    onCodeClose() {
      console.log('onClose');
      this.codeShow = false;
    },
    onRegister() {
      if (this.username === '' || this.email === '' || this.password === '' || this.confirmPassword === '' || this.code === '') {
        this.errorNotification('请填写完整信息!')
      } else {
        if (this.code === this.serverCode && this.serverCode !== '') {
          if (this.password === this.confirmPassword) {
            this.$axios.post('/register',
                {
                  username: this.username,
                  email: this.email,
                  password: this.password,
                  code: this.code,
                }
            ).then(res => {
                  console.log('响应', res);
                  let data = res.data
                  if (res.status === 200) {
                    if (data.state === 'Success') {
                      this.successNotification('注册成功!')
                      this.$socket.auth = {
                        role: 'user',
                        uid: this.username,
                        key: this.password
                      }
                      this.$socket.connect()
                      this.$router.push('/')
                      this.$store.dispatch('updateUserInfo', {
                        username: this.username,
                        email: this.email,
                      });
                      this.$socket.emit('createRoom', data.email)
                    } else if (data.state === 'UserExists') {
                      this.errorNotification('该用户名已经被注册!')
                    } else if (data.state === 'EmailExists') {
                      this.errorNotification('该邮箱已经被注册!')
                    } else if (data.state === 'CodeError') {
                      this.errorNotification('验证码错误!')
                    } else {
                      this.errorNotification('注册失败!')
                    }
                  } else {
                    this.errorNotification(res.statusText)
                  }
                }
            ).catch(error => {
              this.errorNotification(error.toString())
            })
          } else {
            this.errorNotification('两次输入的密码不一致!')
          }
        } else {
          this.errorNotification('验证码错误!')
        }
      }
    },
    successNotification(msg) {
      this.$notification.success({
        message: '成功',
        description: msg,
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
        <input type="password" placeholder="密码" v-model="password">
      </div>
      <div class="input-box">
        <i class='bx bxs-lock-alt'></i>
        <input type="password" placeholder="确认密码" v-model="confirmPassword">
      </div>
      <div class="input-box">
        <i class='bx bx-envelope'></i>
        <input type="email" placeholder="邮箱" v-model="email">
      </div>
      <div class="input-box">
        <i class='bx bx-code-alt'></i>
        <input type="text" placeholder="验证码" v-model="code">
        <Vcode :show="codeShow" @success="onCodeSuccess" @close="onCodeClose"/>
        <a-button v-if="!code_wait" class="send-code" type="link" size="small" @click="codeShow=true"
                  :loading="code_wait">发送验证码
        </a-button>
        <a-button v-if="code_wait" class="send-code" type="link" size="small" @click="codeShow=true"
                  :loading="code_wait">
          {{ remainingTime }}秒
        </a-button>
      </div>
      <button class="login-btn" @click="onRegister">注册</button>
      <p class="register">
        已有帐户？
        <a @click="$router.push('/sign-in')">前往登录</a>
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

.backup {
  position: fixed;
  top: 10px;
  left: 10px;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;
  width: 60px;
  height: 60px;
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

/deep/ .ant-tooltip-inner {
  background-color: #99CEED;
  color: #ffffff;
}

/deep/ .ant-tooltip-arrow::before {
  background-color: #99CEED;
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
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.15);
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

.input-box button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
}

.send-code {
  background-color: transparent;
  border-color: transparent;
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

.ant-btn.ant-btn-loading::before {
  background-color: transparent;
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