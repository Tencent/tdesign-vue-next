<template>
  <t-space direction="vertical">
    <t-cascader v-model="value1" label="单选：" :options="optionsData" clearable>
      <template #valueDisplay="{ value, selectedOptions }">
        <div v-if="value">
          <img :src="selectedOptions[0].avatar" class="avatar" />
          <span>{{ selectedOptions[0].label }}</span>
          <span>({{ value }})</span>
        </div>
      </template>
    </t-cascader>

    <t-cascader v-model="value2" label="多选：" :options="optionsData" clearable multiple style="width: 500px">
      <template #valueDisplay="{ value, selectedOptions, onClose }">
        <template v-if="value && value.length">
          <t-tag v-for="(option, index) in selectedOptions" :key="option.value" closable @close="() => onClose(index)">
            <img :src="option.avatar" class="avatar" />
            <span>{{ option.label }}</span>
            <span>({{ option.value }})</span>
          </t-tag>
        </template>
      </template>
    </t-cascader>
  </t-space>
</template>

<script lang="tsx">
export default {
  name: 'CascaderValueDisplay',
};
</script>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CascaderProps } from 'tdesign-vue-next';
const value1 = ref('2.2');
const value2 = ref(['1.3', '2.1', '2.2']);
const AVATAR = 'https://tdesign.gtimg.com/site/avatar.jpg';
const optionsData: CascaderProps['options'] = [
  {
    label: '选项一',
    value: '1',
    children: [
      {
        label: '子选项一',
        value: '1.1',
        avatar: AVATAR,
      },
      {
        label: '子选项二',
        value: '1.2',
        avatar: AVATAR,
      },
      {
        label: '子选项三',
        value: '1.3',
        avatar: AVATAR,
      },
    ],
  },
  {
    label: '选项二',
    value: '2',
    children: [
      {
        label: '子选项一',
        value: '2.1',
        avatar: AVATAR,
      },
      {
        label: '子选项二',
        value: '2.2',
        avatar: AVATAR,
      },
    ],
  },
];
</script>

<style lang="less" scoped>
.avatar {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  vertical-align: -4px;
  margin-right: 4px;
}
</style>
