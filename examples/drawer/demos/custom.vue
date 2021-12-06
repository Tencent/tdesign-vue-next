<template>
  <div>
    <!-- 使用插槽自定义 -->
    <t-drawer v-model:visible="visible" close-btn>
      <p>This is the body of drawer</p>
      <template #header>
        <div>自定义头部</div>
      </template>
      <template #footer>
        <t-button>确定</t-button>
        <t-button variant="outline" @click="visible = false"> 取消 </t-button>
      </template>
    </t-drawer>

    <!-- 使用 props 自定义 -->
    <t-drawer v-model:visible="visible2" :header="() => '抽屉标题'" :footer="renderFooter" close-btn>
      <p>This is the body of drawer</p>
    </t-drawer>

    <!-- 单独定义确认/取消按钮 -->
    <t-drawer
      v-model:visible="visible3"
      header="I am the title"
      cancel-btn="cancel"
      :confirm-btn="{
        content: 'OK',
        disabled: true,
      }"
      close-btn
    >
      <p>This is the body of drawer</p>
    </t-drawer>

    <t-button variant="outline" @click="visible = true"> Open(插槽定义) </t-button>
    &nbsp;&nbsp;
    <t-button variant="outline" @click="visible2 = true"> Open(属性定义) </t-button>
    &nbsp;&nbsp;
    <t-button variant="outline" @click="visible3 = true"> Open(单独设置确认/取消按钮) </t-button>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);
    return {
      visible,
      visible2,
      visible3,
      renderFooter() {
        return (
          <div>
            <t-button>confrim</t-button>
            <t-button variant="outline" onClick={() => (visible2.value = false)}>
              cancel
            </t-button>
          </div>
        );
      },
    };
  },
});
</script>
