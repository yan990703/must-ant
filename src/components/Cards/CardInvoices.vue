<template>

  <!-- Invoices Card -->
  <a-card :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :bordered="false" class="header-solid h-full">
    <template #title>
      <h6 class="font-semibold m-0">Invoices</h6>
    </template>
    <template slot="extra" class="mb-0">
      <a-button type="primary">
        VIEW ALL
      </a-button>
    </template>
    <a-list
        :data-source="data"
        :split="false"
        class="invoice-list"
        item-layout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-button slot="actions" type="link">
          <svg fill="none" height="15" viewBox="0 0 20 20" width="15" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 9.29289C6.68342 8.90237 7.31658 8.90237 7.70711 9.29289L9 10.5858L9 3C9 2.44772 9.44771 2 10 2C10.5523 2 11 2.44771 11 3L11 10.5858L12.2929 9.29289C12.6834 8.90237 13.3166 8.90237 13.7071 9.29289C14.0976 9.68342 14.0976 10.3166 13.7071 10.7071L10.7071 13.7071C10.5196 13.8946 10.2652 14 10 14C9.73478 14 9.48043 13.8946 9.29289 13.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289Z"
                  fill="#111827"
                  fill-rule="evenodd"/>
          </svg>
          PDF
        </a-button>
        <a-list-item-meta
            :description="item.code"
            :title="item.title"
        ></a-list-item-meta>
        <div class="amount">${{ item.amount }}</div>
      </a-list-item>
    </a-list>
  </a-card>
  <!-- / Invoices Card -->

</template>

<script>

export default ({
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
})

</script>