<template>
  <t-space direction="vertical">
    <t-collapse v-model="currentItem" expand-mutex @change="handlePanelChange">
      <t-collapse-panel value="0" header="这是一个折叠标题">
        这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
      </t-collapse-panel>

      <t-collapse-panel value="1">
        <template #header>这是一个折叠标题</template>
        <template #default>
          这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
        </template>
      </t-collapse-panel>

      <t-collapse-panel value="2">
        <template #header>这是一个折叠标题</template>
        这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
      </t-collapse-panel>

      <t-collapse-panel value="3" header="这是一个折叠标题">
        这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
      </t-collapse-panel>
    </t-collapse>

    <p>当前展开项：{{ currentItem }}</p>
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CollapseProps } from 'tdesign-vue-next';
const currentItem = ref([]);
const handlePanelChange: CollapseProps['onChange'] = (val) => {
  console.log(val);
};
</script>
