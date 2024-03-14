<script>
export default {

  data() {
    return {
      checkPrinters: [],
    }
  },
}
</script>

<template>

</template>

<style scoped lang="scss">
.widget-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon {
  width: 48px;
  height: 48px;
  top: 0;
  bottom: 0;
  right: 16px;
  margin: auto;
  background-color: transparent;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.12);
}

.select-title {
  font-family: "open sans", Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: #8C8C8C;
  font-size: 14px;
}

.item1 {
  flex: 1;
  margin-right: 5px;
}
</style>