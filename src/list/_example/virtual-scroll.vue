<template>
  <t-space direction="vertical">
    <t-list
      ref="list"
      style="height: 300px"
      :scroll="{ type: 'virtual', rowHeight: 80, bufferSize: 10, threshold: 10 }"
    >
      <t-list-item v-for="(item, index) in listData" :key="`t${index + 1}`">
        <t-list-item-meta :image="imageUrl" title="列表标题" :description="item.content" />
      </t-list-item>
    </t-list>
    <t-space>
      <t-button @click="handleScroll">滚动到指定节点</t-button>
    </t-space>
  </t-space>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const list = ref(); // 用于存储对 t-list 的引用
const listData = ref([]); // 使用 ref 来存储列表数据
const imageUrl = 'https://tdesign.gtimg.com/site/avatar.jpg';

onMounted(() => {
  for (let i = 0; i < 3000; i++) {
    listData.value.push({ content: `第${i + 1}个列表内容的描述性文字` });
  }
});

const handleScroll = () => {
  // scroll 属性需要设置 rowHeight 参数
  list.value?.scrollTo({
    // 指定key滚动，即当前节点对应的唯一值，推荐使用
    key: 't30',
    // 指定index滚动，如果存在多级嵌套，需要自己计算index
    // index: 100,
  });
};
</script>
