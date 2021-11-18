<template>
  <div>
    <t-dropdown
      :min-column-width="88"
      trigger="click"
      @click="handleClick"
    >
      <t-button variant="text">
        下拉菜单
      </t-button>
      <template #dropdown>
        <t-dropdown-menu>
          <t-dropdown-item :value="1">
            操作一
          </t-dropdown-item>
          <t-dropdown-item :value="2">
            操作二
          </t-dropdown-item>
        </t-dropdown-menu>
      </template>
    </t-dropdown>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      handleClick(data, { e }) {
        console.log(data);
        e.preventDefault();
      },
    };
  },
});
</script>
