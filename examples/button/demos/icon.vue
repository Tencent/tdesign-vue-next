<template>
  <div class="demo-button-icon">
    <div class="demo-button-row">
      <t-button
        theme="primary"
        icon="search"
      >
        搜索
      </t-button>
      <t-button icon="search">
        搜索
      </t-button>
      <t-button
        theme="link"
        icon="search"
      >
        搜索
      </t-button>
      <t-button
        theme="primary"
        icon="search"
      >
      </t-button>
      <t-button
        icon="search"
      >
      </t-button>

      <!-- 使用 function 或 slot 的形式定义 icon -->
      <t-button
        :icon="renderIcon"
      >
        Function Icon
      </t-button>
      <t-button>
        <template slot="icon">
          <t-icon name="search"></t-icon>
        </template>
        Slot Icon
      </t-button>

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
