<template>
  <t-select
    v-model="value"
    placeholder="请选择"
    :style="{ width: '400px' }"
    :popup-props="{ overlayStyle: { width: '400px' } }"
  >
    <t-option v-for="item in options" :value="item.stem" :key="item.stem" class="overlay-options">
      <div>
        <t-icon :name="item.stem" />
      </div>
    </t-option>
    <div slot="valueDisplay"><t-icon :name="value" :style="{ marginRight: '8px' }" />{{ value }}</div>
  </t-select>
</template>

<script setup>
import { ref } from 'vue';
import { manifest } from 'tdesign-icons-vue';
// 获取全部图标的列表
const options = ref(manifest);
const value = ref('edit-1');
</script>

<style>
.overlay-options {
  display: inline-block;
  font-size: 20px;
}
</style>
