<template>

  <!-- Master Card -->
  <a-card class="card-credit header-solid h-full" style="background-image: url('images/info-card-3.jpg')">
    <template #title>
      <svg height="25" viewBox="0 0 22.5 20.625" width="25" xmlns="http://www.w3.org/2000/svg">
        <g id="wifi" transform="translate(0.75 0.75)">
          <circle id="Oval" cx="1.5" cy="1.5" fill="#fff" r="1.5" transform="translate(9 16.875)"/>
          <path id="Path" d="M0,1.36a6.377,6.377,0,0,1,7.5,0" fill="none" stroke="#fff"
                stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" transform="translate(6.75 11.86)"/>
          <path id="Path-2" d="M14.138,2.216A12.381,12.381,0,0,0,0,2.216" data-name="Path"
                fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                stroke-width="1.5" transform="translate(3.431 6)"/>
          <path id="Path-3" d="M0,3.294a18.384,18.384,0,0,1,21,0" data-name="Path" fill="none" stroke="#fff"
                stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
        </g>
      </svg>
    </template>
    <h5 class="card-number">4562 1122 4594 7852</h5>

    <div class="card-footer">
      <div class="mr-30">
        <p>Card Holder</p>
        <h6>Jack Peterson</h6>
      </div>
      <div class="mr-30">
        <p>Expires</p>
        <h6>11/22</h6>
      </div>
      <div class="card-footer-col col-logo ml-auto">
        <img src="images/logos/mastercard-logo.png">
      </div>
    </div>
  </a-card>
  <!-- / Master Card -->

</template>

<script>

export default ({
  data() {
    return {}
  }
})

</script>