<template>
  <t-space direction="vertical">
    <t-collapse :default-value="[1]" @change="handlePanelChange">
      <t-collapse-panel header="这是一个折叠标题">
        这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
      </t-collapse-panel>
      <t-collapse-panel destroy-on-collapse header="设置默认展开项">
        这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
      </t-collapse-panel>
      <t-collapse-panel header="自定义折叠面板内容">
        <t-space direction="vertical" style="width: 100%">
          <t-tag-input v-model="tags1" clearable />
          <t-tag-input :value="tags2" label="Controlled: " clearable />
          <t-tag-input :default-value="tags3" label="UnControlled: " clearable />
        </t-space>
      </t-collapse-panel>
      <t-collapse-panel header="嵌套折叠面板">
        <t-collapse default-expand-all>
          <t-collapse-panel header="子面板1"> 这是子面板1 </t-collapse-panel>
          <t-collapse-panel header="子面板2"> 这是子面板2 </t-collapse-panel>
          <t-collapse-panel header="子面板3"> 这是子面板3 </t-collapse-panel>
          <t-collapse-panel header="子面板4"> 这是子面板4 </t-collapse-panel>
        </t-collapse>
      </t-collapse-panel>
    </t-collapse>
    <div style="margin-top: 10px">当前展开项:{{ currentItem }}</div>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const currentItem = ref([1]);
const tags1 = ref(['Vue', 'React']);
const tags2 = ref(['Vue', 'React']);
const tags3 = ref(['Vue', 'React']);
const handlePanelChange = (val) => {
  currentItem.value = val;
};
</script>
