<template>
  <t-space>
    <!-- 自定义面板顶部内容：如自定义搜索框。同时支持插槽和 Props(this,panelTopContent) -->
    <t-select v-model="value1" :options="options1" clearable placeholder="请选择云解决方案">
      <div slot="panelTopContent" style="padding: 6px 6px 0 6px">
        <t-input v-model="search" placeholder="请输入关键词搜索" @change="onSearch" />
      </div>
    </t-select>

    <!-- 自定义面板底部内容；如新增项 。同时支持插槽和 Props（this,panelBottomContent）-->
    <t-select v-model="value2" placeholder="请选择云产品" clearable :options="options2">
      <!-- 自定义底部内容 -->
      <div slot="panelBottomContent" class="select-panel-footer">
        <t-button v-if="editOrCreate === 'create'" theme="primary" variant="text" block @click="onAdd"
        >新增选项</t-button
        >
        <div v-else>
          <t-input v-model="newOption" autofocus></t-input>
          <t-button @click="onAddConfirm" size="small" style="margin-top: 8px"> 确认 </t-button>
          <t-button @click="onAddCancel" theme="default" size="small" style="margin-top: 8px; margin-left: 8px">
            取消
          </t-button>
        </div>
      </div>
    </t-select>
  </t-space>
</template>

<script setup lang="jsx">
import { ref } from 'vue';

const OPTIONS = [
  {
    label: '架构云',
    value: '1',
  },
  {
    label: '大数据',
    value: '2',
  },
  {
    label: '区块链',
    value: '3',
  },
  {
    label: '物联网',
    value: '4',
    disabled: true,
  },
  {
    label: '人工智能',
    value: '5',
  },
];
const search = ref('');
const value1 = ref('');
const value2 = ref('');
const editOrCreate = ref('create');
const newOption = ref('');
// 如果此处数据字段不是 label 和 value，而是 name 和 id，则可以传入参数 `keys` 定义别名
// 示例： <t-select :options="options1" :keys="{ label: 'name', value: 'id' }" />
const options1 = ref(OPTIONS);
const options2 = ref([
  {
    label: '云服务器',
    value: '1',
  },
  {
    label: '云数据库',
    value: '2',
  },
  {
    label: '域名注册',
    value: '3',
  },
]);
const onSearch = () => {
  options1.value = OPTIONS.filter((item) => item.label.indexOf(search.value) !== -1);
};
const onAdd = () => {
  editOrCreate.value = 'edit';
};
const onAddConfirm = () => {
  const id = Math.round(Math.random() * 100);
  options2.value.push({
    label: newOption.value,
    value: id,
  });
  newOption.value = '';
  editOrCreate.value = 'create';
};
const onAddCancel = () => {
  editOrCreate.value = 'create';
};
</script>

<style scoped>
.select-panel-footer {
  border-top: 1px solid var(--td-component-stroke);
  padding: 6px;
}
</style>
