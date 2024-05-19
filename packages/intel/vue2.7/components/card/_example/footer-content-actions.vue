<template>
  <t-card :cover="cover" theme="poster2" :style="{ width: '400px' }">
    <template #footer>
      <t-comment avatar="https://tdesign.gtimg.com/site/avatar-boy.jpg" author="标题" content="卡片内容" />
    </template>
    <template #actions>
      <t-dropdown :options="options" :min-column-width="112" @click="clickHandler">
        <t-button variant="text" shape="square">
          <more-icon />
        </t-button>
      </t-dropdown>
    </template>
  </t-card>
</template>
<script>
import { MessagePlugin } from 'tdesign-vue';
import { MoreIcon } from 'tdesign-icons-vue';

export default {
  components: {
    MoreIcon,
  },
  data() {
    return {
      infoMessage: `这是一段很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长的内容示例。`,
      options: [
        {
          content: '操作一',
          value: 1,
        },
        {
          content: '操作二',
          value: 2,
        },
      ],
      cover: 'https://tdesign.gtimg.com/site/source/card-demo.png',
    };
  },
  methods: {
    clickHandler(data) {
      MessagePlugin.success(`选中【${data.content}】`);
    },
  },
};
</script>
<style scoped>
.tdesign-demo-block /deep/ .t-card__actions {
  display: flex;
  align-items: center;
}
</style>
