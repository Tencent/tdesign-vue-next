<template>
  <t-space>
    <t-select
      style="width: 300px"
      :options="options"
      placeholder="请选择"
      :popup-props="{ 'on-scroll-to-bottom': handleScrollToBottom }"
    />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const initialOptions = [];
for (let i = 1; i < 15; i++) {
  initialOptions.push({
    label: `第 ${i} 项`,
    value: i,
  });
}
const options = ref(initialOptions);
// 通过监听scroll滚动事件自行判断
// const handleScroll = ({
//   e
// }) => {
//   const {
//     scrollTop,
//     clientHeight,
//     scrollHeight
//   } = e.target;
//   if (clientHeight + Math.floor(scrollTop) === scrollHeight) {
//     console.log('到底部了');
//     options.value = options.value.concat({
//       label: `滚动新增选项${options.value.length + 1}`,
//       value: options.value.length + 1
//     });
//   }
// };
const handleScrollToBottom = () => {
  // 直接使用滚动触底事件
  options.value = options.value.concat({
    label: `滚动新增选项${options.value.length + 1}`,
    value: options.value.length + 1,
  });
};
</script>
