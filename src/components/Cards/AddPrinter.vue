<script>
// import {h} from vue;

import Notification from '@/components/Notification'

export default {
  components: {
    Notification,
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      printer_name: '',
      printer_id: '',
      printer_describe: '',
      printer_key: '',
      addPrinterOkButton: true,
      printer_id_input_bg: ''
    }
  },
  computed: {
    userInfo() {
      let userInfo = this.$store.getters.getUserInfo;
      return {email: userInfo.email, username: userInfo.username};
    },

  },
  mounted() {
    this.$socket.on('addPrinter', (data) => {
      this.confirmLoading = false;
      this.visible = false;
      if (data.state === 'success') {
        this.$nextTick(() => {
          this.$refs.addPrinterNotification.success({
            title: '成功！',
            description: '添加打印机成功！',
          })
        })
        this.sendNewPrinter({
          name: this.printer_name,
          id: this.printer_id,
          describe: this.printer_describe,
          status: 'offline'
        })
      } else if (data.state === 'PrinterNotExists') {
        this.$nextTick(() => {
          this.$refs.addPrinterNotification.error({
            title: '错误！',
            description: '添加打印机失败！此打印机不存在！',
          })
        })
      } else {
        this.$nextTick(() => {
          this.$refs.addPrinterNotification.error({
            title: '错误！',
            description: '添加打印机失败！此打印机已经被其他用户绑定！',
          })
        })
      }
    })
  },
  methods: {
    showModal() {
      if (this.userInfo.username === undefined || this.userInfo.email === undefined || this.userInfo.username === '' || this.userInfo.email === '') {
        this.$router.push({name: 'Sign-In', params: {data: '1'}})
      } else {
        this.visible = true;
      }
    },
    handleOk(e) {
      this.confirmLoading = true;
      this.$socket.emit('addPrinter', {
        username: this.userInfo.username,
        email: this.userInfo.email,
        printer_name: this.printer_name,
        printer_id: this.printer_id,
        printer_describe: this.printer_describe,
        printer_key: this.printer_key
      })
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
      this.printer_name = '';
      this.printer_describe = '';
      this.printer_key = '';
      this.printer_id = '';
    },
    onShowNotification(type, info) {
      const notificationType = {
        open: (info) => {
          this.$nextTick(() => {
            this.$refs.addPrinterNotification.open(info)
          })
        },
        info: (info) => {
          this.$nextTick(() => {
            this.$refs.addPrinterNotification.info(info)
          })
        },
        success: (info) => {
          this.$nextTick(() => {
            this.$refs.addPrinterNotification.success(info)
          })
        },
        error: (info) => {
          this.$nextTick(() => {
            this.$refs.addPrinterNotification.error(info)
          })
        },
        warn: (info) => {
          this.$nextTick(() => {
            this.$refs.addPrinterNotification.warn(info)
          })
        },
      };
      console.log('notificationType[type]', notificationType[type])
      notificationType[type](info); // 传入type调用
    },
    onClose() { // 点击默认关闭按钮时触发的回调函数
      console.log('')
    },
    sendNewPrinter(data) {
      this.$emit('update-printer-data', data);
    },
    formatCode() {
      this.printer_id = this.printer_id.toUpperCase()
      this.printer_id = this.printer_id.replace(/[^A-Z0-9]/g, '')
      this.printer_id = this.printer_id.replace(/(.{4})/g, '$1-')
      this.printer_id = this.printer_id.replace(/-$/, '')
      if (this.printer_id.length > 39) {
        this.printer_id = this.printer_id.substring(0, 39)
      }
    },
    LimitLength() {
      if (this.printer_name.length > 18) {
        this.printer_name = this.printer_name.substring(0, 18)
        this.$message.warning('打印机名称长度不能超过18个字符')
      }
      if (this.printer_key.length > 18) {
        this.printer_key = this.printer_key.substring(0, 18)
        this.$message.warning('打印机密码长度不能超过18个字符')
      }
      if (this.printer_describe.length > 255) {
        this.printer_describe = this.printer_describe.substring(0, 255)
        this.$message.warning('打印机描述长度不能超过255个字符')
      }
    }
  },
  watch: {
    printer_id: function (newVal, oldVal) {
      if (newVal.length === 39) {
        this.$axios.post('/selectNewPrinter', {
          printer_id: newVal
        }).then((res) => {
          if (res.status === 200) {
            if (res.data.state === 'PrinterExists') {
              this.$message.success('成功找到该打印机，请输入密码！')
              this.printer_name = res.data.printer_name
              this.addPrinterOkButton = true;
              this.printer_id_input_bg = 'background-color: rgba(16, 255, 0, 0.6);';
              this.addPrinterOkButton = false;
            } else {
              this.$message.warning('未找到该打印机，请重新输入！')
              this.printer_id_input_bg = 'background-color: rgba(255, 16, 0, 0.6);'
              this.addPrinterOkButton = true;
            }
          } else {
            this.onShowNotification('error', {
              title: '错误!',
              message: res.statusText
            })
          }
        }).catch(error => {
              this.onShowNotification('error', {
                message: '错误！',
                description: error.toString()
              })
            }
        )
      }
    }
  }
}
</script>

<template>
  <!-- Active Users Card -->
  <a-card :bordered="false" class="dashboard-bar-chart">
    <div ref="addPrinterContainer" class="modal-container">
      <a-modal
          title="添加打印机"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          okText="确定"
          @cancel="handleCancel"
          cancelText="取消"
          class="add-printer-class"
          :getContainer="() => $refs.addPrinterContainer"
          :ok-button-props="{ props: { disabled: addPrinterOkButton } }"
      >
        <div class="input-box">
          <i class='bx bx-printer'></i>
          <input type="text" placeholder="打印机型号(自动获取)" v-model="printer_name" readonly>
        </div>
        <div class="input-box">
          <i class='bx bx-id-card'></i>
          <input type="text" placeholder="打印机唯一识别码" v-model="printer_id" @input="formatCode"
                 :style="printer_id_input_bg">
        </div>
        <div class="input-box">
          <i class='bx bxs-key'></i>
          <input type="password" placeholder="打印机密码" v-model="printer_key" @input="LimitLength">
        </div>
        <div class="input-box">
          <i class='bx bx-text'></i>
          <input type="text" placeholder="打印机名称" v-model="printer_describe" @input="LimitLength">
        </div>
      </a-modal>
    </div>
    <!--    <chart-bar :data="barChartData" :height="220"></chart-bar>-->
    <div class="content-div" @click="showModal()">
      <img class="video-img" alt="" src="images/add.png">
    </div>
    <div class="card-title text-center">
      <h6>
        添加打印机
      </h6>
    </div>
    <Notification
        ref="addPrinterNotification"
        placement="topRight"
        :duration="null"
        :top="30"
        @close="onClose"/>
  </a-card>

</template>

<style scoped lang="scss">
.content-div {
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #1890FF;
  border-radius: 16px;
  cursor: pointer;
}

.video-img {
  margin-top: auto;
  margin-bottom: auto;
  height: 60%;
}

.text-center {
  display: grid;
  justify-content: center;
  align-items: center;
}

.input-box {
  margin: 20px 0;
  position: relative;
}

.input-box input {
  width: 100%;
  background: rgba(24, 144, 255, 0.1);
  border: none;
  padding: 12px 12px 12px 45px;
  border-radius: 99px;
  outline: 3px solid transparent;
  transition: 0.3s;
  font-size: 17px;
  color: rgba(24, 144, 255, 1);
  font-weight: 600;
}

.input-box input::placeholder {
  color: rgba(24, 144, 255, 0.8);
  font-size: 17px;
  font-weight: 500;
}

.input-box input:focus {
  outline: 3px solid rgba(24, 144, 255, 0.6);
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
  color: rgba(24, 144, 255, 0.8);
}

.add-printer-class {
  height: 800px;
}

/deep/ .ant-modal-title {
  font-size: 22px;
  color: rgba(255, 255, 255, 1);
}

/deep/ .ant-modal-content {

  border-radius: 20px;
  background-color: rgba(231, 244, 255, 1);
}

/deep/ .ant-modal-header {
  border-radius: 20px;
  background-color: rgba(24, 144, 255, 1);
}


.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
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