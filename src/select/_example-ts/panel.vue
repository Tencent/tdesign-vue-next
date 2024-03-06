<template>
  <t-space direction="vertical">
    <!-- 自定义面板顶部内容：如自定义搜索框。同时支持插槽和 Props(this,panelTopContent) -->
    <t-select v-model="value1" :options="options1" clearable placeholder="请选择云解决方案">
      <template #panelTopContent>
        <div style="padding: 6px 6px 0 6px">
          <t-textarea v-model="search" placeholder="请输入关键词搜索" @change="onSearch" />
        </div>
      </template>
    </t-select>

    <!-- 自定义面板底部内容；如新增项 。同时支持插槽和 Props（this,panelBottomContent）-->
    <t-select v-model="value2" placeholder="请选择云产品" clearable>
      <t-option v-for="item in options2" :key="item.value" :value="item.value" :label="item.label"></t-option>
      <!-- 自定义底部内容 -->
      <template #panelBottomContent>
        <div class="select-panel-footer">
          <t-button v-if="editOrCreate === 'create'" theme="primary" variant="text" block @click="onAdd"
            >新增选项</t-button
          >
          <div v-else>
            <t-input v-model="newOption" autofocus></t-input>
            <t-button size="small" style="margin-top: 8px" @click="onAddConfirm"> 确认 </t-button>
            <t-button theme="default" size="small" style="margin-top: 8px; margin-left: 8px" @click="onAddCancel">
              取消
            </t-button>
          </div>
        </div>
      </template>
    </t-select>
  </t-space>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { SelectProps, TextareaProps, ButtonProps } from 'tdesign-vue-next';
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
const options1 = ref<SelectProps['options']>(OPTIONS);
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
const search = ref('');
const value1 = ref('');
const value2 = ref('');
const editOrCreate = ref('create');
const newOption = ref('');
const onSearch: TextareaProps['onChange'] = () => {
  options1.value = OPTIONS.filter((item) => item.label.indexOf(search.value) !== -1);
};
const onAdd: ButtonProps['onClick'] = () => {
  editOrCreate.value = 'edit';
};
const onAddConfirm: ButtonProps['onClick'] = () => {
  const id = Math.round(Math.random() * 100);
  options2.value.push({
    label: newOption.value,
    value: id.toString(),
  });
  newOption.value = '';
  editOrCreate.value = 'create';
};
const onAddCancel: ButtonProps['onClick'] = () => {
  editOrCreate.value = 'create';
};
</script>
<style scoped>
.tdesign-demo-select-base {
  width: 450px;
  display: flex;
}

.tdesign-demo-select-base .t-select__wrap + .t-select__wrap {
  margin-left: 36px;
}

.select-panel-footer {
  border-top: 1px solid var(--td-component-stroke);
  padding: 6px;
}
</style>
