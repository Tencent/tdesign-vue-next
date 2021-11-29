<template>
  <div class="playground">
    <t-tabs v-model="value">
      <!-- 默认插槽 和 具名插槽（panel）都是用来渲染面板内容 -->
      <t-tab-panel value="1" label="基础">
        <base-components />
      </t-tab-panel>
      <t-tab-panel value="2" label="导航">
        <navigation />
      </t-tab-panel>
      <t-tab-panel value="3" label="消息提醒">
        <message />
      </t-tab-panel>
    </t-tabs>
  </div>
</template>
<script lang="tsx">
import { defineComponent, ref } from 'vue';
import BaseComponents from './components/BaseComponents.vue';
import Navigation from './components/Navigation.vue';
import Message from './components/Message.vue';

export default defineComponent({
  components: {
    BaseComponents,
    Navigation,
    Message,
  },
  setup() {
    const value = ref('3');
    return {
      value,
    };
  },
});
</script>

<style lang="less">
.playground {
  h1 {
    margin-top: 20px;
    margin-left: 10px;
  }
  .title {
    font-size: 24px;
    display: block;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .playground-demo-container {
    padding: 10px;
    border: 1px solid gray;
    margin: 10px;
    min-height: 100px;
  }

  .todo {
    color: #e34d59;
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
