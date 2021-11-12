<template>
  <div class="t-demo-tabs">
    <t-tabs v-model="value">
      <t-tab-panel value="first" label="选项卡1">
        <p style="padding: 25px;">选项卡1的内容，使用 t-tab-pannel 渲染</p>
      </t-tab-panel>
      <t-tab-panel value="second" label="选项卡2">
        <template #panel>
          <p style="padding: 25px;">选项卡2的内容，使用 t-tab-pannel 渲染</p>
        </template>
      </t-tab-panel>
      <t-tab-panel value="third" label="选项卡3" :panel="panelRender" />
    </t-tabs>

    <!-- 方式二：使用 list 定义 Tab -->
    <t-tabs v-model="tab" :list="tabList" />
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue'
const tabList = [
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { label: '选项卡一', value: 1, panel: (h) => <p style="padding: 25px">这是选项卡一的内容，使用 t-tabs 渲染</p> },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { label: '选项卡二', value: 2, panel: (h) => <p style="padding: 25px">这是选项卡二的内容，使用 t-tabs 渲染</p> },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { label: '选项卡三', value: 3, panel: (h) => <p style="padding: 25px">这是选项卡三的内容，使用 t-tabs 渲染</p> },
]
export default defineComponent({
  setup() {
    const value = ref('first');
    const tab = ref(1);
    return {
      tab,
      value,
      tabList,
      panelRender() {
        return <p style="padding: 25px;">选项卡3的内容，使用 t-tab-pannel 渲染</p>;
      },
    };
  }
});
</script>

<style lang="less">
  .t-demo-tabs {

    &__desc {
      margin-bottom: 20px;
      color: #333;
      font-size: 14px;

      &:not(:first-of-type) {
        margin-top: 20px;
      }
    }
  }
</style>
