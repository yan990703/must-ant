<template>
  <transition>
    <div class="m-modal-mask" v-show="visible" @click.self="onBlur">
      <div :class="['m-modal', center ? 'relative-hv-center' : 'top-center']" :style="`width: ${width}px; top: ${!center ? top + 'px':'50%'};`">
        <div :class="['m-modal-body', {'loading':loading}]">
          <div class="m-spin-dot" v-show="loading">
            <span class="u-dot-item"></span>
            <span class="u-dot-item"></span>
            <span class="u-dot-item"></span>
            <span class="u-dot-item"></span>
          </div>
          <div class="m-body">
            <div class="m-title">
              <template v-if="mode==='confirm'">
                <svg focusable="false" class="u-icon confirm" data-icon="exclamation-circle" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path></svg>
              </template>
              <template v-if="mode==='info'">
                <svg focusable="false" class="u-icon info" v-if="type==='info'" data-icon="info-circle" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>
                <svg focusable="false" class="u-icon success" v-if="type==='success'" data-icon="check-circle" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>
                <svg focusable="false" class="u-icon error" v-if="type==='error'" data-icon="close-circle" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                <svg focusable="false" class="u-icon warn" v-if="type==='warn'" data-icon="exclamation-circle" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>
              </template>
              <div class="u-title">{{ title }}</div>
            </div>
            <div class="u-content">{{ content }}</div>
          </div>
          <div class="m-btns">
            <template v-if="mode==='confirm'">
              <button class="u-cancel" @click="onCancel">{{ cancelText }}</button>
              <button class="u-confirm primary" @click="onConfirm" v-if="type==='confirm'">{{ okText }}</button>
              <button class="u-confirm delete" @click="onConfirm" v-if="type==='delete'">{{ okText }}</button>
            </template>
            <template v-if="mode==='info'">
              <button class="u-confirm primary" @click="onConfirm">{{ noticeText }}</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default { // 运行时声明
  name: 'Modal',
  props: {
    title: { // 标题描述
      type: String,
      default: 'Title'
    },
    content: { // 内容描述
      type: String,
      default: 'Content'
    },
    width: { // 提示框宽度
      type: Number,
      default: 420
    },
    cancelText: { // 取消按钮文字
      type: String,
      default: '取消'
    },
    okText: { // 确认按钮文字
      type: String,
      default: '确定'
    },
    noticeText: { // 通知按钮文字
      type: String,
      default: '知道了'
    },
    mode: { // 确认提示框：confirm  信息提示框：info
      type: String,
      default: 'confirm'
    },
    type: { // confirm mode: 'confirm', 'delete'   info mode: 'info', 'success', 'error', 'warn'
      type: String,
      default: 'confirm'
    },
    center: { // 水平垂直居中：true  固定高度水平居中：false
      type: Boolean,
      default: true
    },
    top: { // 固定高度水平居中时，距顶部高度
      type: Number,
      default: 100
    },
    loading: { // 加载中...
      type: Boolean,
      default: false
    },
    visible: { // 提示框是否可见
      type: Boolean,
      default: false
    }
  },
  methods: {
    onBlur () {
      this.$emit('cancel')
    },
    onCancel () {
      this.$emit('cancel')
    },
    onConfirm () {
      this.$emit('ok')
    }
  }
}
</script>
<style lang="less" scoped>
.v-enter-active, .v-leave-active {
  transition: opacity 0.3s ease;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
.flex-hv-center { // 水平垂直居中方法①：弹性布局，随内容增大高度，并自适应水平垂直居中
  display: flex;
  justify-content: center;
  align-items: center;
}
.relative-hv-center { // 水平垂直居中方法②：相对定位，随内容增大高度，并自适应水平垂直居中
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.top-center { // 相对定位，固定高度，始终距离视图顶端100px
  position: relative;
  // top: 100px;
}
.m-modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0,0,0,0.45);
  .m-modal {
    width: 420px;
    margin: 0 auto;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5;
    .m-modal-body {
      position: relative;
      word-wrap: break-word;
      padding: 20px 24px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
      .m-spin-dot { // 绝对定位，并设置水平垂直居中
        position: absolute;
        display: inline-block;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 20px;
        height: 20px;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg); /* Internet Explorer */
        -moz-transform: rotate(45deg); /* Firefox */
        -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
        -o-transform: rotate(45deg); /* Opera */
        animation: rotate 1.2s linear infinite;
        -webkit-animation: rotate 1.2s linear infinite;
        @keyframes rotate {
          100% {transform: rotate(405deg);}
        }
        .u-dot-item { // 单个圆点样式
          position: absolute;
          width: 8px;
          height: 8px;
          background: @themeColor;
          border-radius: 50%;
          opacity: .3;
          animation: spinMove 1s linear infinite alternate;
          -webkit-animation: spinMove 1s linear infinite alternate;
          @keyframes spinMove {
            100% {opacity: 1;}
          }
        }
        .u-dot-item:first-child {
          top: 0;
          left: 0;
        }
        .u-dot-item:nth-child(2) {
          top: 0;
          right: 0;
          animation-delay: .4s;
          -webkit-animation-delay: .4s;
        }
        .u-dot-item:nth-child(3) {
          bottom: 0;
          right: 0;
          animation-delay: .8s;
          -webkit-animation-delay: .8s;
        }
        .u-dot-item:last-child {
          bottom: 0;
          left: 0;
          animation-delay: 1.2s;
          -webkit-animation-delay: 1.2s;
        }
      }
      .m-body {
        .m-title {
          width: 100%;
          .u-icon {
            display: inline-block;
            margin-right: 12px;
            margin-top: 1px;
            width: 22px;
            height: 22px;
            font-size: 16px;
            font-weight: bold;
            vertical-align: top;
          }
          .confirm {
            fill: #faad14;
          }
          .info {
            fill: @themeColor;
          }
          .success {
            fill: #52c41a;
          }
          .error {
            fill: #ff4d4f;
          }
          .warn {
            fill: #faad14;
          }
          .u-title {
            display: inline-block;
            vertical-align: top;
            font-size: 16px;
            font-weight: 600;
            max-width: calc(100% - 34px);
          }
        }
        .u-content {
          margin-left: 34px;
          margin-top: 8px;
          font-size: 14px;
          max-width: calc(100% - 34px);
        }
      }
      .m-btns {
        margin-top: 24px;
        text-align: right;
        .u-cancel {
          height: 32px;
          line-height: 32px;
          padding: 0 15px;
          font-size: 14px;
          border-radius: 4px;
          color: rgba(0,0,0,.65);
          background: #fff;
          border: 1px solid #d9d9d9;
          cursor: pointer;
          transition: all .3s cubic-bezier(.645,.045,.355,1);
          &:hover {
            color: fade(@themeColor, 80%);
            border-color: fade(@themeColor, 80%);
          }
          &:focus {
            color: shade(@themeColor, 12%);
            border-color: shade(@themeColor, 12%);
          }
        }
        .u-confirm {
          margin-left: 8px;
          height: 32px;
          line-height: 32px;
          padding: 0 15px;
          font-size: 14px;
          border-radius: 4px;
          color: #fff;
          transition: all .3s cubic-bezier(.645,.045,.355,1);
          cursor: pointer;
        }
        .primary {
          background: @themeColor;
          border: 1px solid @themeColor;
          &:hover {
            background: fade(@themeColor, 80%);
            border-color: fade(@themeColor, 80%);
          }
          &:focus {
            background: shade(@themeColor, 12%);
            border-color: shade(@themeColor, 12%);
          }
        }
        .delete {
          background: #ff4d4f;
          border: 1px solid #ff4d4f;
          &:hover {
            background-color: #ff7875;
            border-color: #ff7875;
          }
          &:focus {
            background-color: #d9363e;
            border-color: #d9363e;
          }
        }
      }
    }
    .loading { // 加载过程背景虚化
      background: rgb(248, 248, 248);
      pointer-events: none; // 屏蔽鼠标事件
    }
  }
}
</style>
