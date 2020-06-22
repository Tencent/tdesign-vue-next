<template>
  <div>
    <t-button @click="show">自定义footer</t-button>
    <t-button @click="show2">自定义footer</t-button>
  </div>
</template>

<script>
export default {
  methods: {
    show() {
      this.$notify({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
        footer: h => h(
          'div', { class: 't-notification__detail' },
          [h('span', { class: 't-notification__detail--item t-is-active' }, '查看详情')]
        ),
      });
    },
    show2() {
      this.$notify({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
        footer: h => h(
          'div', { class: 't-notification__detail' },
          [h('span', { class: 't-notification__detail--item' }, '重启'),
            h('span', { class: 't-notification__detail--item t-is-active' }, '稍后提醒我')]
        ),
      });
    },
  },
};
</script>

<style scoped>
.t-button + .t-button{
  margin-left: 10px;
}
</style>
