<template>
  <div class="tdesign-demo-block-column-large" style="width: 100%">
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

<script setup>
import { ref } from 'vue';

let id = 0;
const value = ref('first');
const panelData = ref([
  {
    value: 'first',
    label: '原有选项卡1',
    removable: true,
    content: '原有选项卡1内容',
  },
  {
    value: 'second',
    label: '原有选项卡2',
    removable: true,
    content: '原有选项卡2内容',
  },
]);

const addTab = () => {
  panelData.value.push({
    value: `${id}`,
    label: `新选项卡${id}`,
    removable: true,
    content: '新选项卡内容',
  });
  value.value = `${id}`;
  id += 1;
};

const removeTab = ({ value: val }) => {
  const index = panelData.value.findIndex((data) => data.value === val);
  if (index < 0) return false;
  panelData.value.splice(index, 1);
  if (panelData.value.length === 0) return;
  if (value.value === val) {
    value.value = panelData.value[index - 1].value;
  }
};
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
