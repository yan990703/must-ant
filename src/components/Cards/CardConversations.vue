<template>

  <!-- Conversations Card -->
  <a-card :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :bordered="false" class="header-solid h-full">
    <template #title>
      <h6 class="font-semibold m-0">Conversations</h6>
    </template>
    <a-list
        :data-source="data"
        :split="false"
        class="conversations-list"
        item-layout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-button slot="actions" type="link">
          REPLY
        </a-button>
        <a-list-item-meta
            :description="item.code"
            :title="item.title"
        >
          <a-avatar
              slot="avatar"
              :size="48"
              :src="item.avatar"
              shape="square"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-card>
  <!-- / Conversations Card -->

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