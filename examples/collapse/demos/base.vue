<template>
  <div class="tdesign-collapse">
    <t-collapse expand-icon default-value="1" is-nested @change="handlePanelChange">
      <t-collapse-panel value="0" header="这是一个折叠标题">
        这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
      </t-collapse-panel>
      <t-collapse-panel value="1" header="设置默认展开项">
        这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
      </t-collapse-panel>
      <!-- <t-collapse-panel v-if="false" value="1">
        <template #header>嵌套折叠面板</template>
        <t-collapse expandIcon>
          <t-collapse-panel header="这是子标题一" value="1.1">
            这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
          </t-collapse-panel>
          <t-collapse-panel header="这是子标题二" value="1.2">
            这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
          </t-collapse-panel>
          <t-collapse-panel header="这是子标题三" value="1.3">
            这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
          </t-collapse-panel>
        </t-collapse>
      </t-collapse-panel> -->
      <t-collapse-panel value="2">
        <template #header>自定义面板内容</template>
        <div class="tdesign-demo-block-column" style="width: 80%">
          <t-tag-input v-model="tags1" clearable @paste="onPaste" @enter="onTagInputEnter" />

          <t-tag-input :value="tags2" label="Controlled: " clearable @change="onChange" />

          <t-tag-input :default-value="tags3" label="UnControlled: " clearable />
        </div>
      </t-collapse-panel>
      <t-collapse-panel value="3" header="这是一个折叠标题">
        这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
      </t-collapse-panel>
    </t-collapse>
    <div style="margin-top: 10px">当前展开项:{{ currentItem }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const currentItem = ref(['1']);
const tags1 = ref(['Vue', 'React']);
const tags2 = ref(['Vue', 'React']);
const tags3 = ref(['Vue', 'React']);
const handlePanelChange = (val) => {
  currentItem.value = val;
};

const onTagInputEnter = (val, context) => {
  console.log(val, context);
};
const onChange = (val, context) => {
  console.log(val, context);
  tags2.value = val;
};
const onPaste = (context) => {
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
