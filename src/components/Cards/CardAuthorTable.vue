<template>

  <!-- Authors Table Card -->
  <a-card :bodyStyle="{padding: 0,}" :bordered="false" class="header-solid h-full">
    <template #title>
      <a-row align="middle" type="flex">
        <a-col :md="12" :span="24">
          <h5 class="font-semibold m-0">Authors Table</h5>
        </a-col>
        <a-col :md="12" :span="24" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-radio-button value="all">ALL</a-radio-button>
            <a-radio-button value="online">ONLINE</a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
    </template>
    <a-table :columns="columns" :data-source="data" :pagination="false">

      <template slot="author" slot-scope="author">
        <div class="table-avatar-info">
          <a-avatar :src="author.avatar" shape="square"/>
          <div class="avatar-info">
            <h6>{{ author.name }}</h6>
            <p>{{ author.email }}</p>
          </div>
        </div>
      </template>

      <template slot="func" slot-scope="func">
        <div class="author-info">
          <h6 class="m-0">{{ func.job }}</h6>
          <p class="m-0 font-regular text-muted">{{ func.department }}</p>
        </div>
      </template>

      <template slot="status" slot-scope="status">
        <a-tag :class="status ? 'ant-tag-primary' : 'ant-tag-muted'" class="tag-status">
          {{ status ? "ONLINE" : "OFFLINE" }}
        </a-tag>
      </template>

      <template slot="editBtn" slot-scope="row">
        <a-button :data-id="row.key" class="btn-edit" type="link">
          Edit
        </a-button>
      </template>

    </a-table>
  </a-card>
  <!-- / Authors Table Card -->

</template>

<script>

export default ({
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // Active button for the "Authors" table's card header radio button group.
      authorsHeaderBtns: 'all',
    }
  },
})

</script>