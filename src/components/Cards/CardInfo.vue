<template>

  <a-card :bordered="false" class="card-info">
    <a-row type="flex">
      <a-col :span="24" :xl="12" class="col-content">
        <div class="card-content">
          <h6>Built by developers</h6>
          <h5>Muse Dashboard for Ant Design</h5>
          <p>From colors, cards, typography to complex elements, you will find the full documentation.</p>
        </div>
        <div class="card-footer">
          <a href="#" size="small">
            <span>Read More</span>
            <svg fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z"
                    fill="#111827"
                    fill-rule="evenodd"/>
            </svg>
          </a>
        </div>
      </a-col>
      <a-col :span="24" :xl="12" class="col-img">
        <div class="card-img-bg">
          <img alt="" src="images/info-card-1.jpg">
        </div>
      </a-col>
    </a-row>
  </a-card>

</template>

<script>

export default ({
  data() {
    return {}
  },
})

</script>