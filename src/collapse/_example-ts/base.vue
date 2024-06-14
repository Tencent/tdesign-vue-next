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
        <div class="tdesign-demo-block-column" style="width: 100%">
          <t-tag-input v-model="tags1" clearable @paste="onPaste" @enter="onTagInputEnter" />

          <t-tag-input :value="tags2" label="Controlled: " clearable @change="onChange" />

          <t-tag-input :default-value="tags3" label="UnControlled: " clearable />
        </div>
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

    <p>当前展开项:{{ currentItem }}</p>
  </t-space>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { TagInputProps, CollapseProps } from 'tdesign-vue-next';
const currentItem = ref<number[]>([1]);
const tags1 = ref(['Vue', 'React']);
const tags2 = ref<TagInputProps['value']>(['Vue', 'React']);
const tags3 = ref<TagInputProps['defaultValue']>(['Vue', 'React']);
const handlePanelChange: CollapseProps['onChange'] = (val) => {
  currentItem.value = val.map((n) => Number(n));
};
const onTagInputEnter: TagInputProps['onEnter'] = (val, context) => {
  console.log(val, context);
};
const onChange: TagInputProps['onChange'] = (val, context) => {
  console.log(val, context);
  tags2.value = val;
};
const onPaste: TagInputProps['onPaste'] = (context) => {
  console.log(context);
};
</script>
<style lang="less">
.accordion-demo {
  background-color: #f9f9f9;
}
.button-area {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
</style>
