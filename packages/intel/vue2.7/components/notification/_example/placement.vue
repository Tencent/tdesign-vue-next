<template>
  <t-space direction="vertical">
    <t-space direction="vertical">
      <t-input placeholder="请输入横向偏移量" v-model="offsetX"></t-input>
      <t-input placeholder="请输入纵向偏移量" v-model="offsetY"></t-input>
    </t-space>
    <t-space :size="30">
      <t-space direction="vertical" :size="30">
        <t-button variant="outline" @click="$notify.info(infoList[0])">左上角</t-button>
        <t-button variant="outline" @click="$notify.info(infoList[2])">左下角</t-button>
      </t-space>
      <t-space direction="vertical" :size="30">
        <t-button variant="outline" @click="$notify.info(infoList[1])">右上角</t-button>
        <t-button variant="outline" @click="$notify.info(infoList[3])">右下角</t-button>
      </t-space>
    </t-space>
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      offsetX: '',
      offsetY: '',
    };
  },
  computed: {
    infoList() {
      return [
        { placement: 'top-left' },
        { placement: 'top-right' },
        { placement: 'bottom-left' },
        { placement: 'bottom-right' },
      ].map((item) => ({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
        duration: 3000,
        offset: [this.offsetX, this.offsetY],
        ...item,
      }));
    },
  },
};
</script>
