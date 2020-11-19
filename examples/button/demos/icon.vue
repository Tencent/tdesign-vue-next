<template>
  <div class="demo-button-icon">
    <div class="demo-button-row">
      <div class="demo-button-col">
        <t-button
          theme="primary"
          icon="add"
        >
          新建
        </t-button>
        <t-button
          icon="upload"
        >
          上传文件
        </t-button>
      </div>
      <div class="demo-button-col">
        <t-button
          theme="primary"
          icon="search"
          shape="circle"
        >
        </t-button>
        <t-button
          theme="primary"
          icon="search"
          shape="circle"
        >
        </t-button>
      </div>
      <!-- 使用 function 或 slot 的形式定义 icon -->
      <div class="demo-button-col">
        <t-button
          :icon="renderIcon"
        >
          Function Icon
        </t-button>
        <t-button>
          <template v-slot:icon>
            <t-icon name="search"></t-icon>
          </template>
          Slot Icon
        </t-button>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  methods: {
    renderIcon(h) {
      return h('t-icon', {
        props: {
          name: 'search',
        },
      });
    },
  },
};
</script>

<style scoped>
.demo-button-row {
  display: flex;
}
.demo-button-col {
  margin-right: 80px;
}
</style>
