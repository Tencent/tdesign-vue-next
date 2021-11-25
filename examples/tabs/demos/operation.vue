<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <p>可以动态增加选项卡，仅支持卡片型</p>
    </div>

    <t-tabs v-model="value" theme="card" :addable="true" @add="addTab" @remove="removeTab">
      <t-tab-panel
        v-for="data in panelData"
        :key="data.value"
        :value="data.value"
        :label="data.label"
        :removable="data.removable"
      >
        <p style="padding: 25px">
          {{ data.content }}
        </p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

let id = 0;
export default defineComponent({
  setup() {
    const value = ref('first');
    const panelData = ref([
      {
        value: 'first',
        label: '原有选项卡',
        removable: false,
        content: '原有选项卡内容',
      },
      {
        value: 'second',
        label: '原有选项卡',
        removable: true,
        content: '原有选项卡内容',
      },
    ]);

    const addTab = () => {
      panelData.value = [
        ...panelData.value,
        {
          value: `${id}`,
          label: '新选项卡',
          removable: true,
          content: '新选项卡内容',
        },
      ];
      value.value = `${id}`;
      id += 1;
    };

    const removeTab = ({ value: val }) => {
      const index = panelData.value.findIndex((data) => data.value === val);
      if (index < 0) return false;
      panelData.value.splice(index, 1);
      if (value.value === val) {
        value.value = panelData.value[index - 1].value;
      }
    };
    return {
      value,
      panelData,
      addTab,
      removeTab,
    };
  },
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

    p {
      margin-bottom: 20px;
    }
  }
}
</style>
