<template>

  <!-- Your Transactions Card -->
  <a-card :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :bordered="false" class="header-solid h-full">
    <template #title>
      <h6 class="font-semibold m-0">Your Transactions</h6>
    </template>
    <p slot="extra" class="card-header-date">
      <svg fill="none" height="18" viewBox="0 0 20 20" width="18" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-muted" clip-rule="evenodd" d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
              fill="#111827"
              fill-rule="evenodd"/>
      </svg>
      <span>23 - 30 March 2021</span>
    </p>
    <a-list
        :data-source="data"
        :split="false"
        class="transactions-list"
        item-layout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="item.period">
          <h6>{{ item.period }}</h6>
        </template>
        <template v-else>
          <a-list-item-meta
              :description="item.datetime"
              :title="item.title"
          >
            <a-avatar v-if="item.type == 1" slot="avatar" size="small" style="background-color: #EDF9E7">
              <svg fill="none" height="10" viewBox="0 0 20 20" width="10" xmlns="http://www.w3.org/2000/svg">
                <path class="fill-success" clip-rule="evenodd" d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z"
                      fill-rule="evenodd"/>
              </svg>
            </a-avatar>
            <a-avatar v-if="item.type == 0" slot="avatar" size="small" style="background-color: #FFFCE7">
              <strong class="text-warning">
                !
              </strong>
            </a-avatar>
            <a-avatar v-if="item.type == -1" slot="avatar" size="small" style="background-color: #FEE9EA">
              <svg fill="none" height="10" viewBox="0 0 20 20" width="10" xmlns="http://www.w3.org/2000/svg">
                <path class="fill-danger" clip-rule="evenodd" d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
                      fill-rule="evenodd"/>
              </svg>
            </a-avatar>
          </a-list-item-meta>
          <div class="amount">
						<span v-if="item.type == 1" class="text-success">
							+ ${{ item.amount }}
						</span>
            <span v-if="item.type == 0" class="text-warning">
							Pending
						</span>
            <span v-if="item.type == -1" class="text-danger">
							- ${{ item.amount }}
						</span>
          </div>
        </template>
      </a-list-item>
    </a-list>
  </a-card>
  <!-- / Your Transactions Card -->

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