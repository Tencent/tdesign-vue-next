<template>
  <t-space direction="vertical">
    <t-list
      ref="list"
      style="height: 300px"
      :scroll="{ type: 'virtual', rowHeight: 80, bufferSize: 10, threshold: 10 }"
    >
      <t-list-item v-for="(item, index) in listData" :key="index">
        <t-list-item-meta :image="imageUrl" title="列表标题" :description="item.content" />
      </t-list-item>
    </t-list>
    <t-space>
      <t-button @click="handleScroll">滚动到指定节点</t-button>
    </t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ListItemMetaProps, ListInstanceFunctions } from 'tdesign-vue-next';

const list = ref<ListInstanceFunctions>(); // 用于存储对 t-list 的引用
const listData = ref([]); // 使用 ref 来存储列表数据
const imageUrl: ListItemMetaProps['image'] = 'https://tdesign.gtimg.com/site/avatar.jpg';

onMounted(() => {
  for (let i = 0; i < 3000; i++) {
    listData.value.push({ content: `第${i + 1}个列表内容的描述性文字` });
  }
});

const handleScroll = () => {
  // scroll 属性需要设置 rowHeight 参数
  list.value?.scrollTo({
    // list 不存在嵌套，key 与 index 相同
    index: 30,
    behavior: 'smooth',
  });
};
</script>
