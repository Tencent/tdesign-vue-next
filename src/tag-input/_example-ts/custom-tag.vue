<template>
  <t-space direction="vertical">
    <!-- 方式一：使用 tag 定义标签内部内容。也可以使用同名渲染函数 tag -->
    <t-tag-input v-model="tags" clearable :min-collapsed-num="2">
      <template #tag="{ value }">
        <span class="displayItem">
          <img src="https://tdesign.gtimg.com/site/avatar.jpg" />
          <span>&nbsp;&nbsp;{{ value }}</span>
        </span>
      </template>
    </t-tag-input>

    <!-- 方式二：使用 valueDisplay 定义全部内容。也可以使用同名渲染函数 valueDisplay -->
    <t-tag-input v-model="tags" clearable>
      <template #valueDisplay="{ value, onClose }">
        <t-tag
          v-for="(item, index) in value"
          :key="item"
          closable
          style="margin-right: 4px"
          @close="() => onClose(index)"
        >
          <span class="displayItem">
            <img src="https://tdesign.gtimg.com/site/avatar.jpg" />
            <span>&nbsp;&nbsp;{{ item }}</span>
          </span>
        </t-tag>
      </template>
    </t-tag-input>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const tags = ref(['StudentA', 'StudentB', 'StudentC']);
</script>
<style>
.displayItem {
  position: relative;
}
.displayItem img {
  width: 18px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>
