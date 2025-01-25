<template>
  <t-space direction="vertical">
    <t-space class="tag-block">
      <t-tag theme="primary" closable>标签一</t-tag>
      <t-tag theme="success" closable>标签二</t-tag>
      <t-tag theme="warning" closable>标签三</t-tag>
      <t-tag theme="danger" closable>标签四</t-tag>
    </t-space>
    <t-space class="tag-block light">
      <t-tag theme="primary" variant="light" closable>标签一</t-tag>
      <t-tag theme="success" variant="light" closable>标签二</t-tag>
      <t-tag theme="warning" variant="light" closable>标签三</t-tag>
      <t-tag theme="danger" variant="light" closable>标签四</t-tag>
    </t-space>
    <t-space class="tag-block">
      <t-tag variant="outline" theme="primary" closable>标签一</t-tag>
      <t-tag variant="outline" theme="success" closable>标签二</t-tag>
      <t-tag variant="outline" theme="warning" closable>标签三</t-tag>
      <t-tag variant="outline" theme="danger" closable>标签四</t-tag>
    </t-space>
    <t-space class="tag-block">
      <t-tag
        v-for="(tag, index) in tags"
        :key="index"
        :theme="tag.type"
        :closable="tag.showClose"
        :icon="tag.icon"
        :disabled="!!tag.disabled"
        :max-width="tag.maxWidth"
        @click="handleClick"
        @close="handleClose(index)"
      >
        {{ tag.name }}
      </t-tag>
    </t-space>
    <t-space class="tag-block editable">
      <t-tag v-if="!inputVisible" @click="handleClickAdd">
        <add-icon />
        添加标签
      </t-tag>
      <t-input v-else ref="input" size="small" style="width: 94px" @blur="handleInputEnter" @enter="handleInputEnter" />
    </t-space>
  </t-space>
</template>
<script lang="tsx" setup>
import { nextTick, ref } from 'vue';
import { InputInstanceFunctions, TagProps, InputProps } from 'tdesign-vue-next';
import { AddIcon } from 'tdesign-icons-vue-next';
const inputVisible = ref(false);
const tags = ref([
  {
    name: '可删除标签可删除标签',
    type: 'default',
    showClose: true,
    maxWidth: 100,
  },
  {
    name: '可删除标签可删除标签',
    type: 'default',
    icon: () => <t-icon name="discount" />,
    showClose: true,
    maxWidth: 100,
  },
  {
    name: '可删除标签',
    type: 'default',
    showClose: true,
    disabled: true,
  },
]);
const input = ref<InputInstanceFunctions>('');
const handleClose = (index) => {
  console.log(index);
  tags.value.splice(index, 1);
};
const handleClick: TagProps['onClick'] = (event) => {
  console.log(event);
};
const handleInputEnter: InputProps['onEnter'] = (val) => {
  if (val && !tags.value.some((item) => item.name === val)) {
    tags.value.push({
      name: val,
      type: 'default',
      showClose: true,
    });
  }
  inputVisible.value = false;
};
const handleClickAdd: TagProps['onClick'] = () => {
  inputVisible.value = true;
  nextTick(() => {
    input.value.focus();
  });
};
</script>
