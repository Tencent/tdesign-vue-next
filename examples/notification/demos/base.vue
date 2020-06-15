<template>
  <!-- <t-notification :visible="true" title="标题名称" content="这是一条可以自动关闭的消息通知" :showClose="h => h('div', 'da')" :closed="closed" footer="footer">
    <h1 slot="footer">defaults</h1>
  </t-notification> -->
  <div @click="show">show</div>
</template>

<script>
let index = 1;
import  Notification from '../../../src/notification/notification.ts';
export default {
  mounted() {
    // Notification({
    //   title: '标题名称',
    //   content: '这是一条可以自动关闭的消息通知',
    //   showClose: h => h('div', 'da'),
    //   closed: this.closed,
    //   opened: this.opened,
    //   footer: 'footer',
    //   offset: {
    //     top: 30,
    //     right: 30,
    //   },
    //   // attach: '#app'
    //   // zIndex: 10,
    // });
    // setTimeout(()=>{
    //   Notification({
    //     title: '标题名称2',
    //     // content: '这是一条可以自动关闭的消息通知',
    //     showClose: h => h('div', 'da'),
    //     offset: {
    //       top: 30,
    //       right: 30,
    //     },
    //   });
    // }, 1000);
    // Notification({
    //   title: '标题名称2',
    //   // content: '这是一条可以自动关闭的消息通知',
    //   showClose: h => h('div', 'da'),
    //   offset: {
    //     top: 30,
    //     right: 30,
    //   },
    // });
  },
  methods: {
    closed() {
      console.log('closed')
    },
    opened() {
      console.log('opened')
    },
    show() {
      Notification({
        title: '标题名称'+index,
        content: '这是一条可以自动关闭的消息通知',
        showClose: h => h('div', 'da'),
        closed: this.closed,
        opened: this.opened,
        // footer: 'footer',
        offset: {
          top: 30,
          right: 30,
        },
        placement: 'top-left',
        // attach: '#app'
        // zIndex: 10,
      });
      index++;
    },
  },
}
</script>