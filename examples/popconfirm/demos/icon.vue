<template>
  <div class="popconfirm-demo">
    <div class="tdesign-demo-block">
      <div class="demo-item">
        <t-popconfirm v-model="visible1" content="普通事件通知类型偏向于确认">
          <t-button>默认</t-button>
        </t-popconfirm>
      </div>

      <div class="demo-item">
        <t-popconfirm v-model="visible2" theme="warning" content="事件通知类型偏向于提示">
          <t-button theme="warning"> 警告 </t-button>
        </t-popconfirm>
      </div>

      <div class="demo-item">
        <t-popconfirm v-model="visible3" theme="danger" content="事件通知类型偏向于高危提醒">
          <t-button theme="danger"> 危险 </t-button>
        </t-popconfirm>
      </div>
    </div>

    <br /><br />
    <div class="tdesign-demo-block">
      <div class="demo-item">
        <t-popconfirm content="基础气泡确认框文案示意文字按钮" :popup-props="{ placement: 'bottom' }">
          <template #icon>
            <t-icon name="browse" style="color: #0052d9" />
          </template>
          <t-button variant="outline"> 自定义图标（插槽） </t-button>
        </t-popconfirm>
      </div>

      <div class="demo-item">
        <t-popconfirm
          content="基础气泡确认框文案示意文字按钮"
          :icon="customIcon"
          :popup-props="{ placement: 'bottom' }"
        >
          <t-button variant="outline"> 自定义图标（属性） </t-button>
        </t-popconfirm>
      </div>
    </div>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);

    return {
      visible1,
      visible2,
      visible3,
      customIcon() {
        return <t-icon name="browse" style="margin-right: 8px" />;
      },
    };
  },
});
</script>
