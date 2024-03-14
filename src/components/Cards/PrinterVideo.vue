<template>
  <div>
    <!--    <canvas ref="chart" :style="{'height': height + 'px'}"></canvas>-->
    <div :style="{'height': + height + 'px'}" class="content-div">
      <img class="video-img" alt="" src="images/Video.png" v-show="!call">
      <video
          ref="remoteVideo" v-show="call" width="100%" height="320px"
          class="video-container"
      ></video>
    </div>
  </div>
</template>

<script>
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

export default {
  props: {
    'height': {
      type: Number,
      default: 320,
    },
    'call': {
      type: Boolean,
      default: false
    },
    'printer_id': {
      type: String,
      default: undefined,
    }
  },
  data() {
    return {
      chart: null,
      peer: new RTCPeerConnection(),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 发送方收到同意视频事件
      this.$socket.on('AcceptCall-' + this.printer_id, async () => {
        // 添加本地音视频流
        console.log('this.peer', this.peer)
        // 获取candidate信息
        this.peer.onicecandidate = (event) => {
          if (event.candidate) {
            // 向服务器发送candidate信息
            this.$socket.emit('sendCandidate', {
              printer_id: this.printer_id,
              candidate: event.candidate,
              role: 'user'
            })
            console.log('发送方发送candidate信息', event.candidate);
          }
        }

        this.peer.onaddstream = (event) => {
          // 拿到对方的视频流
          this.$refs.remoteVideo.srcObject = event.stream;
          this.$refs.remoteVideo.play()
        };

        // 生成offer
        const offer = await this.peer.createOffer({
          offerToReceiveAudio: false,
          offerToReceiveVideo: true
        })
        // 设置本地描述的offer
        await this.peer.setLocalDescription(offer);
        // 发送offer
        this.$socket.emit('sendOffer', {
          printer_id: this.printer_id,
          offer: offer
        });
        console.log('发送方发送offer');
      });
    })
    this.$nextTick(() => {
      // 发送方收到接收方的answer
      this.$socket.on('receiveAnswer-' + this.printer_id, async (answer) => {
        // 设置远端描述信息
        await this.peer.setRemoteDescription(answer.answer);
        console.log("发送方收到answer", answer)
      });
    })
    this.$nextTick(() => {
      // 接收candidate信息
      this.$socket.on('receiveCandidate-' + this.printer_id, async (candidate) => {
        console.log("发送方收到Candidate")
        // 添加candidate
        console.log('candidate', candidate)
        await this.peer.addIceCandidate(candidate.candidate);
        // await peer.addIceCandidate(candidate.candidate)
      })
    })
  },
}
</script>

<style lang="scss" scoped>
canvas {
  background-image: linear-gradient(to right, #00369E, #005CFD, #A18DFF);
}

.content-div {
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #1890FF;
  border-radius: 16px;
}

.video-img {
  margin-top: auto;
  margin-bottom: auto;
  height: 60%;
}

.video-container {
  width: 100%;
  height: 320px;
  border-radius: 16px;
}
</style>