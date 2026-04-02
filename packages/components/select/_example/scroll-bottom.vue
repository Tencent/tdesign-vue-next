<template>
  <t-space>
    <t-select
      style="width: 300px"
      :options="options"
      :loading="loading"
      placeholder="请选择"
      :popup-props="{ 'on-scroll-to-bottom': handleScrollToBottom }"
    />
  </t-space>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { SelectProps } from 'tdesign-vue-next';
const options = ref<SelectProps['options']>([]);
for (let i = 1; i < 15; i++) {
  options.value.push({
    label: `第 ${i} 项`,
    value: i,
  });
}

// 通过监听scroll滚动事件自行判断
// const handleScroll = ({ e }) => {
//   const { scrollTop, clientHeight, scrollHeight } = e.target;
//   if (scrollHeight - scrollTop === clientHeight) {
//     console.log('到底部了');
// options.value = options.value.concat({
//     label: `滚动新增选项${options.value.length+1}`,
//     value: options.value.length + 1,
//   });
//   }
// };

const loading = ref(false);
// 直接使用滚动触底事件
const handleScrollToBottom = () => {
  if (loading.value) {
    return;
  }
  loading.value = true;
  setTimeout(() => {
    options.value = options.value.concat({
      label: `滚动新增选项${options.value.length + 1}`,
      value: options.value.length + 1,
    });
    loading.value = false;
  }, 500);
};
</script>
