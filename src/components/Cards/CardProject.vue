<template>

  <!-- Project Card -->
  <a-card class="card-project">
    <img
        slot="cover"
        :src="cover"
        alt="example"
    />
    <div class="card-tag">Project #{{ id }}</div>
    <h5>{{ title }}</h5>
    <p>
      {{ content }}
    </p>
    <a-row :gutter="6" align="middle" class="card-footer" type="flex">
      <a-col :span="12">
        <a-button size="small">VIEW PROJECT</a-button>
      </a-col>
      <a-col :span="12" class="text-right">
        <a-space :size="-12" class="avatar-chips">
          <a-avatar v-for="(img, index) in team" :key="index" :src="img" size="small"/>
        </a-space>
      </a-col>
    </a-row>
  </a-card>
  <!-- / Project Card -->

</template>

<script>

export default ({
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      default: "",
    },
    team: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
})

</script>