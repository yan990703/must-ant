<template>
  <!-- Active Users Card -->
  <a-card :bordered="false" class="dashboard-bar-chart">
    <Notification
        ref="addPrinterNotification"
        placement="topRight"
        :duration="null"
        :top="30"
        @close="onClose"/>
    <div ref="addPrinterContainer" class="modal-container">
      <a-modal
          title="管理打印机"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          okText="确定"
          @cancel="handleCancel"
          cancelText="取消"
          class="add-printer-class"
          :getContainer="() => $refs.addPrinterContainer"
      >
        <div class="input-box">
          <i class='bx bx-printer'></i>
          <input type="text" placeholder="打印机型号" v-model="new_printer_name" readonly>
        </div>
        <div class="input-box">
          <i class='bx bx-id-card'></i>
          <input type="text" placeholder="打印机唯一识别码" v-model="printer_sn" readonly>
        </div>
        <div class="input-box">
          <i class='bx bx-text'></i>
          <input type="text" placeholder="打印机名称" v-model="new_printer_describe">
        </div>
        <a-table :columns="columns" :data-source="files_data" :scroll="{ y: 320 }">
          <span slot="print" slot-scope="text, record">
            <span v-if="!selectedPrintFile.includes(record.filename)">
              <a-button type="link" icon="check" style="color: #1890FF;font-size: 16px;height: 14px"
                        @click="FileOperation(record.filename,'check')"
              />
            </span>
            <span v-else>
              <a-button type="link" icon="check" style="color: #00FF00;font-size: 16px;height: 14px"
                        @click="FileOperation(record.filename,'check')"
              />
            </span>
          </span>
          <span slot="share" slot-scope="text, record">
            <a-button type="link" icon="share-alt" style="color: #1890FF;font-size: 16px;height: 14px"
                      @click="FileOperation(record.filename,'share')"/>
          </span>
          <span slot="delete" slot-scope="text, record">
            <a-button type="link" icon="delete" style="color: red;font-size: 16px;height: 14px"
                      @click="FileOperation(record.filename,'delete')"/>
          </span>
        </a-table>
        <template #footer>
          <div class="footer-div-class">
            <a-popconfirm placement="topLeft" ok-text="确定" cancel-text="取消" @confirm="deletePrinter">
              <template slot="title">
                <p>确定要删除此打印机吗？</p>
              </template>
              <a-button
                  key="delete"
                  type="danger"
                  icon="delete"
                  style="margin-left: 6px"
              >
                删除打印机
              </a-button>
            </a-popconfirm>

            <div>
              <a-button type="link" @click="readPrinterFiles">
                <a-icon type="cloud-sync" style="font-size: 22px"></a-icon>
                读取打印机中的文件
              </a-button>
              <a-button key="back" @click="handleCancel">取消</a-button>
              <a-button key="submit" type="primary" @click="handleOk">确认</a-button>
            </div>
          </div>
        </template>
      </a-modal>
      <a-modal
          title="选择打印机"
          :visible="selectPrinterVisible"
          :confirm-loading="selectPrinterConfirmLoading"
          @ok="selectPrinterOk"
          okText="确定"
          @cancel="selectPrinterCancel"
          cancelText="取消"
          class="select-printer-class"
          :getContainer="() => $refs.addPrinterContainer"
          :ok-button-props="{ props: { disabled: selectPrinterOkButton } }"
      >
        <a-tree-select
            v-model="checkSharePrinter"
            style="width: 100%"
            :tree-data="printerTreeData"
            tree-checkable
            search-placeholder="Please select"
            :allowClear="true"
        />
      </a-modal>
    </div>
    <!--    <chart-bar :data="barChartData" :height="220"></chart-bar>-->

    <a-carousel arrows style="height: 320px">
      <div
          slot="prevArrow"
          slot-scope="props"
          class="custom-slick-arrow"
          style="left: 10px;zIndex: 1"
      >
        <a-icon type="left-circle"/>
      </div>
      <div
          slot="nextArrow"
          slot-scope="props"
          class="custom-slick-arrow"
          style="right: 10px"
      >
        <a-icon type="right-circle"/>
      </div>
      <printer-video :height="320" :call="videoCheckState" :printer_id="printer_sn"></printer-video>
      <PartlowChart style="height: 320px;width: 100%"/>
      <div style="height: 320px;background-color: #1890FF">
        <h3>打印机状态</h3>
        <div style="display: flex">
          <p style="width: 110px;color: #F5F5F5;">
            打印状态：
          </p>
          <p style="flex-grow: 1;color: #F5F5F5">
            {{ print_status.print_state ? printer_state_obj[print_status.print_state] : "未知" }}
          </p>
        </div>
        <div style="display: flex;color: #F5F5F5;">
          <p style="width: 110px;color: #F5F5F5;">
            当前打印的文件：
          </p>
          <p style="flex-grow: 1;color: #F5F5F5;">
            {{ print_status.print_file ? print_status.print_file : "未知" }}
          </p>
        </div>

        <div style="display: flex">
          <p style="width: 110px;color: #F5F5F5;">
            打印进度：
          </p>
          <p style="flex-grow: 1;color: #F5F5F5;">
            <a-progress
                :stroke-color="{'0%': '#00fff7','100%': '#00c90a',}"
                :percent="print_status.progress ? print_status.progress : 0"
            />
          </p>
        </div>
        <div style="display:flex;color: #F5F5F5;">
          <p style="width: 110px;color: #F5F5F5;">
            打印速率：
          </p>
          <p style="flex-grow: 1;">
            <a-progress
                :stroke-color="{'0%': '#00fff7','100%': '#00c90a',}"
                :percent="print_status.speed_rate ? print_status.speed_rate : 0"
            />
          </p>
        </div>
        <div style="display: flex;color: #F5F5F5;">
          <p style="width: 110px;color: #F5F5F5;">
            挤出流量：
          </p>
          <p style="flex-grow: 1">
            <a-progress
                :stroke-color="{'0%': '#00fff7','100%': '#00c90a',}"
                :percent="print_status.flow_rate ? print_status.flow_rate : 0"
            />
          </p>
        </div>
        <div style="display: flex;color: #F5F5F5;">
          <p style="width: 110px;color: #F5F5F5;">
            1号冷却风扇：
          </p>
          <p style="flex-grow: 1">
            <a-progress
                :stroke-color="{'0%': '#00fff7','100%': '#00c90a',}"
                :percent="print_status.fan ? print_status.fan : 0"
            />
          </p>
        </div>
        <div style="display: flex;color: #F5F5F5;">
          <p style="width: 110px;color: #F5F5F5;">
            2号冷却风扇：
          </p>
          <p style="flex-grow: 1">
            <a-progress
                :stroke-color="{'0%': '#00fff7','100%': '#00c90a',}"
                :percent="print_status.fan1 ? print_status.fan1 : 0"
            />
          </p>
        </div>
      </div>
      <div><h3>4</h3></div>
    </a-carousel>
    <div class="title-div-class">
      <div>
        <div class="card-title">
          <h6>{{ printer_name }}</h6>
          <p>{{ printer_sn }} <span :class="span_class">{{ span_text }}</span></p>
        </div>
        <div class="card-content">
          <p>名称：{{ printer_describe }}</p>
        </div>
      </div>
      <div style="width: 40%">
        <a-row align="top" class="card-footer" justify="center" type="flex" style="margin-bottom: 2px;">
          <a-col :span="8">
            <a-tooltip placement="top"
                       overlayClassName="popover"
                       :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
              <template slot="title">
                <span>视频监控</span>
              </template>
              <a-button
                  type="primary"
                  icon="video-camera"
                  style="font-size: 22px"
                  @click="videoStart"
                  :disabled="enabled_button"
                  class="button-dis"
                  :class="{active:videoCheckState}"
              />
            </a-tooltip>
          </a-col>
          <a-col :span="8">
            <a-tooltip placement="top"
                       overlayClassName="popover"
                       :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
              <template slot="title">
                <span>编辑打印机</span>
              </template>
              <a-button type="primary" icon="edit" style="font-size: 22px" @click="showModal"
                        :disabled="enabled_button"/>
            </a-tooltip>
          </a-col>
          <a-col :span="8">
            <a-tooltip placement="top"
                       overlayClassName="popover"
                       :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
              <template slot="title">
                <span>选中打印机</span>
              </template>
              <a-button icon="check"
                        style="font-size: 22px"
                        @click="checkPrinter"
                        type="primary"
                        :disabled="enabled_check_button"
                        class="button-dis"
                        :class="{active:printerCheckState}"
              />
            </a-tooltip>
          </a-col>
        </a-row>
        <a-row align="top" class="card-footer" justify="center" type="flex" style="margin-top: 2px">
          <a-col :span="8">
            <a-tooltip placement="bottom"
                       overlayClassName="popover"
                       :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
              <template slot="title">
                <span>开始打印</span>
              </template>
              <a-popconfirm
                  placement="top"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="startPrintPopConfirmConfirm"
                  @cancel="startPrintPopConfirmVisible=false"
                  :disabled="true"
                  :visible="startPrintPopConfirmVisible"
              >
                <template slot="title">
                  <p>即将开始打印下列文件！确定要开始吗？</p>
                  <p v-for="(filename,index) in selectedPrintFile" :key="index">-{{ filename }}</p>
                </template>
                <a-button type="primary" icon="fast-forward" style="font-size: 22px"
                          :disabled="enabled_button || selectedPrintFile.length===0 || print_status.is_printing === true"
                          @click="printControl('start')"/>
              </a-popconfirm>
            </a-tooltip>
          </a-col>
          <a-col :span="8">
            <a-tooltip placement="bottom"
                       overlayClassName="popover"
                       :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
              <template slot="title">
                <span>暂停打印</span>
              </template>
              <a-button type="primary" icon="pause" style="font-size: 22px"
                        :disabled="enabled_button || print_status.is_printing !== true"
                        @click="printControl('suspend')"/>
            </a-tooltip>
          </a-col>
          <a-col :span="8">
            <a-tooltip placement="bottom"
                       overlayClassName="popover"
                       :getPopupContainer="triggerNode => {return triggerNode.parentNode}">
              <template slot="title">
                <span>停止打印</span>
              </template>
              <a-button type="danger" icon="stop" style="font-size: 22px"
                        :disabled="enabled_button || print_status.is_printing !== true"
                        @click="printControl('cease')"/>
            </a-tooltip>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-row align="top" class="card-footer" justify="center" type="flex">
      <a-col :span="6" style="cursor: pointer" @click="setPrinterTemp">
        <h4>120℃</h4>
        <span>温度</span>
      </a-col>
      <a-col :span="6">
        <h4>{{ print_status.progress ? print_status.progress + '%' : '未知' }}</h4>
        <span>进度</span>
      </a-col>
      <a-col :span="6">
        <h4>{{ print_status.print_time ? formatTime(print_status.print_time) : '未知' }}</h4>
        <span>消耗时长</span>
      </a-col>
      <a-col :span="6">
        <h4>{{ print_status.left_time ? formatTime(print_status.left_time) : '未知' }}</h4>
        <span>剩余时长</span>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>

// Bar chart for "Active Users" card.
import ChartBar from '../Charts/ChartBar';
import PrinterVideo from "@/components/Cards/PrinterVideo.vue";
import Notification from "@/components/Notification.vue";
import PartlowChart from "@/components/Cards/PartlowChart.vue";
// import {TreeSelect} from 'ant-design-vue';


// const SHOW_PARENT = TreeSelect.SHOW_CHILD;
const findKeyValuePairIndex = (arr, key, value) => {
  return arr.findIndex(item => item[key] === value)
}
const checkDisabled = (node) => {
  return node.every(child => {
    return child.hasOwnProperty('disabled') && child.disabled === true
  })
}
const columns = [
  {
    title: '文件名',
    dataIndex: 'filename',
    key: 'filename',
    width: 220,
  },
  {
    title: '打印',
    key: 'print',
    dataIndex: 'print',
    scopedSlots: {customRender: 'print'},
  },
  {
    title: '共享',
    key: 'share',
    dataIndex: 'share',
    scopedSlots: {customRender: 'share'},
  },
  {
    title: '删除',
    key: 'delete',
    dataIndex: 'delete',
    scopedSlots: {customRender: 'delete'},
  },
]


export default {
  components: {
    PartlowChart,
    Notification,
    ChartBar,
    PrinterVideo,
  },
  props: {
    'printer_name': {
      type: String,
      default: '打印机',
    },
    'printer_status': {
      type: String,
      default: 'offline',
    },
    'printer_sn': {
      type: String,
      default: '',
    },
    'printer_describe': {
      type: String,
      default: '',
    },
    'check': {
      type: Boolean,
      default: false
    },
    'check_button_props_enable': {
      type: Boolean,
      default: false
    },
    'print_status': {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // Data for bar chart.
      videoCheckState: false,
      printerCheckState: false,
      visible: false,
      confirmLoading: false,
      new_printer_name: this.printer_name,
      new_printer_describe: this.printer_describe,
      columns,
      files_data: [],
      selectPrinterVisible: false,
      selectPrinterConfirmLoading: false,
      checkSharePrinter: [],
      selectPrinterOkButton: true,
      checkFilename: '',
      selectedPrintFile: [],
      startPrintPopConfirmVisible: false,
      printer_state_obj: {
        ready: '待机中',
        printing: '打印中',
        suspend: '已暂停',
        complete: '已完成',
        cancle: '已取消'
      },
    }
  },
  created() {
    this.selectedPrintFile = [];
  },
  mounted() {
    this.$socket.on('renamePrinter', (data) => {
      this.visible = false;
      if (data.state === 'success' && data.printer_id === this.printer_sn) {
        // this.printer_name = this.new_printer_name
        this.printer_describe = this.new_printer_describe
        this.$nextTick(() => {
          this.$refs.addPrinterNotification.success({
            title: '成功',
            description: '打印机信息修改成功！'
          })
        })
      }
    })
    this.$socket.on('readPrinterFiles', (data) => {
      console.log('readPrinterFiles', data)
      if (data.id === this.printer_sn) {
        if (data.state === 'success') {
          this.files_data = data['gcodeFileList']
        } else {
          this.$message.error('出错了！读取文件列表失败！')
        }
      }
    })
    this.$socket.on('deleteFile', (data) => {
      if (data.role === 'printer' && data.printer_id === this.printer_sn) {
        if (data.result === true) {
          this.$message.success(`文件 ${data.gcodeFileList[0]} 删除成功！`)
          for (let i = 0; i < this.files_data.length; i++) {
            if (this.files_data[i].filename === data.gcodeFileList[0]) {
              this.files_data.slice(i, 1)
              break
            }
          }
        } else {
          this.$message.success(`文件${data.gcodeFileList[0]}删除失败！`)
        }
      }
    })
  },
  watch: {
    checkSharePrinter(newValue, oldValue) {
      console.log(oldValue, '==>', newValue)
      this.selectPrinterOkButton = newValue.length === 0;
    },
    check(newValue, oldValue) {
      console.log(oldValue, '==>', newValue)
      this.printerCheckState = !!newValue;
    }
  },
  computed: {
    userInfo() {
      let userInfo = this.$store.getters.getUserInfo;
      return {email: userInfo.email, username: userInfo.username};
    },
    span_class() {
      console.log('this.printer_status', this.printer_status)
      return this.printer_status === 'offline' ? 'text-secondary' : 'text-success'
    },
    span_text() {
      return this.printer_status === 'offline' ? '离线' : '在线'
    },
    enabled_button() {
      return this.printer_status === 'offline'
    },
    enabled_check_button() {
      return this.printer_status === 'offline' || this.check_button_props_enable === true
    },
    printerTreeData() {
      // let data = this.$store.getters.getOnlinePrinter.slice();
      let data = JSON.parse(JSON.stringify(this.$store.getters.getOnlinePrinter.slice()));
      let name_index = findKeyValuePairIndex(data, 'title', this.printer_name)
      if (name_index !== -1) {
        let id_index = findKeyValuePairIndex(data[name_index].children, 'value', this.printer_sn)
        if (id_index !== -1) {
          data[name_index].children[id_index]['disabled'] = true
        }
        if (checkDisabled(data[name_index].children) === true) {
          data[name_index]['disabled'] = true
        }
      }
      return data
    }
  },
  methods: {
    setPrinterTemp() {
      console.log('setPrinterTemp')
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
    },
    FileOperation(filename, operation) {
      console.log('====', filename, operation, '====')
      if (operation === 'delete') {
        this.$confirm({
          title: '删除后不可恢复！',
          content: '确定要删除文件' + filename + '吗？',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            this.$socket.emit('deleteFile', {
              'role': 'user',
              'printer_id': this.printer_sn,
              'gcodeFileList': [filename],
            })
          }
        })
      } else if (operation === 'share') {
        console.log(this.printerTreeData)
        this.selectPrinterVisible = true
        this.checkFilename = filename
      } else {
        if (this.selectedPrintFile.includes(filename)) {
          this.selectedPrintFile.splice(this.selectedPrintFile.indexOf(filename), 1)
          console.log(this.selectedPrintFile)
          this.$message.info(`已取消选中文件${filename}!`)
        } else {
          this.selectedPrintFile.push(filename)
          console.log(this.selectedPrintFile)
          this.$message.success(`已选中文件${filename}!`)
        }
        this.$store.dispatch('updateSelectedPrintFiles', {
          filename: filename,
          printer_id: this.printer_sn
        })
      }
    },
    videoStart() {
      this.videoCheckState = !this.videoCheckState
      if (this.videoCheckState === true) {
        this.$socket.emit('callRemote', this.printer_sn)
      } else {
        this.$socket.emit('hangUp', this.printer_sn)
      }
    },
    checkPrinter() {
      // this.printerCheckState = !this.printerCheckState
      if (this.printerCheckState === false) {
        this.$emit('check-printer', [this.printer_sn, true]);
      } else {
        this.$emit('check-printer', [this.printer_sn, false]);
      }
    },
    showModal() {
      if (this.userInfo.username === undefined || this.userInfo.email === undefined || this.userInfo.username === '' || this.userInfo.email === '') {
        this.$router.push({name: 'Sign-In', params: {data: '1'}})
      } else {
        this.visible = true;
      }
    },
    handleOk(e) {
      if (this.userInfo.username === undefined || this.userInfo.email === undefined || this.userInfo.username === '' || this.userInfo.email === '') {
        this.$router.push({name: 'Sign-In', params: {data: '1'}})
      } else {
        this.confirmLoading = true;
        this.$socket.emit('renamePrinter', {
          username: this.userInfo.username,
          email: this.userInfo.email,
          printer_name: this.new_printer_name,
          printer_id: this.printer_sn,
          printer_describe: this.new_printer_describe
        })
      }
    },
    selectPrinterOk(e) {
      this.selectPrinterConfirmLoading = true;
      this.$socket.emit('shareFile', {
        'printer_id': this.printer_sn,
        'filename': this.checkFilename,
        'shara_printer_id': this.checkSharePrinter
      })
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    selectPrinterCancel(e) {
      this.selectPrinterVisible = false
    },
    deletePrinter() {
      this.visible = false;
      if (this.userInfo.username === undefined || this.userInfo.email === undefined || this.userInfo.username === '' || this.userInfo.email === '') {
        this.$router.push({name: 'Sign-In', params: {data: '1'}})
      } else {
        this.$socket.emit('deletePrinter', {
              printer_id: this.printer_sn,
              username: this.userInfo.username,
              email: this.userInfo.email
            }
        )
      }
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
      notificationType[type](info); // 传入type调用
    },
    onClose() { // 点击默认关闭按钮时触发的回调函数
      console.log('关闭notification')
    },
    readPrinterFiles() {
      if (this.userInfo.username === undefined || this.userInfo.email === undefined || this.userInfo.username === '' || this.userInfo.email === '') {
        this.$router.push({name: 'Sign-In', params: {data: '1'}})
      } else {
        this.$socket.emit('readPrinterFiles', {
              printer_id: this.printer_sn,
              username: this.userInfo.username,
              email: this.userInfo.email,
              role: 'user',
            }
        )
      }
    },
    printControl(action) {
      if (action !== 'start') {
        this.$emit('print-control', action, [this.printer_sn])
      } else {
        this.startPrintPopConfirmVisible = true
      }
    },
    startPrintPopConfirmConfirm() {
      this.startPrintPopConfirmVisible = false;
      this.$socket.emit('printControl', {
        role: "user",
        printer_id: [this.printer_sn],
        method: 'print_control',
        action: 'start',
        filename_list: this.selectedPrintFiles
      })
    }
  }
}

</script>

<style scoped>
.title-div-class {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}

/deep/ .ant-tooltip-inner {
  background-color: #1890FF;
  color: #ffffff;
}

/deep/ .ant-tooltip-arrow::before {
  background-color: #1890FF;
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


/deep/ .add-printer-class .ant-modal-wrap .ant-modal .ant-modal-content {
  height: 800px;
}

/deep/ .add-printer-class .ant-modal-wrap .ant-modal .ant-modal-content .ant-modal-body {
  height: 685px;
}

/deep/ .select-printer-class .ant-modal-wrap .ant-modal .ant-modal-content {
  min-height: 200px;
}

/deep/ .select-printer-class .ant-modal-wrap .ant-modal .ant-modal-content .ant-modal-body {
  min-height: 90px;
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

/deep/ .ant-table-tbody tr {
  color: rgba(24, 144, 255, 1)
}

/deep/ .ant-table-tbody tr:nth-child(2n) {
  background-color: rgba(24, 144, 255, 0.2)
}

/deep/ .ant-table-tbody tr:nth-child(2n-1) {
  background-color: rgba(24, 144, 255, 0.1)
}

/deep/ .ant-table-tbody tr:hover {
  background-color: rgba(24, 144, 255, 0.2)
}

/deep/ .ant-table-thead {
  background-color: rgba(24, 144, 255, 0.2);
}

/deep/ .ant-table-thead th {
  color: rgba(24, 144, 255, 1);
}

/deep/ .ant-table-body::-webkit-scrollbar {
  width: 10px;
}

/deep/ .ant-table-body::-webkit-scrollbar-track {
  background-color: rgba(24, 144, 255, 0.1);
}

/deep/ .ant-table-body::-webkit-scrollbar-thumb {
  background-color: rgba(24, 144, 255, 0.2);
  border-radius: 10px;
}

/deep/ .ant-table-body::-webkit-scrollbar-thumb:hover {
  background-color: rgba(24, 144, 255, 0.4);
}

/deep/ .ant-pagination li {
  color: rgba(24, 144, 255, 1);
}

.footer-div-class {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

.ant-carousel >>> .slick-slide {
  text-align: center;
  //height: 160px;
  //line-height: 160px;
  background: #364d79;
  overflow: hidden;
  border-radius: 16px;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}

.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}

.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

.button-dis {
  background-color: #1890FF;
  border-radius: 6px;
}

.button-dis.active {
  background-color: #00FF00;
}


/deep/ .button-dis:disabled {
  background-color: #F5F5F5;
  color: #F5F5F5;
}

/deep/ .slick-slide {
  height: 320px;
}
</style>